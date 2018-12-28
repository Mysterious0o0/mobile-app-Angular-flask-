from uuid import uuid1
from flask import Blueprint, jsonify, request
from app.models import Menu, Goods, ItemCar
from app.extensions import db
from .mine import chick_user

home = Blueprint('home', __name__)


@home.route('/home')
def index():
    menu_info = []
    goods_data = []
    menu_name2id = {}
    menus = Menu.query.all()
    req = request.headers.get('Good-Index')
    index = int(req.split(" ")[1])
    way = req.split(" ")[2]
    index_end = index * 10
    if way == 'Refresh':
        goods = Goods.query.filter_by(isshow=1, isfirstpageshow=1).all()[: index_end]
    elif way == 'Infinite':
        index_start = (index - 1) * 10
        goods = Goods.query.filter_by(isshow=1, isfirstpageshow=1).all()[index_start: index_end]
    else:
        goods = Goods.query.filter_by(isshow=1, isfirstpageshow=1).all()[: index_end]
    for menu in menus:
        menu_name = menu.db2json().get('menuname')
        menu_id = menu.db2json().get('menuid')
        menu_info.append(menu_name)
        menu_name2id[menu_name] = menu_id
    for pro in goods:
        goods_data.append(pro.db2json())
    return jsonify({'menu': menu_info, 'goods': goods_data, 'name2id': menu_name2id})


@home.route('/home/meunGoods')
def menuGoods():
    goods_data = []
    req = request.headers.get('Good-Type')
    menu_id = req.split(" ")[1]
    menu_index = int(req.split(" ")[2])
    way = req.split(" ")[3]
    index_end = menu_index * 10
    if way == 'Refresh':
        goods = Goods.query.filter_by(menuid=menu_id, isshow=1).all()[: index_end]
    elif way == 'Infinite':
        index_start = (menu_index - 1) * 10
        goods = Goods.query.filter_by(menuid=menu_id, isshow=1).all()[index_start: index_end]
    else:
        goods = Goods.query.filter_by(menuid=menu_id, isshow=1).all()[: index_end]
    for pro in goods:
        goods_data.append(pro.db2json())
    return jsonify(goods_data)


@home.route('/home/search', methods=['POST'])
def search():
    goods_data = []
    name = request.data
    goods = Goods.query.filter_by(isshow=1).\
        filter(Goods.goodsname.like('%{0}%'.format(name.decode('utf8')))).all()
    for goods in goods:
        goods_data.append(goods.db2json())
    return jsonify(goods_data)


@home.route('/home/goodsinfo')
def goods_info():
    req = request.headers.get('Good-Type')
    goods_id = req.split(" ")[1]
    goods = Goods.query.filter_by(goodsid=goods_id, isshow=1).first()
    return jsonify(goods.db2json())


@home.route('/home/addCart', methods=['POST'])
def addCart():
    req = request.headers.get('Good-Type')
    goods_id = req.split(" ")[1]
    status, u = chick_user(request)
    if not u:
        status['error'] = '用户未登陆或认证已过期，请先登录或注册登陆'
    else:
        goods = Goods.query.filter_by(goodsid=goods_id, isshow=1).first()
        if goods.count <=0:
            status['status'] = 401
            status['error'] = '商品销售火爆，已抢购一空，待商家补货重新上架'
        else:
            cart = ItemCar.query.filter_by(userid=u.userid, goodsid=goods_id).first()
            if cart:
                cart.count += 1
                cart.sumunit = cart.count * cart.price
            else:
                itemcar = ItemCar(
                    sorderid=str(uuid1()),
                    userid=u.userid,
                    goodsname=goods.goodsname,
                    count=1,
                    price=goods.price,
                    unit=goods.unit,
                    sumunit=goods.price,
                    goodsid=goods_id)
                db.session.add(itemcar)
            status['success'] = '商品已加入购物车，请尽快结算下单'
    return jsonify(status)




