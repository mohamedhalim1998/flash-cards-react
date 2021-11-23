from flask import Flask, json, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from database_setup import CardSet, Card, db
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


@app.route('/card')
def get_card():
    data = Card.query.all()
    data = list(map(Card.serialize, data))
    return jsonify(data)


@app.route('/card/add', methods=["POST"])
def add_card():
    if (request.method == 'POST'):
        data = json.loads(request.args.get("data"))
        print(data)
        card = Card(
            setId=data["setId"],
            front=data["front"],
            back=data["back"],
        )
        db.session.add(card)
        cardSet = CardSet.query.filter_by(id=data['setId']).all()
        print(cardSet[0].count)
        cardSet[0].count += 1
        # db.session.add(cardSet)
        db.session.commit()
        return jsonify(card.serialize())


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
