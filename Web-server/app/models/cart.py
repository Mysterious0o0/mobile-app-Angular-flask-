from uuid import uuid1
from app.extensions import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class ItemCar(db.Model):
    sorderid = db.Column(db.String(64), primary_key=True, default=str(uuid1()))
    userid = db.Column(db.String(64), nullable=False)
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
        return data


