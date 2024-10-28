from app import create_app
from database import client
from flask_cors import CORS, cross_origin

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
