# Sprint 1 meeting
**Date:** October 24th, 7 pm

**Participants:**
Amanuel Aknaw, Jayden Brooks, Fred Hong, Jarod Lustre, Kimia Rajaeifar

All points mentioned in this document is based on discussions among the entire team. All members of the team contributed to the meeting and decision-making process.

## Meeting Summary
During this meeting we discussed the high priority stories that we should address first for sprint1.

We understand that although signup, login and logout functionalities may not offer significant user value in terms of investment value and features, they are essential for managing user data and security and allowing user to access their data from anywhere, allowing for a good user experience that is expected by the user.

**We decided that our primary setup tasks for the app include:**

- Implementing a navigation bar for easy navigation between dashboards
- Implementing a basic timer feature such as starting, pausing, resuming and resetting a timing and supporting different timer types such as focus, short break and long break.
- Creating a to do list with the ability to add, view and delete tasks. 

Note: subtask and subtask completion tracking will be considered in future sprints and for this sprint completion percentage will be based solely on the main task completion status.

## Sprint Goal
The goal of this sprint is to create the foundational elements of the application to allow us to build on top of it for next sprints.
**The goals include:**
- Implement signup, login and logout 
- Implement a basic timer feature to allow for Pomodoro technique to be added later
- Create a basic to do list that allows a user to add a task with a due date and view all of their tasks, mark them as completed and delete tasks and see if a task is completed or not
- Enable navigation using a navigation bar
- Create reusable components for buttons to be used throughout the application based on our style

## Sprint stories:
(the name of stories mentioned here follows Trello naming) 
This Sprint stories are:

- Logging in
- Logging out
- Nav bar to help with redirection
- Adding tasks to to do list
- Basic timer features
- Create an account
- Completion percentage-main task

## Task breakdown:
### Logging in:

**Login frontend:**

“no forgot password at this stage”
- based on the figma
- form for inputting info and make a post request with email and password to check if account exists
    - connect to endpoint and show message
- if response successful directed to timer
- if not successful show the message

**Login Backend:**

backend:

- check table to see if account exists based on given email and password
- if email true but password not “incorrect password”
- if email not true “No account exists with this Email”
- send response back

### Logging out:
**Frontend:**

- dropdown with logout when clicking the sushi at top right
- redirect to login
- there should not be any user connected
- User is no longer signed into their account upon logging out
- when I click on the sushi at the top right corner of screen I should see a dropdown that shows me the option for logout
- when I click on logout I should be redirected to login page

### Nav bar:
**Frontend:**
- When I click a button in the navigation bar I should be redirected to the page of the specific feature that I clicked on
- buttons in nav bar for the page I am on should be selected and other buttons should not show as selected
- persistent through pages

### Adding tasks to to do list:
**Adding tasks to a to-do list FRONTEND**

- flow should the figma
- only adding and table
- table set height with scrollbar
- for adding
    - when it is saved or edited -post to db
    - when it is deleted, delete request
- able to choose due date for task

**Adding tasks to a to-do list BACKEND**

- for the table please follow the document created on zoom
- there should be a table that has the features mentioned in the pdf attached below
- there should be an endpoint that can be called to add a task to the to do list table so it can later be retrieved
- each task has:
    - taskId
    - isSubTask: boolean
    - description: String
    - due-date: Date
    - status: String (status)

**To do list table FRONTEND**

- on the table with the three dots
    - delete option
    - edit option
- the table has checkboxes
- the table shows the tag and the due date
- if a task is checked off, completion percentage should be 100%
- if edit is clicked the full state of the task should be loaded on the add task module and it should be updatable

**to do list table BACKEND**

- when the task is done the status of it should be set
- when a task is deleted from front end it should be removed
- when a task is edited, it should be updated
- there should be endpoints for this

### Basic timer features:
**basic timer features FRONTEND
frontend:**

- buttons and style should follow figma
- the timer at the top showing progression
- start and pause and restart button that control the timer
- buttons for focus short break and long break
    - timer type for each button
    - when button is clicked the button stays selected
        - the timer type is changed to that type
            - type affects timer length
            - type affects if the information will get saved to db

**Basic timer features BACKEND**

- Table should follow the style mentioned in meeting
- the pdf attached below can be used for the variables needed for the object.
- this should only be used for storing focus timer data in a table.
- there should be an endpoint that can be called with start and end to keep data on timer run time.
 
    - session id
    - date: Timestamp
    - start: Date
    - end: Date
    - duration:
    - tag: tagID

### Create an account:

**Account creation/sign up**

after account is created user goes to success page which allows for redirection to login page

- component required for sign-up page based on mockup
- call backend API for sign up
- email already exists (showing end point response)
- typed and retyped password should be the same
    - if not show message under confirm password “password does not match”
- if account creation successful user is directed to success page “account created successfully, go to login page”
    - go to login page should link to login page

**Account creation/sign up BACKEND**

- create user table
    - has email and password, user id
- endpoint for putting information in table
    - response for success
- checking if email already exists and not creating an account if so

### Completion percentage:
**completion percentage-frontend**

- the percentage should show 0 if there are no subtasks and the task is not marked done
- the percentage should show 100 when there are no subtasks and the task is marked as done
- the percentage should be on the right side of the main task name and should follow figma design

## Team capacity:

**Amanuel Aknaw**: frontend for to do list table, frontend for adding tasks to to do list

**Jayden Brooks**: Backend for timer, Backend for to do list, flask blueprints, user table

**Fred Hong**: Backend of login, backend for signup. Swagger docs  

**Jarod Lustre**:front end for  Login in, Frontend for signup(portion), base setup of frontend, Timer dashboard, having dashboard pages as protected routes not accessible without logging in

**Kimia Rajaeifar**:Nav bar, Logout dropdown, Frontend for signup(portion), Product owner, handling trello, writing RPM and Sprint1pm and standup docs. 


## Spikes:
We were wondering what to use for our docs 
- We will be using swagger for backend APIs
- We will be using Markdown files for documenting other features.











