from flask import Blueprint
from . import main

tasks = Blueprint("tasks", __name__)

from . import routes
