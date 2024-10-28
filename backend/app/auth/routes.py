from flask import render_template, redirect, url_for, request, jsonify
from . import auth
import jwt
import bcrypt
from database import get_mongo_client

# Temp SECRET KEY
SECRET_KEY = "EECS3311_Wabisabi"

msg_col = get_mongo_client()["msg_db"]


# Function for generating token
# Used for verification on subsequent requests
def generate_token(email):
    payload = {"email": email}

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")  # Secret Key
    return token


# Sign-Up route
@auth.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data["email"]  # Retrieve email from JSON data
    password = data["password"].encode("utf-8")  # Retrieve password from JSON data
    confirm_password = data["confirm_password"].encode(
        "utf-8"
    )  # Retrieve confirmation password from JSON data

    # if passwords don't match, return code 400
    if password != confirm_password:
        return jsonify({"error:": "Passwords do not match!"}), 400

    # Hash password
    h_password = bcrypt.hashpw(password, bcrypt.gensalt())

    # Check if user already exists with email; else, register user
    user = msg_col.find_one({"email": email})
    if user:
        return jsonify({"error": "This email is already registered!"}), 400

    # Insert user into database
    msg_col.insert_one({"email": email, "password": h_password})
    return jsonify({"message": "User registered successfully! Please log in"}), 201


# Login route
@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"].encode("utf-8")

    # Retrieve user from database
    user = msg_col.find_one({"email": email})
    if not user or not bcrypt.checkpw(
        password, user["password"]
    ):  # if user does not exist OR inputted password is incorrect
        return jsonify({"error": "Invalid email or password!"}), 401

    # Generate and return a JWT token upon successful login
    token = generate_token(email)
    return jsonify({"token": token}), 200