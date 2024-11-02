from flask import Blueprint

main = Blueprint("main", __name__)

from .tasks import tasks as tasks_blueprint

from .study import study as study_blueprint

main.register_blueprint(tasks_blueprint)
main.register_blueprint(study_blueprint)


from . import routes
