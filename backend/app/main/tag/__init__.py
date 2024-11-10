from flask import Blueprint

tag = Blueprint("tag", __name__, url_prefix="/tag")

from . import routes
