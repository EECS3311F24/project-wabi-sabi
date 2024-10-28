from flask import request, jsonify
import jwt
import bcrypt
from app import msg_col, app

# Temp SECRET KEY
SECRET_KEY = "EECS3311_Wabisabi"


# Function for generating token
# Used for verification on subsequent requests
def generate_token(email):
    payload = {"email": email}

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")  # Secret Key
    return token


# Sign-Up route
@app.route("/signup", methods=["POST"])
def signup():
    # data = request.json
    # email = data["email"]  # Retrieve email from JSON data
    # password = data["password"].encode("utf-8")  # Retrieve password from JSON data

    email = request.form.get("email")  # Use form.get to retrieve form data
    password = request.form.get("password").encode("utf-8")

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
@app.route("/login", methods=["POST"])
def login():
    # data = request.json
    # email = data["email"]
    # password = data["password"].encode("utf-8")

    email = request.form.get("email")  # Use form.get to retrieve form data
    password = request.form.get("password").encode("utf-8")

    # Retrieve user from database
    user = msg_col.find_one({"email": email})
    if not user or not bcrypt.checkpw(
        password, user["password"]
    ):  # if user does not exist OR inputted password is incorrect
        return jsonify({"error": "Invalid email or password!"}), 401

    # Generate and return a JWT token upon successful login
    token = generate_token(email)
    return jsonify({"token": token}), 200
