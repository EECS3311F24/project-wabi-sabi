# Product Backlog
1. Create an account
    
    **User story:**
    
    As a student who wants to start tracking their study habits, I want to be able to create an account so that I can save all my study sessions and tasks.

    **Criteria of satisfaction:**

    - Valid email address used to sign up

    - Password follow security requirements

    - Verifying password by retyping it

    - Verification email is sent to user to verify their new account once created

2. Logging in
   
    **User story:**

    As a registered user, I want to log in to my account so that I can access my past data and start a new pomodoro session

    **Criteria of satisfaction:**

    - Log in using the email address/password used when initially registered

    - Past data/statistics is available to view

3. Logging out
    
    **User story:**

    As a registered user, I want to log out of the application from my account so that my information cannot be accessed by anyone else

    **Criteria of satisfaction:**

    - User is no longer signed into their account upon logging out

4. Changing password
    
    **User story:**

    As a registered user who forgot their password, I want to create a new password so that I can access my account without creating a new account

    **Criteria of satisfaction:**

    - Email address used for their account can be entered

    - Password reset email that contains a link is sent to user

    - New password is created according to security requirements

    - Password confirmation

    - User can log in with their email and new password

5. Adding tasks to a to-do list
   
    **User story:**

    As a user who constantly has tasks, I want to add tasks to a to-do list so that I can track which tasks need to be completed.

    **Criteria of satisfaction:**

    - Any tasks (incl. sub tasks) can be edited/deleted from the to-do list

    - Subtasks to existing tasks can be added

    - Tasks can be assigned with corresponding due dates

    - Tasks can be assigned with tags related to the task
6. completion percentage

    **User story:**

    As a user trying to manage my tasks, I want to see completion percentage for each task based on the subtasks completed so that I can see my progress for the task that I have to complete.

    **Criteria of satisfaction:**

    - make sure the percentage shows 100% when all subtasks are done

    - the percentage should show 0% if none of the subtasks are marked as done

    - the percentage should show 0 if there are no subtasks and the task is not marked done

    - the percentage should show 100 when there are no subtasks and the task is marked as done

    - the percentage should be on the right side of the main task name and should follow figma design

7. Sorting to-do list

    **User story:**

    As a user managing my to do list tasks , I want to be able to sort my to do list based on completion and due date and done status so that I can action the tasks based on the priority of when they are due and how much of them is not done.

    **Criteria of satisfaction:**

    - support for sorting all tasks based on due date(closest)

    - puts tasks with closer due dates at top

    - puts tasks with no due date at the bottom

    - support for sorting all tasks based on completion percentage(least)

    - puts tasks with least completion percentage at top

    - support for sorting all tasks based on completion percentage (most)

    - puts tasks with most completion percentage at top

    - there should be a checklist to check if I want to see tasks that are 100% done or not(whether a filter is being applied or not)

8. searching for tasks

    **User story:**

    As a user managing my to do list, I want to be able to search for a task based on tag or task name so that I can find a specific task in the list of all of my to do list tasks.

    **Criteria of satisfaction:**

    - search should work for the full name of a task

    - if the search is partial search all matches should be shown sorted alphabetically

    - search based on tag should show all tasks with the tag sorted alphabetically

9. time based focus distribution chart

    **User story:**

    As a user who uses the timer, I want to be able to see a bar chart showing  distribution of focus time per day/week/month/year so that I can check my work habits and reflect accordingly.

    **Criteria of satisfaction:**

    - there should be a dropdown to choose  day/week/month/year

    - on the y axis there should be the number of hours

    - on the x axis

         - there should be the hour of the day for daily

        - there should be the day of the week for weekly

        - there should be the month for monthly

        - there should be the year on yearly

10. Focus Time Breakdown Chart

    **User story:**

    As a user who likes keeping track of the amount of work I do, I want a chart that breaks down the amount of focus time I’ve allotted per activity tag so that I can view how much time I’ve spent on specific activities.

    **Criteria of satisfaction:**

    - Shows each tag as a percentage of the user’s total focus time in a pie chart

    - Support visualizing all of the user’s tags in a single chart

    - Show each tag/slice of the chart as a unique color

    - Shows the correct hours/percentage

    - Shows the total focus time of the user

