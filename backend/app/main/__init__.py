from flask import Blueprint

main = Blueprint("main", __name__)

from .tasks import tasks as tasks_blueprint

main.register_blueprint(tasks_blueprint)

from . import routes
