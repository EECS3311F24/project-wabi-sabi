# wabi sabi

## What is WabiSabi

WabiSabi is a productivity application that lets you manage the amount of deep work sessions you're able to do in a day backed by productivity science. Wabisabi uses Pomodoro timers, Data management and insights, as well as simple gamificaton elements to try and make it a simple, fun, and frictionless addition to your day to day work.

Our team was motivated by wanting to make something simple to use, and filled a need we had. Our team had a lot of esperance using Pomodoro timers to manage deep work sessions, but wanted to

WabiSabi is simply the productivy timer we wish we had, so we decided to make it.

## Setup

### Quickstart (running within the container)

Wabisabi is Containerized with **Docker**, so running it is easy:

1. Make sure you have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

2. Clone the repo.

```
git clone git@github.com:EECS3311F24/project-wabi-sabi.git
```

3. cd into the project root and run the docker compose file.

```
docker-compose up
```

#### Ports

- Frontend runs on port 3000
- Backend runs on port 8000
- Database runs on port 27017

## Running on your machine:

### Frontend

1. clone the repo

```
git clone git@github.com:EECS3311F24/project-wabi-sabi.git
```

2. Install [bun](https://bun.sh/) and install dependencies

```
cd project-wabi-sabi/frontend

bun install
```

3. Run Frontend

```
bun run dev
```

### Backend:

1. clone the repo

```
git clone git@github.com:EECS3311F24/project-wabi-sabi.git
cd project-wabi-sabi/backend
```

2. Install [python3.12](https://www.python.org/downloads/release/python-3120/),[venv](https://realpython.com/python-virtual-environments-a-primer/)

3. create a python virtual environment named "venv", and install packages based on `requirements.txt`

```
python3.12 -m venv "venv"
source venv/bin/activate
pip install -r requirements.txt
```

4. Run flask server.

```
flask run
```

### Database:

For the sake of simplicity and not having duplicate data, the only instance of the database is created with the docker container.
Follow the instructions for Starting the conatiner, and then connect to the MongoDB instance through port `27017`

to explore the database through sshing into the docker container, or though mongo-express

## Frontend:

This project uses:
**Bun**: Javascript runtime environment
**React**: UI
**TypeScript**: Javascript with static typing
**TailwindCSS**: CSS preprocessor
**Vite**: Javascript package bundler
**Eslint & Prettier**: Javascript linter

## Backend:

This project uses:
**Python**: Programming Language
**Flask**: Web Server framework for python
**Ruff**: Python Linter

## Database:

This project uses:
**MongoDB**: NOSQL/BSON database

## Contributing

Look to our Jira board to find tickets that need to be worked on.

Branch off of `main`, with the name of your branch being the ticket number.

Submit a pull request to contribute your ticket changes back into main, await approval from one other developer before merging.

Ensure the following linters are ran before pushing work:

```
bun lint
bun format
ruff check
ruff format
```
