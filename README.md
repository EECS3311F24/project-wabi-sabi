# wabi sabi

## What is WabiSabi

WabiSabi is a productivity application that lets you manage the deep work you're able to do in a day, backed by productivity science. Wabisabi uses Pomodoro timers, data insights, as well as simple gamificaton elements to try and make it a simple, fun, and frictionless addition to your day to day work.

Our team was motivated by wanting to make something simple to use, and filled a need we had. Our team had a lot of experience using Pomodoro timers to manage deep work sessions, but none of them were perfect. WabiSabi is simply the productivity timer we wish we had, so we decided to make it.

## Setup

**IMPORTANT:** This project includes docker images for the frontend, backend, and database. 
The Docker version of the frontend and backend have known issues, for now, **please use the local versions of the frontend and backend** by following the "Running on your machine" steps alongside the "Quickstart" steps.

Also this project is known to have issues with WSL, please avoid using WSL for now.

Before any method: Clone the repo

```
git clone git@github.com:EECS3311F24/project-wabi-sabi.git
```

### Quickstart (running within the container)

Wabisabi is Containerized with **Docker**, so running it is easy:

1. Install:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/).

2. Clone the repo.

```
git clone git@github.com:EECS3311F24/project-wabi-sabi.git
```

3. cd into the project root and run the docker compose file.

```
docker-compose up
```

#### Ports

##### DOCKERIZED VERSION
- Frontend runs on port `4000`
- Backend runs on port `8000`
- Database runs on port `27017`

##### LOCAL VERSION
- Frontend runs on port `4001`
- Backend runs on port `5000`

## Running on your machine:

### Frontend

1. Install

- [bun](https://bun.sh/)

2. Then install dependencies

```
cd project-wabi-sabi/frontend

bun install
```

3. Run Frontend

```
bun init
bun run dev
```

### Backend:

2. Install

- [python3.12](https://www.python.org/downloads/release/python-3120/)
- [venv](https://realpython.com/python-virtual-environments-a-primer/)

3. Make sure you're in the /backend directory (cd project-wabi-sabi/backend). Then, create a python virtual environment named "venv", and install packages based on `requirements.txt`. 
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

1. Install [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

2. Follow the Quickstart instructions earlier in the README to run the docker compose (this makes containers for the frontend, backend, and database, although we're only interested in the database at this time.)

Connect to the MongoDB instance through port `27017`

## Frontend:

This project uses:

- **Bun**: Javascript runtime environment
- **React**: UI
- **TypeScript**: Javascript with static typing
- **TailwindCSS**: CSS preprocessor
- **Vite**: Javascript package bundler
- **Eslint & Prettier**: Javascript linter

## Backend:

This project uses:

- **Python**: Programming Language
- **Flask**: Web Server framework for python
- **Ruff**: Python Linter

## Database:

This project uses:

- **MongoDB**: NO SQL/BSON database

## Testing everything works:
(Make sure you've followed the steps in "quickstart" and "running on your machine")
1. Start the local version of the frontend
``` 
cd frontend
bun run dev
```
2. Start the backend server
``` 
source venv/bin/activate
flask run
```
3. Verify the docker containers are running with 
``` 
docker ps
```
You should see 3 containers named "frontend", "backend", and "mongo"

If you run into any issues, follow the steps listed in "quickstart" and "running on your machine"

4. navigate to port 4001 to view the frontend

5. Enter a line of text in the form and hit send

6. You should receive a JSON string with a list of messages in the database. If you'd like to look through the database directly you could use a tool like [MongoDB Compass](https://www.mongodb.com/products/tools/compass

you should be able to open the local version of the frontend enter text into the form in the frontend, and have it sent to the backend to be sent to the database.

## Contributing

Look to our [Trello Board](https://trello.com/invite/b/66eddb6910376903ff1f7fd4/ATTIcb1d460a76c0853aa443feed20988fe38035A199/wabi-sabi) to find tickets that need to be worked on.

Branch off of `main`, with the name of your branch being the ticket number.

Submit a pull request to contribute your ticket changes back into main, await approval from one other developer before merging.
(As you are creating your pull request, please add a label to categorize your request e.g. 'frontend' for front-end work, 'backend' for back-end work)

Ensure the following linters are ran before pushing work:

```
# ensure you're in /backend
pip freeze > requirements.txt
ruff check
ruff format

# ensure you're in /frontend
bun lint
bun format
```
