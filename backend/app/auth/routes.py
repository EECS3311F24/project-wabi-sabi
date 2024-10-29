from flask import render_template, redirect, url_for, request, jsonify
from . import auth
from ..models import User
import jwt
import bcrypt
from database import get_database

# Temp SECRET KEY
SECRET_KEY = "EECS3311_Wabisabi"

get_database()


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
    # Hash password
    h_password = bcrypt.hashpw(password, bcrypt.gensalt())

    # Check if user already exists with email; else, register user
    if User.objects(email=email):
        return jsonify({"error": "This email is already registered!"}), 400

    # Insert user into database
    new_user = User(email=email, password=h_password.decode("utf-8"))
    try:
        new_user.save()
        return jsonify({"message": "User registered successfully! Please log in"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    # msg_col.insert_one({"email": email, "password": h_password})


# Login route
@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"].encode("utf-8")

    # Retrieve user from database
    user = User.objects(email=email).first()
    if not user or not bcrypt.checkpw(
        password, user.password.encode("utf-8")
    ):  # if user does not exist OR inputted password is incorrect
        return jsonify({"error": "Invalid email or password!"}), 401

    # Generate and return a JWT token upon successful login
    token = generate_token(email)
    return jsonify({"token": token}), 200
