# 导入相关扩展类库
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_login import LoginManager
from flask_wtf import CSRFProtect


# 创建相关扩展对象
csrf = CSRFProtect()
db = SQLAlchemy()
mail = Mail()
login_manager = LoginManager()


# 配置函数
def config_extensions(app):
    csrf.init_app(app)
    db.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)
    # 会话保护级别：None：不使用，默认：'basic'基本级别，'strong'：最高级别
    login_manager.session_protection = 'strong'
    # 设置登录页面端点，当用户访问需要登录才能访问的页面时，此时还没有登录
    login_manager.login_view = 'user.login'
    # 设置登录信息，默认是是英文提示信息
    login_manager.login_message = '需要登录才能访问'
