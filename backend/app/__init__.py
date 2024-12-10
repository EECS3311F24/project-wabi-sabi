from flask import Flask
from flask_cors import CORS, cross_origin
from flask_swagger_ui import get_swaggerui_blueprint
from database import get_database


def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config["CORS_HEADERS"] = "Content-Type"
    # Swagger UI setup
    SWAGGER_URL = "/swagger"  # URL for accessing Swagger UI
    API_URL = "/static/swagger.yaml"  # Path to your swagger.yaml file

    # Create the Swagger UI blueprint
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            "app_name": "Documentation"  # Title for your API
        },
    )

    # start db connection
    get_database()

    # Register the blueprint
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    # configure other blueprints
    from .auth import auth as auth_blueprint

    app.register_blueprint(auth_blueprint)

    from .main import main as main_blueprint

    app.register_blueprint(main_blueprint)
    return app
