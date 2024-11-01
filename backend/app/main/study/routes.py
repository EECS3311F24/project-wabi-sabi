from flask import render_template, redirect, url_for, request, jsonify
import datetime
import jwt
from . import study
from app.models import User
from app.auth.session import get_user_from_token
from ...models import Study


# time formatted inYYYY-MM-DDTHH:mm:ss.sssZ Example: 2011-10-05T14:48:00.000Z
@study.route("/study/add", methods=["POST"])
def make_study_document():
    data = request.json
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "NO SESSION TOKEN"}), 401
    payload = get_user_from_token(token)
    if not payload:
        return jsonify({"error": "INVALID SESSION TOKEN"}), 401
    user = User.objects(email=payload["email"]).first()
    # get all the params of the study session
    # new session object
    try:
        print(data["start_time"], data["end_time"])
        new_study_session = Study(
            start_time=datetime.datetime.fromisoformat(
                data["start_time"].replace("Z", "+00:00")
            ),
            end_time=datetime.datetime.fromisoformat(
                data["end_time"].replace("Z", "+00:00")
            ),
        )

        new_study_session.save()
        user.study_sessions.append(new_study_session)
        user.save()
        return jsonify({"message": "Study Session Recorded Created"}), 201
    except Exception as e:
        return jsonify({"error adding study session": str(e)}), 400


@study.route("/study/get", methods=["GET"])
def get_study_sessions():
    data = request.json
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "NO SESSION TOKEN"}), 401
    payload = get_user_from_token(token)
    if not payload:
        return jsonify({"error": "INVALID SESSION TOKEN"}), 401
    user = User.objects(email=payload["email"]).first()
    # get all the params of the study session
    # new session object
    try:
        study_session_json = [
            session.to_json() for session in user.get_study_sessions()
        ]
        return jsonify(study_session_json), 201
    except Exception as e:
        return jsonify({"error adding study session": str(e)}), 400