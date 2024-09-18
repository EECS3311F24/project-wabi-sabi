from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return '<h1>Amongus, sussy wussy.</h1>'


if __name__ == "__main__":
    app.run(debug=True)
