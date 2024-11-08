import jwt
import bcrypt
import base64
# Function for generating token
# Used for verification on subsequent requests

# Temp SECRET KEY
SECRET_KEY = "EECS3311_Wabisabi"


def generate_token(email):
    payload = {"email": email}

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")  # Secret Key
    return token


def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError as e:
        print(f"ERROR:{e}")
        return None
    except jwt.InvalidTokenError as e:
        print(f"ERROR:{e}")
        return None


def get_user_from_token(token):
    print(token)
    payload = decode_token(token.split(" ")[1])
    return payload


def user_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token is missing!"}), 403

        try:
            # Decode the token
            data = get_user_from_token(token)
            email = data["email"]
            # Check if the user is an admin
            user = User.objects(email=email).first()
            if user is None:
                return jsonify({"message": "Invalid user token"}), 500

        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 403
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 403

        return f(*args, **kwargs)

    wrapper.__name__ = f.__name__
    return wrapper
