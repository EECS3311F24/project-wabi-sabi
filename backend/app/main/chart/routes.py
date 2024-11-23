from flask import render_template, redirect, url_for, request, jsonify
from collections import defaultdict
from datetime import datetime, timedelta
from bson import ObjectId
from . import chart
from app.models import User, Study
from app.auth.session import get_user_from_token, user_required
from ...models import Tag, Task, User, json_formatted


@chart.route("/completion/", methods=["GET"])
@user_required
def tag_task_completion_with_subtasks():
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()

    try:
        # Retrieve tags associated with the user
        tags = user.get_tags()
        result = []

        # Calculate completion percentages for tasks with tags
        for tag in tags:
            total_tasks = Task.objects(tag=tag).count()
            finished_task_count = 0.0

            for task in Task.objects(tag=tag):
                if task.status == Task.STATUS_FINISHED:
                    finished_task_count += 1
                elif task.sub_tasks:
                    # Count completed subtasks
                    completed_subtasks = sum(
                        1 for subtask in task.sub_tasks if subtask.completed
                    )
                    total_subtasks = len(task.sub_tasks)
                    finished_task_count += completed_subtasks / total_subtasks

            completion_percentage = (
                round((finished_task_count / total_tasks * 100), 1)
                if total_tasks > 0
                else 0.0
            )

            result.append({"tag_text": tag.text, "percentage": completion_percentage})

        # Calculate completion percentage for tasks without tags
        no_tag_tasks = [task for task in user.tasks if not task.tag]
        finished_task_count = 0.0

        for task in no_tag_tasks:
            if task.status == Task.STATUS_FINISHED:
                finished_task_count += 1
            elif task.sub_tasks:
                # Count completed subtasks
                completed_subtasks = sum(
                    1 for subtask in task.sub_tasks if subtask.completed
                )
                total_subtasks = len(task.sub_tasks)
                finished_task_count += completed_subtasks / total_subtasks

        no_tag_percentage = (
            round((finished_task_count / len(no_tag_tasks)) * 100, 1)
            if no_tag_tasks
            else 0.0
        )

        # Add "No tag" result
        result.append({"tag_text": "No tag", "percentage": no_tag_percentage})

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error calculating completion": str(e)}), 500


@chart.route("/weekly", methods=["GET"])
@user_required
def get_weekly_results():
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    try:
        return jsonify({"data": get_week_data(user.study_sessions)}), 200
    except Exception as e:
        return jsonify({"error": f"error returning week results {e}"}), 500


@chart.route("/weekly/<tag_id>", methods=["GET"])
@user_required
def get_weekly_tag_results(tag_id):
    token = request.headers.get("Authorization")
    payload = get_user_from_token(token)
    user = User.objects(email=payload["email"]).first()
    # get the last week of a user's study sessions
    tag = Tag.objects(id=tag_id).first()
    try:
        filtered_sessions = [
            session for session in user.study_sessions if session.tag == tag
        ]
        return jsonify({"data": get_week_data(filtered_sessions), "tag": tag.text}), 200
    except Exception as e:
        return jsonify({"error": f"error returning week results {e}"}), 500


def get_week_data(study_sessions):
    print(study_sessions)
    today = datetime.now()
    start_of_week = today - timedelta(days=6)  # Start of last week
    end_of_week = today

    # Query studies from the previous week

    # Aggregate study minutes by day
    study_minutes_by_day = defaultdict(int)

    print(end_of_week)
    for study in study_sessions:
        print(f"checking study {study}")
        print(study.start_time >= start_of_week)
        if start_of_week <= study.start_time:
            print(f"study {study} is within week")
            day = study.start_time.date().isoformat()  # Get the date part
            study_minutes_by_day[day] += study.get_study_minutes()
            print(study.get_study_minutes())

    response = []
    for i in range(7):
        day = start_of_week + timedelta(days=i)
        response.append(
            {
                "date": day.date().isoformat(),
                "minutes": study_minutes_by_day[day.date().isoformat()],
            }
        )
    return response


# @chart.route("/", methods=["GET"])
# @user_required
# def tag_task_completion():
#     token = request.headers.get("Authorization")
#     payload = get_user_from_token(token)
#     user = User.objects(email=payload["email"]).first()

#     try:
#         # Retrieve tags associated with the user
#         tags = user.get_tags()
#         result = []

#         # Calculate completion percentages for tasks with tags
#         for tag in tags:
#             total_tasks = Task.objects(tag=tag).count()
#             finished_tasks = Task.objects(tag=tag, status=Task.STATUS_FINISHED).count()
#             completion_percentage = (
#                 (finished_tasks / total_tasks * 100) if total_tasks > 0 else 0
#             )
#             result.append({"tag_text": tag.text, "percentage": completion_percentage})

#        # Filter tasks with no tags
#         no_tag_tasks = [task for task in user.tasks if not task.tag]

#         # Filter finished tasks among them
#         no_tag_finished = [task for task in no_tag_tasks if task.status == Task.STATUS_FINISHED]

#         # Calculate percentage with proper safeguard
#         no_tag_percentage = (
#             (len(no_tag_finished) / len(no_tag_tasks)) * 100 if no_tag_tasks else 0
#         )

#         # Return "No tag" result
#         result.append({
#             "tag": "No tag",
#             "percentage": no_tag_percentage
#         })

#         return jsonify({"tag_completion": result}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500    # get all the params of the study session
#     # new session object
#     try:
#         if len(user.get_study_sessions()) < 1:
#             return jsonify([]), 201
#         study_session_json = [
#             json_formatted(session) for session in user.get_study_sessions()
#         ]
#         return jsonify(study_session_json), 201
#     except Exception as e:
#         return jsonify({"error adding study session": str(e)}), 500
