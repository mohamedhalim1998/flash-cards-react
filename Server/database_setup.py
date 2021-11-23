from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class CardSet(db.Model):
    id = db.Column(db.Integer, primary_key=True,
                   autoincrement=True)
    name = db.Column(db.String)
    count = db.Column(db.Integer)

    def serialize(cardSet):
        return {
            'id': cardSet.id,
            "name": cardSet.name,
            "count": cardSet.count
        }


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True,
                   autoincrement=True)
    setId = db.Column(db.Integer)
    front = db.Column(db.String)
    back = db.Column(db.String)

    def serialize(card):
        return {
            'id': card.id,
            'setId': card.setId,
            "front": card.front,
            "back": card.back,
        }
