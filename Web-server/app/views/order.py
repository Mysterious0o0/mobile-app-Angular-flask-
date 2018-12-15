from flask import Blueprint


order = Blueprint('order', __name__)


@order.route('/')
def index():
    return '<h1>hello order !</h1>'