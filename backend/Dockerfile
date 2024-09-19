# syntax=docker/dockerfile:1

FROM python:3.12-slim-bookworm

WORKDIR /backend/

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
EXPOSE 8000
ENV FLASK_APP=app.py
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0","--port=8000"]
