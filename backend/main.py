from flask import Flask, render_template
from flask import request, jsonify
app = Flask(__name__, static_folder='../frontend/dist/static',
            template_folder='../frontend/dist')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):

    return render_template('index.html')


@app.route('/post', methods=["GET", "POST"])
def post():
    print('waiwai')
    game = request.json["game"]
    return jsonify({'message': game['turn']})


if __name__ == '__main__':
    app.run(debug=True)
