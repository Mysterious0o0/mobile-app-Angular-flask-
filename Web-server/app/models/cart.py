from uuid import uuid1
from app.extensions import db
from datetime import datetime


class ItemCar(db.Model):
    __tablename__ = 'itemcar'
    sorderid = db.Column(db.String(64), primary_key=True, default=str(uuid1()))
    userid = db.Column(db.String(64), nullable=False)
    goodsid = db.Column(db.String(64), nullable=False)
    goodsname = db.Column(db.String(64), nullable=False)
    count = db.Column(db.Integer(), nullable=False)
    price = db.Column(db.DECIMAL(10, 2), nullable=False)
    unit = db.Column(db.String(32), nullable=False)
    sumunit = db.Column(db.DECIMAL(12, 2))
    createtime = db.Column(db.DateTime, default=str(datetime.now()))

    # 将db转换成json格式
    def db2json(self):
        data = self.__dict__
        if "_sa_instance_state" in data:
            del data["_sa_instance_state"]
        if 'price' in data:
            data['price'] = float(data['price'])
        if 'sumunit' in data:
            data['sumunit'] = float(data['sumunit'])
        return data


