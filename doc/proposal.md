
# Table of Contents

1.  [Project organization structure](#org4614d6d)
    1.  [folder structure](#org9ce4fa7)
    2.  [elaboration](#orgd8584fa)
        1.  [general blueprint structure:](#org85d784e)
        2.  [blueprints:](#org3d21e65)
        3.  [other directories:](#orgbc922c8)
        4.  [other files:](#org9f31396)
    3.  [references + resources](#org0479df2)
        1.  [about blueprints](#org308811e)
        2.  [about auth](#org37b63a7)
        3.  [about timers](#orgd55d019)
        4.  [database](#orgf4f3631)
        5.  [project documentation](#org51dec50)
    4.  [Models:](#org4e3a045)
        1.  [Study Session:](#org00c4929)


<a id="org4614d6d"></a>

# Project organization structure

Backend is build modularly, with each section being a flask blueprint.


<a id="org9ce4fa7"></a>

## folder structure

    /wabisabi
        /backend
            /app
                __init__.py
                /main
                    __init__.py
                    routes.py
                    forms.py
                    models.py
                    /pomodoro
                        __init__.py
                        routes.py
                        forms.py
                        models.py
                    /tasks
                        __init__.py
                        routes.py
                        forms.py
                        models.py
                    /friends
                        __init__.py
                        routes.py
                        forms.py
                        models.py
                    /stats
                        __init__.py
                        routes.py
                        forms.py
                        models.py
                /auth
                    __init__.py
                    routes.py
                    forms.py
                /extensions.py
            /migrations
            seeds.py
            config.py
            run.py
            requirements.txt
        /frontend


<a id="orgd8584fa"></a>

## elaboration


<a id="org85d784e"></a>

### general blueprint structure:

-   <span class="underline"><span class="underline">init</span></span>.py: To make a blueprint.
-   routes.py: routing for blueprint
-   forms.py: forms for blueprint
-   models: data models for blueprint


<a id="org3d21e65"></a>

### blueprints:

/main: not auth stuff, has sub blueprints:

-   /pomodoro: timer
-   /tasks: task management
-   /friends: friends
-   /stats: stats about your studying

/auth: handles authentication


<a id="orgbc922c8"></a>

### other directories:

/extensions: handles instances of plugins (db, login)
/migrations: handles db migrations


<a id="org9f31396"></a>

### other files:

seeds.py: adds sample data to the database
config.py: configure the flask app
run.py: runs the flask app
requirements.txt: package management


<a id="org0479df2"></a>

## references + resources


<a id="org308811e"></a>

### about blueprints

-   <https://flask.palletsprojects.com/en/2.3.x/blueprints/>
-   <https://youtu.be/WteIH6J9v64?si=fm5luREWZUT7Gfi1>


<a id="org37b63a7"></a>

### about auth

-   <https://flask-login.readthedocs.io/en/latest/>


<a id="orgd55d019"></a>

### about timers

[sched documentation](https://docs.python.org/3/library/sched.html)


<a id="orgf4f3631"></a>

### database

-   <https://pymongo.readthedocs.io/en/stable/index.html>


<a id="org51dec50"></a>

### project documentation

-   <https://www.mkdocs.org/>


<a id="org4e3a045"></a>

## Models:


<a id="org00c4929"></a>

### Study Session:

1.  parameters:

    -   the user the session belongs to
    -   session start time
    -   session end time
    -   session tag
    -   if the session is ongoing or completed (are we able to cancel sessions? i forgor)

2.  methods

    -   start<sub>session</sub>(): starts session and sets end<sub>session</sub> to run in now + time minutes.
    -   end<sub>session</sub>(): runs when the timer is complete. marks session as completed.

