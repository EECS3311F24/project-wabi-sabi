# Sprint planning Meeting for sprint 2
**Date:** November 5th, 7 pm

**Participants:**
Amanuel Aknaw, Jayden Brooks, Fred Hong, Jarod Lustre, Kimia Rajaeifar

All points mentioned in this document is based on discussions among the entire team. All members of the team contributed to the meeting and decision-making process.

## Meeting Summary:
During this meeting, we discussed the high-priority stories that we should address for sprint 2 based on the priority that we had assigned to them in the release planning meeting and on Trello.

Building on the groundwork established in sprint1, in this sprint we are able to add on top of the features we added in sprint 1. To allow us to work on showing data information using charts in sprint 3, we needed to work on some tasks that are necessary for us to be able to add charts in sprint 3.

As part of this preparation, we decided to add more details to our features and properly connect them to the database to store user activity data.

**As a result, we decided to work on the following sections for Sprint2:**

-	Tag component that is reusable in different sections of the app and allows users to tag their data
-	Pomodoro timer logical flow to create a fully functional timer that also saves user study data.
-	Ability to add subtasks to tasks and managing tasks on agranular level.
-	Completion percentage based on number of subtasks completed per task.

## Sprint Goal
With our focus on adding more details to the base features and storing user data in the backend to allow for adding charts in the future, we have established the following goals.  (More details for each goal is on Trello.)

-	We decided to add Tags as a feature to our app. We want the database to keep all the tags that a user adds. We want the users to be able to select from their list of tags and assign them to study sessions that they run. We also want users to be able to assign tags to tasks that they are adding to to-do lists.
-	We decided to add the pomodoro Timer logical flow to allow our timer feature to act as a proper pomodoro timer which automatically transitions between different timers and allows users to skip a focus timer or a break timer. One important task is also to make sure we save the data of the study sessions in the database to use later.
-	We also wanted to add the ability to add subtasks per task to allow users to break their tasks down and manage them granularly. This feature is one of our important features as we know that our competition does not allow for such granularity for task management. We want to make sure users have everything they need for proper task tracking and focus management.
-	We also want to display task completion percentage based on the percentage of subtasks completed to allow users to have a better idea of their progress towards task completion. This is also a feature that separates us from our competition and helps users know their progress.

## Sprint stories:
The name of stories mentioned here follow the story names on Trello.
-	Tag
-	Pomodoro Timer Logical flow
-	To do list subtasks
-	completion percentage-subtasks

## Task breakdown: 

-	**Tag:**
	- ticket-21-Tag-Backend DB:
	    - Tag table to store all the tags the user has with a text field and an id field
    	- APIs to add a new tag to the tag list of the user
	    - API for getting a list of tags that the user has
	    - Sessions should be able to have a tag each assigned to them when sending data to backend
    	- Tasks should be able to have a tag each assigned to them when sending data to backend
    - ticket-22-Tag-frontend:
        - timer:
            - Have a dropdown to show all the tags the user has
            - connect to backend to get list of tags
            - add a new tag to the list of tags by clicking on add tag button
            - select a tag by clicking on it in the dropdown and the chosen tag id being given to the dashboard that holds it
            - tag selection not available when timer is running
        - to do list:
            - Have a dropdown to show all the tags the user has
            - connect to backend to get list of tags
            - add a new tag to the list of tags by clicking on add tag button
            - select a tag by clicking on it in the dropdown and the chosen tag id being given to the dashboard that holds it
- **Pomodoro Timer logical flow:**
    - ticket-23-Pomodoro timer logical flow Frontend
        -	Once a timer finishes, it should automatically transition to the next counter. (As in if focus finishes it would go to break timer and back to focus and does so in the way that is necessary for pomodoro timers.)
    	- the user should have a skip button that when they click on it, they should be able to go to the next timer. (as in if they click it when in focus timer it will go to break timer and if they click it in break timer it will go to focus timer)
    	- the timer should automatically move to short break then back to focus when short break is done and every 4 pomodoro timers it should be a long break
    	- when timer starts, the start of it should be recorded and when user clicks anywhere on any button on the screen when the timer is running the data for that session should be sent (including tag)

- **to do list subtasks:**
    - ticket-24-To do list Subtask-Backend db
        - subtask model to be attached to tasks where the task model holds a list of subtasks assigned to the task.
    	- endpoint to call when creating a task to add subtasks to the said task
    	- update to task model to be able to have subtasks
    	- when task is deleted, subtasks should also be deleted
    	- subtasks should have status of “to-do” or “completed”
    	- when a call is made to get a list of tasks, for each task the list of subtasks should also be in the Json
    	- when main task is marked as completed all subtasks should get marked as completed

    - ticket-25-To do list subtask- Frontend
        - Table:
            - nested table for subtasks of a task where if you click on the dropdown icon it shows the nested list and when you click on it again it closes it
        	- ability to check off subtasks separate from the task

        - Add task pop-up:
            - being able to add and delete subtasks
            	- you can add them by clicking on plus icon and delete them by clicking on three dots
            - the subtask box is initially empty and has a text saying” no subtasks added for this task”
        	- the subtask box should have a set height and allow for scroll

- **Completion percentage-subtasks**
    - ticket-26-Completion percentage subtask-Frontend
        - when main task is checked off the percentage should be 100% and all subtasks should get checked off
    	- based on status:
        	- if main task is done =100%
        	- if main task is not done it should be based on the number of subtasks done
            	- if a task has 10 subtasks and 3 are done it should show 30%.
            	- should be done in frontend-preprocessing the table before it displays.
            	- the response from the backend should be modified to include the completion percentage for each main task. append a completion percentage field

- **ticket-27-refactoring existing routes**
    - Change routes to be based on the HTTP request type, instead of being based on the request type and the route of the site.

## Team Capacity:
**Amanuel Aknaw**: ticket-26-Completion percentage subtask-Frontend and helping with bugs and additional to do list related tasks as needed

**Jayden Brooks:** ticket-21-Tag-Backend DB, ticket-24-To do list Subtask-Backend db, ticket-27-refactoring existing routes

**Fred Hong:** ticket-25-To do list subtask- Frontend

**Jarod Lustre:** ticket-23-Pomodoro timer logical flow Frontend

**Kimia Rajaeifar:** ticket-22-Tag-frontend and SR1 documentation and trello handling and sprint 2 planning documentation and burndown pdf and schedule pdf for critical path.

## Spikes:
- We were wondering if we should calculate the completion percentage in the frontend or backend. We decided to do it in the frontend as it can change very often, and it might overload the backend.
- We were wondering when user checks of a task and we want to check off the subtasks should we do it on frontend and call the backend for each subtask or do it on the backend the second task is checked off, where when the task is checked off in the backend each subtask is checked off. We decided on doing it in the backend once.
- We were not sure how to keep the data of a study session if user leaves a dashboard mid focus session. For this we decided to use caching