11. Completed Tasks Per Tag Breakdown Chart

    **User story:**

    As a user who likes statistics, I want a pie chart that divides the number of tasks I’ve done by tag  so that I would know which activities I’ve spent the most time on.

    **Criteria of satisfaction:**

    - Shows each tag as a percentage of the user’s total tasks done in a pie chart

    - Support visualizing all of the user’s tags in a single chart

    - Show each tag/slice of the chart as a unique color

    - Shows the correct number of tasks/percentage per tag

    - Shows the total number of completed tasks

12. Pomodoro Timer

    **User story:**

    As a student who uses the pomodoro technique, I want a timer that uses the pomodoro technique which automatically transitions from focus → short break → … → long break to help guide me while I work.

    **Criteria of satisfaction:**

    - The timer should follow the pomodoro method (4 25-minute work sessions separated by 5-minute short breaks, then a long break for 15-30 minutes)

    - Once a timer finishes, it should automatically transition to the next counter

13. Basic Timer Features

    **User story:**

    As a user who likes having control over his workflow, I want to have features that will allow me to control a timer so that I have autonomy over the work I do.

    **Criteria of satisfaction:**

    - There should be a basic timer without the “pomo flow” 

    - The timer should have a start and pause button

    - The timer should have a restart button (restarts the current timer to default)

    - The timer amount should be configurable (up to 60 minutes)

    - The user should be able to assign tags every time they start a work session so that we could track it in the backend

    - When the user clicks a timer button (either work, short break, or long break), it just restarts the timer

14. Adding People

    **User story:**

    As a competitive student, I want add people using their identification number so that I can look at their stats.

    **Criteria of satisfaction:**

    - User can send an add me request to the person they want to add by inserting their ID.

    - User will be asked for confirmation if they want to add the person.

    - The user that is being added will receive a notification when they get the add me request.

    - The user that is being added can accept or reject the request.

    - Once the people are friends they can look at each others stats.

15. Due date reminder

    **User story:**

    As a busy user, I want to receive reminders based on the tasks that are due soon so that I can complete my tasks on time.

    **Criteria of satisfaction:**

    - User will receive a reminder by default if they have any task due soon.

    - User can set their own due date reminder(Example: 2 hours before).

    - User can disable reminders for any task.

16. Focus hours suggestion

    **User story:**

    As a user who is often distracted, I want to receive recommendations on days or times to focus based on my past productive periods.

    **Criteria of satisfaction:**

    - The app should track the users productive days or times.

    - User should get a notification about their productive days or times based on their history.

17. Profile Picture Reward

    **User story:**

    As a reward driven person, I want to receive special profile picture based no the number of focus hours or number of tasks I have completed.

    **Criteria of satisfaction:**

    - User should receive unique profile pictures after reaching some milestone.

    - User can use the rewards they have earned as their profile picture.

18. Public REST Api

    **User story:**

    As someone with a competitive nature, I’d like to compare the amount of time I spend studying to other people as a form of motivation.

    **Criteria of satisfaction:**

    - Profiles are set to private or public

    - Public profiles can have their study stats found by other users, by viewing a leaderboard.

    - Private users can only have their study stats viewable by users who are friends.

19. Study Session leader-board

    **User story:**

    As someone with a competitive nature, I’d like to compare the amount of time I spend studying to other people as a form of motivation.

    **Criteria of satisfaction:**

    - Profiles are set to private or public

    - Public profiles can have their study stats found by other users, by viewing a leaderboard.

    - Private users can only have their study stats viewable by users who are friends.

20. Google Calendar integration

    **User story:**

    As a student with a goal to foster consistent study habits, I want to be able to view the study sessions I’ve completed across various spans of time. So I can measure my progress towards my goals.

    **Criteria of satisfaction:**

    - Allow data to be filtered and displayed based on day,week,month, and year.

    - A session will include the start and end times, as well as any tag that was applied to the session.

    - Allow for custom spans of time to filter by (the length of one academic term)

    - Data is viewable as a list of individual sessions or a heatmap

    - Session data can also be removed

21. Study Session Counting
    
    **User story:**

    As a student with a goal to foster consistent study habits, I want to be able to view the study sessions I’ve completed across various spans of time. So I can measure my progress towards my goals.

    **Criteria of satisfaction:**

    - Allow data to be filtered and displayed based on day,week,month, and year.

    - A session will include the start and end times, as well as any tag that was applied to the session.

    - Allow for custom spans of time to filter by (the length of one academic term)

    - Data is viewable as a list of individual sessions or a heatmap

    - Session data can also be removed