from flask import render_template, redirect, url_for, request, jsonify
import datetime
import jwt
from . import study
from app.models import User
from app.auth.session import get_user_from_token, user_required
from ...models import Study, User, json_formatted


# time formatted inYYYY-MM-DDTHH:mm:ss.sssZ Example: 2011-10-05T14:48:00.000Z
@study.route("/", methods=["POST"])
@user_required
def make_study_document():
    data = request.json
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
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
            tag=data.get(tag)
        )

        new_study_session.save()
        user.study_sessions.append(new_study_session)
        user.save()
        return jsonify({"message": "Study Session Recorded"}), 201
    except Exception as e:
        return jsonify({"error adding study session": str(e)}), 500


@study.route("/", methods=["GET"])
@user_required
def get_study_sessions():
    data = request.json
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    # get all the params of the study session
    # new session object
    try:
        study_session_json = [
            json_formatted(session) for session in user.get_study_sessions()
        ]
        return jsonify(study_session_json), 201
    except Exception as e:
        return jsonify({"error adding study session": str(e)}), 500
