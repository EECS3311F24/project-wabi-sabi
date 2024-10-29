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
        payload = jwt.decode(token,SECRET_KEY,algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError as e:
        print(f"ERROR:{e}")
        return None
    except jwt.InvalidTokenError as e:
        print(f"ERROR:{e}")
        return None

def get_user_from_token(token):
    payload = decode_token(token)