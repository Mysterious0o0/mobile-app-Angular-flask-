import json
from flask import Blueprint, jsonify
from app.models import Menu
from app.extensions import db

home = Blueprint('home', __name__)


@home.route('/')
def index():
    # menu = Menu.query.get(1)
    # menu1 = Menu(menuname='xx', url='http://www.baidu.com', menuintr='aaa')
    # db.session.add(menu1)
    menus = Menu.query.all()
    result = []
    for menu in menus:
        result.append(menu.db2json())
    return jsonify(result[0])
    # return json.dumps(menu, ensure_ascii=False)
    # return str(menu)
