import jwt
import bcrypt
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
        payload = jwt.decode(token,SECRET_KEY,algorithm="HS256")
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def get_user_from_token(token):
    if not token:
        return None
    payload = decode_token(token)
    if not payload:
        return None
    return payload