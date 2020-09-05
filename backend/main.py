from flask import Flask, render_template
from flask import request, jsonify
app = Flask(__name__, static_folder='../frontend/dist/static',
            template_folder='../frontend/dist')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):

    return render_template('index.html')


@app.route('/post', methods=["POST"])
def post():
    print('received')
    game = request.json["game"]
    board = game['board']
    # とりあえず一手だけ
    return jsonify({'si': 0, 'sj': 0, 'd': [1, 0]})


if __name__ == '__main__':
    app.run(debug=True)
