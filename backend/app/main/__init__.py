from flask import Blueprint

main = Blueprint("main", __name__)

from .task import task as task_blueprint
from .tag import tag as tag_blueprint
from .study import study as study_blueprint
from .chart import chart as chart_blueprint

main.register_blueprint(task_blueprint)
main.register_blueprint(study_blueprint)
main.register_blueprint(tag_blueprint)
main.register_blueprint(chart_blueprint)


from . import routes
