from decimal import Decimal
from uuid import uuid1
from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import Userorder, Address, ItemCar, Sorder, Goods, Exorder, Hisorder
from app.form import AddressForm
from .mine import chick_user

order = Blueprint('order', __name__)


@order.route('', methods=['GET'])
def index():
    cart_info = []
    status, u = chick_user(request)
    if u is not None:
        req = request.headers.get('ADDRESS-Type')
        add_id = req.split(" ")[1]
        address = Address.query.filter_by(addressid=add_id).first()
        if address is not None:
            status['address'] = address.db2json()
        else:
            address = {
                'name': None,
                'mobile': None,
                'address': None
            }
            status['address'] = address
        carts = ItemCar.query.filter_by(userid=u.userid).all()
        for cart in carts:
            cart_info.append(cart.db2json())
        status['cartInfo'] = cart_info
    return jsonify(status)


@order.route('/buycart', methods=['GET'])
def buycart():
    sumprice = Decimal()
    status, u = chick_user(request)
    if u is not None:
        req = request.headers.get('ADDRESS-Type')
        add_id = req.split(" ")[1]
        address = Address.query.filter_by(addressid=add_id).first()
        if address is None:
            status['status'] = 402
            status['error'] = '提交失败，请先选择下单地址'
        else:
            carts = ItemCar.query.filter_by(userid=u.userid).all()
            if len(carts) == 0:
                status['status'] = 402
                status['error'] = '提交失败，当前购物车无商品，请先选择商品后提交'
            else:
                userorder = Userorder(
                    orderid=str(uuid1()),
                    userid=u.userid,
                    addressid=address.addressid,
                    sumtotal=sumprice
                )
                db.session.add(userorder)
                for cart in carts:
                    goods = Goods.query.filter_by(goodsid=cart.goodsid).first()
                    sumprice += cart.sumunit
                    sorder = Sorder(
                        sorderid=str(uuid1()),
                        orderid=userorder.orderid,
                        addressid=userorder.addressid,
                        sellerid=goods.sellerid,
                        userid=u.userid,
                        goodsname=goods.goodsname,
                        price=goods.price,
                        count=cart.count,
                        unit=goods.unit,
                        sumunit=cart.sumunit,
                        state='1')
                    db.session.add(sorder)
                    db.session.delete(cart)
                    goods.count -= cart.count
                userorder.sumtotal = sumprice
    return jsonify(status)


@order.route('/addAddress', methods=['POST'])
def addAddress():
    status, u = chick_user(request)
    if u is not None:
        form = AddressForm()
        if form.validate_on_submit():
            address = Address(
                addressid=str(uuid1()),
                userid=u.userid,
                name=form.username.data,
                mobile=form.mobile.data,
                address=form.address.data,
            )
            db.session.add(address)
        else:
            status['status'] = 403
            status['error'] = form.errors()
    return jsonify(status)


@order.route('/seladdress', methods=['GET'])
def seladderss():
    address = []
    status, u = chick_user(request)
    if u is not None:
        address_all = Address.query.filter_by(userid=u.userid).all()
        for address_one in address_all:
            address.append(address_one.db2json())
        status['address'] = address

    return jsonify(status)


@order.route('/setaddress', methods=['GET'])
def setaddress():
    status, u = chick_user(request)
    if u is not None:
        req = request.headers.get('ADDRESS-Type')
        add_id = req.split(" ")[1]
        address_all = Address.query.filter_by(userid=u.userid).all()
        for address in address_all:
            address.isfirst = '0'
        setadd = Address.query.filter_by(addressid=add_id).first()
        setadd.isfirst = '1'
    return jsonify(status)


@order.route('/getsorder', methods=['GET'])
def getsorder():
    sorder = []
    status, u = chick_user(request)
    if u is not None:
        sorder_all = Sorder.query.filter_by(userid=u.userid).all()
        for sorder_one in sorder_all:
            sorder.append(sorder_one.db2json())
        status['sorder'] = sorder

    return jsonify(status)


@order.route('/goodsRejected', methods=['GET'])
def rejected():
    # 退货
    status, sorder = setStatus(request)
    if sorder is not None:
        sorder.state = '5'
        exorder = Exorder(
            sorderid=str(uuid1()),
            orderid=sorder.orderid,
            sellerid=sorder.sellerid,
            userid=sorder.userid,
            exdesc='申请退货'
        )
        db.session.add(exorder)
    return jsonify(status)


@order.route('/signForGoods', methods=['GET'])
def sign():
    # 签收
    status, sorder = setStatus(request)
    if sorder is not None:
        sorder.state = '10'
    return jsonify(status)


def setStatus(request_data):
    sorder = None
    status, u = chick_user(request_data)
    if u is not None:
        req = request.headers.get('Status-Type')
        sorderid = req.split(" ")[1]
        sorder = Sorder.query.filter_by(sorderid=sorderid).first()
    return status, sorder


@order.route('/gethisorder', methods=['GET'])
def gethisorder():
    sorder = []
    status, u = chick_user(request)
    if u is not None:
        hisorder_all = Hisorder.query.filter_by(userid=u.userid).all()
        for hisorder_one in hisorder_all:
            sorder.append(hisorder_one.db2json())
        status['sorder'] = sorder

    return jsonify(status)



