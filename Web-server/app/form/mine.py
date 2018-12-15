from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, ValidationError
from wtforms.validators import DataRequired, EqualTo, Email, Length
from app.models import User


# 注册
class RegisterForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(1, 18)])
    email = StringField('email', validators=[Email()])
    mobile = StringField('mobile', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired(), Length(6, 18)])
    confirm = PasswordField('confirm', validators=[EqualTo('password')])

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('用户名已存在，请更改其他为其他用户名')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('邮箱已被注册，请选择其他邮箱')

    def validate_mobile(self, field):
        if User.query.filter_by(mobile=field.data).first():
            raise ValidationError('手机号已被绑定，请选择其他手机号')


# 登陆
class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(1, 18)])
    password = StringField('password', validators=[DataRequired(), Length(6, 18)])


# 修改用户信息
class InfoForm(FlaskForm):
    Name = StringField('Name', validators=[DataRequired(), Length(1, 18)])
    email = StringField('email', validators=[Email()])
    mobile = StringField('mobile', validators=[DataRequired()])


# 修改密码
class PasswordForm(FlaskForm):
    old_password = PasswordField('old_password', validators=[DataRequired(), Length(6, 18)])
    new_password = PasswordField('new_password', validators=[DataRequired(), Length(6, 18)])
    confirm = PasswordField('confirm', validators=[EqualTo('new_password')])


# 忘记密码
class SetkeyForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(1, 18)])
    email = StringField('register email', validators=[Email()])
    password = PasswordField('password', validators=[DataRequired(), Length(6, 18)])
    confirm = PasswordField('again password', validators=[EqualTo('password')])


