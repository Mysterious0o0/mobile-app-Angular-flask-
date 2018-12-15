import os
from app import create_app
from flask_script import Manager
from flask_migrate import MigrateCommand, Migrate
from app.extensions import db
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from flask_cors import CORS

app = create_app(os.environ.get('FLASK_CONFIG') or 'default')
# 添加命令行启动控制
CORS(app)
manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
    # http_server = HTTPServer(WSGIContainer(app))
    # http_server.listen(8000)
    # IOLoop.instance().start()
