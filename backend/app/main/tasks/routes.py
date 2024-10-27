from flask import render_template
from . import main


@tasks.route("/task")
def index():
    return "task blueprint"
