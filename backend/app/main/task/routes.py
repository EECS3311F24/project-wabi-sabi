from flask import render_template, redirect, url_for, request, jsonify
import jwt
from . import task
from app.models import User
from app.auth.session import get_user_from_token, user_required
from ...models import Task, SubTask
from datetime import datetime


@task.route("/", methods=["POST"])
@user_required
def make_task():
    data = request.json
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    try:
        text = data["text"]  # Retrieve email from JSON data
        subtasks = data.get("subtasks")
        due_date_str = data.get("due_date")
        date_object = None
        if due_date_str != None:
            date_object = datetime.strptime(due_date_str, "%Y-%m-%d").date()
        new_task = Task(
            text=text,
            due_date=date_object,
            tag=data.get("tag"),
            status=Task.STATUS_TODO,
        )
        if subtasks:
            for subtask in subtasks:
                new_subtask = SubTask(text=subtask, completed=False)
                new_subtask.save()
                new_task.sub_tasks.append(new_subtask)

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
        if len(tasks) < 1:
            return jsonify({"tasks": []}), 201
        tasks_json = [task.json_formatted() for task in tasks if isinstance(task, Task)]
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
        if task.status == Task.STATUS_FINISHED:
            for subtask in task.sub_tasks:
                subtask.completed = True
                subtask.save()

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
        return jsonify({"error": str(e)}), 501


@task.route("/<task_id>/<subtask_id>", methods=["PATCH"])
@user_required
def edit_subtask(task_id, subtask_id):
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    data = request.json

    try:
        task = user.get_task(task_id)
        subtask = task.get_subtask(subtask_id)
        subtask.text = data["text"]
        subtask.completed = bool(data["completed"])
        subtask.save()
        return jsonify({"message": "Subtask edited successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 501
