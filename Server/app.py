import re
from typing import NoReturn
from flask import Flask, json, render_template, request, jsonify
from flask.wrappers import Response
from flask_sqlalchemy import SQLAlchemy
from database_setup import CardSet, Card, db
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
db.init_app(app)

with app.app_context():
    db.create_all()


def enable_CORS(data):
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html")


@app.route('/cardset')
def get_card_set():
    data = CardSet.query.all()
    data = list(map(CardSet.serialize, data))
    return enable_CORS((data))


@app.route('/cardset/add', methods=["POST"])
def add_card_set():
    if (request.method == 'POST'):
        data = json.loads(request.args.get("data"))
        cardSet = CardSet(name=data["name"],
                          description=data["description"], count=0)
        db.session.add(cardSet)
        db.session.commit()
        print(cardSet)
        setId = cardSet.id
        if(data["cards"] != None):
            for c in data["cards"]:
                card = Card(
                    setId=setId,
                    front=c["front"],
                    back=c["back"],
                )
                db.session.add(card)
            cardSet.count += len(data["cards"])
            db.session.add(cardSet)
        db.session.commit()
        return enable_CORS(cardSet.serialize())


@app.route('/cardset/update', methods=["PUT"])
def update_card_set():
    if (request.method == 'PUT'):
        data = json.loads(request.args.get("data"))
        setId = data["setId"]
        cardSet = CardSet.query.filter_by(id=data['setId']).all()[0]
        cardSet.name = data["name"]
        cardSet.description = data["description"]
        Card.query.filter_by(setId=setId).delete()
        if(data["cards"] != None):
            for c in data["cards"]:
                card = Card(
                    setId=setId,
                    front=c["front"],
                    back=c["back"],
                )
                db.session.add(card)
            cardSet.count = len(data["cards"])
            db.session.add(cardSet)
        db.session.commit()
        return enable_CORS(cardSet.serialize())


@app.route('/card')
def get_card():
    data = Card.query
    setId = request.args.get("setId")
    print("filter by = ", setId)
    if(setId != None):
        data = data.filter_by(setId=setId)
    print(data)
    data = list(map(Card.serialize, data))
    return enable_CORS(data)


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
        return enable_CORS(card.serialize())


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
