from uct.mcts import MCTSPlayer
from uct.dfpn import dfpn
from game.game_state import GameState, Winner
from flask import Flask, render_template
from flask import request, jsonify
import json
import numpy as np
app = Flask(__name__, static_folder='../frontend/dist/static',
            template_folder='../frontend/dist')

# old path
MODEL_CONFIG_PATH_ZERO = "results/bekasa/2020-08-22-00-36/models/2020-08-22-15-32-59-mainNN.json"
WEIGHT_PATH_ZERO = "results/bekasa/2020-08-22-00-36/models/2020-08-22-15-32-59-mainNN.h5"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):

    return render_template('index.html')


@app.route('/post', methods=["POST"])
def post():
    print('received')
    game = request.json["game"]
    gs = GameState()
    player = MCTSPlayer(-1)
    player.load_model(MODEL_CONFIG_PATH_ZERO,
                      WEIGHT_PATH_ZERO)
    gs.board = np.array(game['board'], dtype=np.int8)
    gs.turn = game['turn']
    gs.n_turns = game['n_turns']
    player.gs.board = gs.board.copy()
    player.gs.turn = gs.turn
    player.gs.n_turns = gs.n_turns
    best_action, best_wp, arr = player.go()
    si, sj, d = map(int, np.unravel_index(best_action, (7, 5, 9)))
    di, dj = map(int, gs.directionize(d))
    print(si, sj, d)
    # とりあえず一手だけ
    return jsonify({'si': si, 'sj': sj, 'di': di, 'dj': dj})


if __name__ == '__main__':
    app.run(debug=True)
