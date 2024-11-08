from flask import Blueprint

main = Blueprint("main", __name__)

from .task import task as task_blueprint

from .study import study as study_blueprint

main.register_blueprint(task_blueprint)
main.register_blueprint(study_blueprint)


from . import routes
