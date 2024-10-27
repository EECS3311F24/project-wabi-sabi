from flask import Blueprint

main = Blueprint("main", __name__)

from .tasks import tasks

main.register_blueprint(tasks)

from . import routes
