from flask import Blueprint


cart = Blueprint('cart', __name__)


@cart.route('/')
def index():
    return '<h1>hello cart !</h1>'