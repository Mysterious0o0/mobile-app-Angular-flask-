import logging
from uuid import uuid1
from flask import Blueprint, request, jsonify
from app.extensions import db
from app.form import RegisterForm, LoginForm, InfoForm, PasswordForm
from app.models import User


mine = Blueprint('mine', __name__)


@mine.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    status = {'status': 404}
    if form.validate_on_submit():
        u = User.query.filter_by(username=form.username.data).first()
        if u.delflag == 1:
            status['error'] = "用户名不存在,请确认用户名后登陆"
            logging.error(status['error'])
        elif u.verify_password(form.password.data):
            status['status'] = 200
            # 生成token
            status['userToken'] = u.encode_auth_token(u.userid).decode()
            logging.info("登陆")
        else:
            status['status'] = 403
            status['error'] = '密码错误， 请确认密码后登陆'
            logging.error(status['error'])
    else:
        status['status'] = 400
        status['error'] = '输入不正确'
        logging.error(status['error'])
    return jsonify(status)


@mine.route('/register', methods=['POST'])
def register():
    form = RegisterForm()
    status = {'status': 403}
    if form.validate_on_submit():
        u = User(
            userid=str(uuid1()),
            username=form.username.data,
            email=form.email.data,
            mobile=form.mobile.data,
            password=form.password.data)
        db.session.add(u)
        status['status'] = 200
        return jsonify(status)
    else:
        logging.error(form.errors)
        if 'username' in form.errors.keys():
            status['error'] = "用户名已被注册，请更换用户名后重试"
            return jsonify(status)
        elif 'email' in form.errors.keys():
            status['error'] = "邮箱已被绑定，请更换邮箱后重试"
        elif 'mobile' in form.errors.keys():
            status['error'] = "号码已被注册，请更换号码后重试"
        else:
            status['error'] = "输入信息校验失败，请稍后重试"
        return jsonify(status)


@mine.route('/showInfo', methods=['GET'])
def showinfo():
    status, u = chick_user(request)
    if status['status'] == 200:
        userinfo = {
            'username': u.username,
            'Name': u.realname,
            'email': u.email,
            'mobile': u.mobile,
            'integral': u.score}
        status['userInfo'] = userinfo
    return jsonify(status)


@mine.route('/changeInfo', methods=['POST'])
def changeinfo():
    message = ''
    status, u = chick_user(request)
    status['error'] = ''
    if status['status'] == 200:
        form = InfoForm()
        if form.validate_on_submit():
            if form.Name.data != u.realname:
                u.realname = form.Name.data
                message += '用户真实姓名 '
            if form.email.data != u.email and \
                    not User.query.filter_by(email=form.email.data).first():
                u.email = form.email.data
                message += '用户邮箱 '
            elif form.email.data != u.email:
                # status['status'] = 400
                status['error'] = '邮箱已被注册，请选择其他邮箱'
            if form.mobile.data != u.mobile and \
                    not User.query.filter_by(mobile=form.mobile.data).first():
                u.mobile = form.mobile.data
                message += '用户电话号码 '
            elif form.mobile.data != u.mobile:
                # status['status'] = 400
                status['error'] = '手机号已被绑定，请选择其他手机号'
            status['success'] = message
        else:
            status['status'] = 500
            status['error'] = "输入校验失败，请稍后重试"
    return jsonify(status)


@mine.route('/changePW', methods=['POST'])
def changePW():
    status, u = chick_user(request)
    if status['status'] == 200:
        form = PasswordForm()
        if form.validate_on_submit():
            if u.verify_password(form.old_password.data):
                u.password = form.new_password.data
            else:
                status['status'] = 403
                status['error'] = '用户密码错误，更改失败，请重试'
        else:
            status['status'] = 500
            status['error'] = '密码校验失败，请重试'
    return jsonify(status)


def chick_user(request_data):
    status = {'status': 200}
    u = None
    req = request_data.headers.get('Authorization')
    if req:
        resp, code = User.decode_auth_token(req.split(" ")[1])
        if code == 200:
            u = User.query.filter_by(userid=resp).first()
            if u.delflag == 1:
                status['status'] = 403
                status['error'] = "用户名刚刚注销,请确认用户名后登陆"
        else:
            status['status'] = 403
            status['error'] = resp
    else:
        status['status'] = 403
        status['error'] = '身份验证异常，请重新登陆'
    return status, u
