from flask import render_template, redirect, url_for, request, jsonify
from . import tasks
from ...models import Task
from database import get_database


@tasks.route("/tasks/add", methods=["POST"])
def index():
    data = request.json
    text = data["text"]  # Retrieve email from JSON data
    new_task = Task(is_sub_task=False,text=text,status=Task.STATUS_TODO)
    try:
        new_task.save()
        return jsonify({"message": "Task Created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    return "TODO: Implement"
