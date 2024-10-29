from flask import render_template, redirect, url_for, request, jsonify
import jwt
from . import tasks

from app.auth.session import get_user_from_token
from ...models import Task


@tasks.route("/tasks/add", methods=["POST"])
def make_task():
    data = request.json
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "NO SESSION TOKEN"}), 401
    payload = get_user_from_token(token)
    if not payload:
        return jsonify({"error": "INVALID SESSION TOKEN"}), 401
    user = User.objects(email=payload["email"]).first()
    text = data["text"]  # Retrieve email from JSON data
    new_task = Task(is_sub_task=False,text=text,status=Task.STATUS_TODO)
    try:
        new_task.save()
        user.tasks.append(new_task)
        user.save()
        return jsonify({"message": "Task Created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@tasks.route("/tasks/get", methods=["GET"])
def return_user_tasks():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "NO SESSION TOKEN"}), 401
    payload = get_user_from_token(token)
    if not payload:
        return jsonify({"error": "INVALID SESSION TOKEN"}), 401

    user = User.objects(email=payload["email"]).first()
    tasks = user.tasks
    tasks_json = [task.to_json() for task in user.tasks]
    return jsonify({"tasks":tasks_json[0]}), 201
    

