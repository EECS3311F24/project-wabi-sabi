# User Documentation

## Overview:

`User` is a class used to manage user documents in the MongoDB database.

## Document Parameters

- **email**: `string (REQUIRED)`- User's email
- **password**: `string (REQUIRED)`- User's password (hashed for security)
- **tasks**: `Task Id[]` - Tasks the user has made
- **friends**: `User Id[]` - Friend user has made
- **study_sessions**: `Study Id[]` -

## Methods:

### get_tasks():

**RETUNS**: List of the Users tasks.

### get_task(String:task_id):

**PARAM: task_id**: A Task object Id as a string.
**RETUNS**: The Task associated with that Id in the database

### get_study_sessions():

**RETUNS**: List of the Users Study Sessions.

### get_study_session(String:study_id):

**PARAM: study_id**: A Study Session object Id as a string.
**RETUNS**: The Study Session associated with that Id in the database

### get_friends():

**RETUNS**: List of the User's Friends.

### get_friend(String:friend_id):

**PARAM: study_id**: A Friend object Id as a string.
**RETUNS**: The Friend associated with that Id in the database

# Task Documentation

## Overview:

`Task` is a class used to manage task documents in the MongoDB database.

## Document Parameters

- **is_sub_task**: `boolean`- if the Task is the subtask of another task
- **text**: `string`- A Tasks text content
- **tag**: `Tag` - The Tag the Task is labeled with
- **status**: `string` - the Task's status
- **sub_tasks**: `Task[]` - subtasks within the task

## Methods:

### set_status(string:new_status)

**PARAM: new_status**: A status string

### to_json()

**RETURN:**: The parameters of a Task object as a json array

# Study Documentation

## Overview:

`Study` is a class used to manage study session documents in the MongoDB database.

## Document Parameters

- **start_time**: `DateTime`- When the session started
- **end_time**: `DateTime`- When the session ended
- **tag**: `Tag` - The Tag the Study Session is labeled with

## Methods:

### set_status(string:new_status)

**PARAM: new_status**: A status string

### to_json()

**RETURN:**: The parameters of a Task object as a json array

# Tag Documentation

## Overview:

`Tag` is a class used to manage Tag documents in the MongoDB database.

## Document Parameters

- **name**: `string` - the name of the tag

## Methods:

### update_status(string:new_name)

**PARAM: new_name**: The new name of the tag

# Auth Routes:

## Overview

Auth related routes handle signing up and logging in

## Routes:

### /signup

#### **METHODS**:

- POST

#### **JSON BODY**:

- email:string(REQUIRED)
- password:string(REQUIRED)

Creates a new user object based on the passed in parameters.

#### **RESPONSES**:

- 400: Invalid sign in, couldn't register user, or user already exists in database.
- 201: User registered successfully

## Routes:

### /login

#### **METHODS**:

- POST

#### **JSON BODY**:

- email:string(REQUIRED)
- password:string(REQUIRED)

Log in a user based on the email and password in the JSON Body

#### **RESPONSES**:

401:

- Invalid email or password.

  201:

- User registered successfully
- `returns` jwt session token

# Task Routes:

## Overview

Routes related to Task management, handles adding, getting, editing, and removing Task objects from the database.

## Routes:

### /tasks/add

#### **METHODS**:

- POST

#### **HEADER**:

- jwt token

#### **JSON BODY**:

- text:string (REQUIRED)
- tag:Tag
- due_date:string (YYYY-MM-DD Format)

#### **RESPONSES**:

400:

- Error thrown creating Task
- `returns` error

401:

- Invalid session token

  201:

- Task created successfully

### /tasks/get

#### **METHODS**:

- GET

#### **HEADER**:

- jwt token

#### **RESPONSES**:

400:

- Error thrown getting Tasks for user.
- `returns` error

401:

- Invalid session token

  201:

- Task created successfully
- `returns` json array of tasks

### /tasks/edit

#### **METHODS**:

- PATCH

#### **HEADER**:

- jwt token

#### **JSON BODY**:

- task_id:string(REQUIRED)
- text:string(REQUIRED)

#### **RESPONSES**:

400:

- Error thrown editing task
- `returns` error

401:

- Invalid session token

  201:

- Task updated successfully

### /tasks/rm

#### **METHODS**:

- DELETE

#### **HEADER**:

- jwt token

#### **JSON BODY**:

- task_id:string(REQUIRED)

#### **RESPONSES**:

400:

- Error thrown removing task
- `returns` error

401:

- Invalid session token

  201:

- Task removed successfully

# Study Session Routes:

## Overview:

Routes related to study sessions

### /study/add

#### **METHODS**:

- POST

#### **HEADER**:

- jwt token

#### **JSON BODY**:

- start_date:string (REQUIRED)
- end_date:string (REQUIRED)
- tag:Tag

#### **RESPONSES**:

400:

- Error thrown creating study session
- `returns` error

401:

- Invalid session token

  201:

- Study Session created successfully

### /study/get

#### **METHODS**:

- GET

#### **HEADER**:

- jwt token

#### **RESPONSES**:

400:

- Error thrown creating study session
- `returns` error

401:

- Invalid session token

  201:

- Study Session created successfully
- `return` Json array of the Users Study Sessions

# Tag Routes:

## Overview

Routes related to Tags

### /tag/add

#### **METHODS**:

- POST

#### **HEADER**:

- jwt token

#### **JSON BODY**:

- label:string (REQUIRED)

#### **RESPONSES**:

400:

- Error thrown creating Tag
- `returns` error

401:

- Invalid session token

  201:

- Tag created successfully

### /tag/edit

#### **METHODS**:

- GET

#### **HEADER**:

- jwt token

#### **JSON BODY**:

- tag_id:string (REQUIRED)
- new_label:string

#### **RESPONSES**:

400:

- Error thrown editing tag
- `returns` error

401:

- Invalid session token

  201:

- Tag edited successfully
