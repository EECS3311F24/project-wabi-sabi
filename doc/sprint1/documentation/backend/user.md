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
