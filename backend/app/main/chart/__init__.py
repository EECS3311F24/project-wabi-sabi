from flask import Blueprint

chart = Blueprint("chart", __name__, url_prefix="/chart")

from . import routes
