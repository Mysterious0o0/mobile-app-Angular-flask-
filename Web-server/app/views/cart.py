from flask import Blueprint, jsonify, request
from .mine import chick_user
from app.extensions import db
from app.models import ItemCar, Goods, Address

cart = Blueprint('cart', __name__)


@cart.route('/cart', methods=['GET'])
def index():
    cart_info = []
    status, u = chick_user(request)
    if u is not None:
        carts = ItemCar.query.filter_by(userid=u.userid).all()
        address = Address.query.filter_by(userid=u.userid, isfirst='1').first()
        if address is None:
            address = Address.query.filter_by(userid=u.userid).first()
        if address is None:
            status['address'] = None
        else:
            status['address'] = address.addressid
        for cart in carts:
            cart_info.append(cart.db2json())
        status['Goods'] = cart_info
    return jsonify(status)


@cart.route('/addGoods', methods=['GET'])
def addGoods():
    cart_info = []
    status, u = chick_user(request)
    if u is not None:
        req = request.headers.get('Good-Type')
        goods_id = req.split(" ")[1]
        goods = Goods.query.filter_by(goodsid=goods_id).first()
        carts = ItemCar.query.filter_by(userid=u.userid)
        cart = carts.filter_by(goodsid=goods_id).first()
        cart.count += 1
        if cart.count > goods.count:
            cart.count -= 1
            status['status'] = 401
            status['error'] = '已到达商品库存上限，请先结算避免无货，如仍需要，待商家补齐后再次购买'
        else:
            cart.sumunit += cart.price
        for pro in carts.all():
            cart_info.append(pro.db2json())
        status['Goods'] = cart_info
    return jsonify(status)


@cart.route('/subGoods', methods=['GET'])
def subGoods():
    cart_info = []
    status, u = chick_user(request)
    if u is not None:
        req = request.headers.get('Good-Type')
        goods_id = req.split(" ")[1]
        carts = ItemCar.query.filter_by(userid=u.userid)
        cart = carts.filter_by(goodsid=goods_id).first()
        cart.count -= 1
        if cart.count <=0:
            db.session.delete(cart)
        else:
            cart.sumunit -= cart.price
        for pro in carts.all():
            cart_info.append(pro.db2json())
        status['Goods'] = cart_info
    return jsonify(status)
