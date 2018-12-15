from flask import Blueprint


introduce = Blueprint('introduce', __name__)


@introduce.route('/')
def index():
    return '<h1>hello introduce !</h1>'