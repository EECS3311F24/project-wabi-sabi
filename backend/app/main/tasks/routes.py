from flask import render_template, redirect, url_for, request, jsonify
from . import tasks


@tasks.route("/tasks/add", methods=["POST"])
def index():
    return "TODO: Implement"
