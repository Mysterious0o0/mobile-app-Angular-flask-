from uuid import uuid1
from app.extensions import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Menu(db.Model):
    __tablename__ = 'menu'
    menuid = db.Column(db.String(64), primary_key=True, default=str(uuid1()))
    menuname = db.Column(db.String(64), nullable=False)
    url = db.Column(db.String(128), nullable=False)
    menuintr = db.Column(db.TEXT(128))
    delflag = db.Column(db.String(2), default=0)
    createtime = db.Column(db.DateTime, default=str(datetime.now()))

    def db2json(self):
        data = to_json(self)
        return data


class Seller(db.Model):
    __tablename__ = 'seller'
    sellerid = db.Column(db.String(64), primary_key=True, default=str(uuid1()))
    sellername = db.Column(db.String(64), nullable=False)
    relatetionperson = db.Column(db.String(32), nullable=False)
    selleraddress = db.Column(db.TEXT(128), nullable=False)
    sellerphone = db.Column(db.String(32), nullable=False)
    cardid = db.Column(db.String(64), nullable=False)
    deliverername = db.Column(db.String(32), nullable=False)
    delivererphone = db.Column(db.String(32), nullable=False)
    deliverercard = db.Column(db.String(64), nullable=False)
    delflag = db.Column(db.String(2), nullable=False)
    createtime = db.Column(db.DateTime, default=str(datetime.now()))

    def db2json(self):
        data = to_json(self)
        return data


class Goods(db.Model):
    __tablename__ = 'goods'
    goodsid = db.Column(db.String(64), primary_key=True, default=str(uuid1()))
    menuid = db.Column(db.String(64), nullable=False)
    sellerid = db.Column(db.String(64), nullable=False)
    goodsname = db.Column(db.String(64), nullable=False)
    count = db.Column(db.Integer, nullable=False)
    price = db.Column(db.DECIMAL(10, 2), nullable=False)
    spic = db.Column(db.String(64), nullable=False)
    bpic = db.Column(db.String(64), nullable=False)
    unit = db.Column(db.String(32), nullable=False)
    online = db.Column(db.String(2), default='1')
    isshow = db.Column(db.String(2), default='1')
    selpoint = db.Column(db.Text(128))
    delflag = db.Column(db.String(2), default='0')
    createtime = db.Column(db.DateTime, default=str(datetime.now()))
    updatetime = db.Column(db.DateTime, default=str(datetime.now()))

    def db2json(self):
        data = to_json(self)
        return data


def to_json(self):
    data = self.__dict__
    if "_sa_instance_state" in data:
        del data["_sa_instance_state"]
    if 'price' in data:
        data['price'] = float(data['price'])
    return data