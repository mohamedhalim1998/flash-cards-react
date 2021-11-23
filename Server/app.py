from flask import Flask, json, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from database_setup import CardSet, db
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html")


@app.route('/cardset')
def get_card_set():
    data = CardSet.query.all()
    data = list(map(CardSet.serialize, data))
    return jsonify(data)


@app.route('/cardset/add', methods=["POST"])
def add_card_set():
    if (request.method == 'POST'):
        data = json.loads(request.args.get("data"))
        print(data)
        cardSet = CardSet(name=data["name"], count=0)
        db.session.add(cardSet)
        db.session.commit()
        return jsonify(cardSet.serialize())


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
