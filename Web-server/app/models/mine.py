# json web token包
import jwt
from uuid import uuid1
from datetime import datetime, timedelta
from app.config import Config
from app.extensions import db
from flask_login import UserMixin

# 密码散列和校验
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 'user'
    userid = db.Column(db.String(64), primary_key=True, default=str(uuid1()))
    username = db.Column(db.String(64), nullable=False)
    realname = db.Column(db.String(64), default='')
    mobile = db.Column(db.String(32), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    level = db.Column(db.String(2), default='1')
    score = db.Column(db.String(10), default='0')
    role = db.Column(db.String(2), default='1')
    email = db.Column(db.String(128), nullable=False)
    blackflag = db.Column(db.String(2), default='0')
    delflag = db.Column(db.String(2), default='0')
    createtime = db.Column(db.DateTime, default=str(datetime.now()))

    def db2json(self):
        data = to_json(self)
        return data

    @property
    def password(self):
        raise AttributeError('密码是不可读属性')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    # 密码校验
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    # 生成token作为校验
    def encode_auth_token(self, user_id):
        try:
            payload = {
                'exp': datetime.utcnow() + timedelta(days=1, seconds=0),
                'iat': datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                Config.SECRET_KEY,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    # 对token解码
    # 用静态方法，使其与class实例无关
    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, Config.SECRET_KEY)
            return payload['sub'], 200
        except jwt.ExpiredSignatureError:
            return '签名已过期,请再次登录', 401
        except jwt.InvalidTokenError:
            return '令牌无效,请再次登录', 403


class Forgetwd(db.Model):
    __tablename__ = 'forgetwd'
    forgetpassid = db.Column(db.String(64), primary_key=True, default=str(uuid1()))
    email = db.Column(db.String(128), nullable=False)
    isdone = db.Column(db.String(2), default='0')
    createtime = db.Column(db.DateTime, default=str(datetime.now()))

    def db2json(self):
        data = to_json(self)
        return data


def to_json(self):
    data = self.__dict__
    if "_sa_instance_state" in data:
        del data["_sa_instance_state"]
    return data



