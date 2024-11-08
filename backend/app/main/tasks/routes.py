from flask import render_template, redirect, url_for, request, jsonify
import jwt
from . import task
from app.models import User
from app.auth.session import get_user_from_token, user_required
from ...models import Task
from datetime import datetime


def json_formatted(model):
    model_json = model.to_mongo().to_dict()
    model_json["id"] = str(model_json["_id"])
    del model_json["_id"]
    return model_json


@task.route("/", methods=["POST"])
@user_required
def make_task():
    data = request.json
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    try:
        text = data["text"]  # Retrieve email from JSON data
        due_date_str = data.get("due_date")
        date_object = None
        if due_date_str != None:
            date_object = datetime.strptime(due_date_str, "%Y-%m-%d").date()
        new_task = Task(
            is_sub_task=False, text=text, due_date=date_object, status=Task.STATUS_TODO
        )
        new_task.save()
        user.tasks.append(new_task)
        user.save()
        return jsonify({"message": "Task Created"}), 201
    except Exception as e:
        return jsonify({"error creating task": str(e)}), 501


@task.route("/", methods=["GET"])
@user_required
def return_user_tasks():
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    try:
        tasks = user.get_tasks()
        print(f"Tasks: {tasks}, Type: {[type(task) for task in tasks]}")
        tasks_json = [json_formatted(task) for task in tasks if isinstance(task, Task)]
        print(f"Tasks:{tasks_json}")
        return jsonify({"tasks": tasks_json}), 201
    except Exception as e:
        return jsonify({"error getting tasks": str(e)}), 501


@task.route("/<task_id>", methods=["PATCH"])
@user_required
def update_user_task(task_id):
    data = request.json
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()

    try:
        new_status = data["status"]
        task = user.get_task(task_id)
        task.set_status(new_status)
        task.save()
        return jsonify({"message": "Task edited successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 501


@task.route("/<task_id>", methods=["DELETE"])
@user_required
def remove_user_task(task_id):
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    data = request.json

    try:
        task = user.get_task(task_id)
        user.remove_task(task_id)
        task.delete()
        return jsonify({"message": "Task deleted successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
