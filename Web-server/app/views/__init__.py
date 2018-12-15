from .home import home
from .mine import mine
from .cart import cart
from .order import order
from .introduce import introduce

# 蓝本配置元组
DEFAULT_BLUEPRINT = (
    # 蓝本 前缀
    (home, ''),
    (mine, '/mine'),
    (cart, '/cart'),
    (order, '/order'),
    (introduce, '/introduce'),

)


# 蓝本启动配置
def config_blueprint(app):
    for blue_print, url_prefix in DEFAULT_BLUEPRINT:
        app.register_blueprint(blue_print, url_prefix=url_prefix)
