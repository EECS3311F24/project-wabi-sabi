from flask import render_template, redirect, url_for, request, jsonify
import jwt
from . import study
from app.models import User
from app.auth.session import get_user_from_token
from ...models import Task


@study.route("/session/add", methods=["POST"])
def make_session_document():
    data = request.json
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "NO SESSION TOKEN"}), 401
    payload = get_user_from_token(token)
    if not payload:
        return jsonify({"error": "INVALID SESSION TOKEN"}), 401
    user = User.objects(email=payload["email"]).first()
    text = data["text"]  # Retrieve email from JSON data
    # get all the params of the study session
    # new session object
    # try:
    # new_task.save()
    # user.tasks.append(new_task)
    # user.save()
    # return jsonify({"message": "Task Created"}), 201
    # except Exception as e:
    # return jsonify({"error": str(e)}), 400
