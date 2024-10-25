from flask import Flask, redirect, url_for, request
from pymongo import MongoClient, errors
from flask_cors import CORS, cross_origin
import json
import time


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

MONGO_HOST = "127.0.0.1"
MONGO_PORT = "27017"
MONGO_DB = "msg_db"
MONGO_USER = "admin"
MONGO_PASS = "amongus"

uri = f"mongodb://{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}"

for _ in range(5):
    try:
        mongoClient = MongoClient(uri)
        db = mongoClient[MONGO_DB]
        db.command("ping")
        print("connected to database")
        msg_col = db.get_collection("msg_col")
    except errors.OperationFailure as e:
        print("mongo auth failed, retrying...")
        print(e)
    except Exception as e:
        print(f"ERROR OCCURED: {e}")

import auth.routes  # import after msg_col is defined


@app.route("/")
def home_page():
    return "root"


@app.route("/api/data", methods=["POST"])
def handle_data():
    data = request.json
    print("inside the handler I swear")
    msg_col.insert_one({"msg": data["message"].lower()})
    return redirect(url_for("getmsgs"))


@app.route("/getmsgs/")
def getmsgs():
    msg_json = []
    if msg_col.find({}):
        for msg in msg_col.find({}).sort("msg"):
            msg_json.append({"msg": msg["msg"], "id": str(msg["_id"])})
    return json.dumps(msg_json)


if __name__ == "__main__":
    app.run(debug=True)
