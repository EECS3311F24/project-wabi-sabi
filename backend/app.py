from flask import Flask, redirect, url_for
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('names_db')


@app.route("/")
def hello_world():
    return "amongus (server)"


if __name__ == "__main__":
    app.run(debug=True)
