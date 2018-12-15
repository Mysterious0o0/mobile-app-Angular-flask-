import os
import logging


# 通用配置
class Config:
    # 秘钥,禁止使用中文
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'asjksncdajfnjcjsdbglacnk'
    # 数据库操作
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # 关闭CSRF
    WTF_CSRF_ENABLED = False

    # 日志记录
    # LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
    # DATE_FORMAT = "%m/%d/%Y %H:%M:%S %p"
    # logging.basicConfig(filename='my.log', level=logging.DEBUG, format=LOG_FORMAT)

    # 初始化的方法
    @staticmethod
    def init_app(app):
        pass


# 开发环境配置
class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:122121@127.0.0.1:3306/sellerdb'


# 测试环境配置
class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:122121@127.0.0.1:3306/sellerdb'


# 生产环境配置
class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:122121@127.0.0.1:3306/sellerdb'


# 配置字典
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    # 默认配置
    'default': DevelopmentConfig
}
