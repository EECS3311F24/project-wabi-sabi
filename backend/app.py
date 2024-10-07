from flask import Flask, redirect, url_for
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

mongoClient = MongoClient("mongodb://127.0.0.1:27017")
db = mongoClient.get_database("msg_db")
msg_col = db.get_collection("msg_col")


@app.route("/addmsg/<msg>/")
def addmsg(msg):
    msg_col.insert_one({"msg": msg.lower()})
    return redirect(url_for("getmsgs"))


@app.route("/getnames/")
def getmsgs():
    msg_json = []
    if msg_col.find({}):
        for msg in msg_col.find({}).sort("msg"):
            msg_json.append({"msg": msg["msg"], "id": str(msg["_id"])})
    return json.dumps(msg_json)


if __name__ == "__main__":
    app.run(debug=True)
