from flask import render_template, redirect, url_for, request, jsonify
import datetime
import jwt
from . import tag
from app.models import User, Tag
from app.auth.session import get_user_from_token, user_required
from ...models import Study, User, json_formatted


# time formatted inYYYY-MM-DDTHH:mm:ss.sssZ Example: 2011-10-05T14:48:00.000Z
@tag.route("/", methods=["POST"])
@user_required
def make_tag():
    data = request.json
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    # get all the params of the study session
    # new session object
    try:
        new_tag = Tag(text=data["text"])
        new_tag.save()
        user.tags.append(new_tag)
        user.save()
        return jsonify({"message": "added tag"}), 201
    except Exception as e:
        return jsonify({"error adding Tag": str(e)}), 500


@tag.route("/", methods=["GET"])
@user_required
def get_tags():
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    # get all the params of the study session
    # new session object
    try:
        if len(user.get_tags()) < 1:
            return jsonify([]), 201
        tag_json = [json_formatted(tag) for tag in user.get_tags()]
        return jsonify(tag_json), 201
    except Exception as e:
        return jsonify({"error getting tag": str(e)}), 500


@tag.route("/<tag_id>", methods=["PATCH"])
@user_required
def update_user_tag(tag_id):
    data = request.json
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()

    try:
        new_status = data["text"]
        tag = user.get_tag(tag_id)
        tag.text = new_status
        tag.save()
        return jsonify({"message": "tag edited successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 501


@tag.route("/<tag_id>", methods=["DELETE"])
@user_required
def remove_user_tag(tag_id):
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    data = request.json

    try:
        tag = user.get_tag(tag_id)
        user.remove_tag(tag_id)
        tag.delete()
        return jsonify({"message": "tag deleted successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 501
