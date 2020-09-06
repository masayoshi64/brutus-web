from uct.mcts import MCTSPlayer
from uct.dfpn import dfpn
from game.game_state import GameState, Winner
from flask import Flask, render_template
from flask import request, jsonify
from uct.dfpn import dfpn
import json
import numpy as np
app = Flask(__name__, static_folder='../frontend/dist/static',
            template_folder='../frontend/dist')

# the latest path
MODEL_CONFIG_PATH_ZERO = "results/bekasa/2020-08-22-00-36/models/2020-08-22-15-32-59-mainNN.json"
WEIGHT_PATH_ZERO = "results/bekasa/2020-08-22-00-36/models/2020-08-22-15-32-59-mainNN.h5"

players = {-1: MCTSPlayer(-1), 1: MCTSPlayer(1)}
for player in players.values():
    player.load_model(MODEL_CONFIG_PATH_ZERO,
                      WEIGHT_PATH_ZERO)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


@app.route('/post', methods=["POST"])
def post():
    print('received')
    game = request.json["game"]

    gs = GameState()
    gs.board = np.array(game['board'], dtype=np.int8)
    gs.turn = game['turn']
    gs.n_turns = game['n_turns']

    dfpn_r = dfpn(gs)
    if dfpn_r is not None:
        best_action = dfpn_r
    else:
        players[gs.turn].gs.board = gs.board.copy()
        players[gs.turn].gs.turn = gs.turn
        players[gs.turn].gs.n_turns = gs.n_turns
        best_action, best_wp, arr = players[gs.turn].go()

    si, sj, d = map(int, np.unravel_index(best_action, (7, 5, 9)))
    di, dj = map(int, gs.directionize(d))
    return jsonify({'si': si, 'sj': sj, 'di': di, 'dj': dj})


if __name__ == '__main__':
    app.run(debug=True)
