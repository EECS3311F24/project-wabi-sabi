# Release planning Meeting

**Date:** October 24th, 7pm

**Participants:**
Amanuel Aknaw, Jayden Brooks, Fred Hong, Jarod Lustre, Kimia Rajaeifar

All points mentioned in this document is based on discussions among the entire team. All members of the team contributed to the meeting and decision-making process.

## Meeting Documentation

During this meeting we reviewed the stories in the product backlog (available on Trello) and prioritized them according to the value that they bring to the user. 

Our main goal was to select stories that made the app more useful for planning and using the pomodoro technique in studying. 
However, we recognize the importance of tracking study trends and patterns for a successful productivity application so we decided to make sure to include visual tools to display these insights in our first release.

Given that we want to be the best productivity application our highest priorities are:

- A functioning and configurable pomodoro technique based timer

- A functioning to do list which allows for successfully tracking all tasks in one place 

- Charts to display user focus and work trends

We realize that while login and signup features may not have the highest user value, they provide functional benefits such as allowing users to save and access their data from anywhere and safely. As a result we included login and signup in our release goals.

We will also be providing an easy to use Navigation bar throughout the dashboards to help users move within dashboards easily.

**we have separated our chosen goals into two groups:**

Functional goals and user value goals.

Where functional goals are the features that are needed for basic functionality of the app and app navigation even if they don’t delight the user as standalone features. These are feature such as login, signup and Navigation and logout.

The user value goals include features that delight the user and add to the value that our product brings to the user. 

Features that are directly related to the user experience within our app fall within this group. Any feature supporting the pomodoro technique and habit tracking such as the timer, our to do list and tagging and data visualization charts.

A good combination of both of these groups is necessary for a good release.

**Chosen features:**

- For this release our primary focus will be on
An intuitive timer that works with pomodoro technique

- A to do list that allows users to track their tasks and see their progress

- Charts to show user activity trends and user focus

- We want users to be able to assign tags to both timers and to do tasks to make it easier to track work and timer sessions and use the data for charts in a meaningful manner

- We also want users to be able to see a completion percentage for their tasks to allow them to visualize their progress

    -  To do this feature in the most reasonable way we may need to have subtasks implemented for each task. We believe this will be a challenging task on the frontend but we are hoping to find a solution for this

- We also want to allow for customization of focus time and break time durations.

- We also want to include the following charts in our first release:

    - Task Completion per Tag(bar chart): Displays the percentage of tasks completed under a specific tag, for all of the tags.

    - Time-Based focus distribution(line chart): displays user focus trends over a selected time period (daily, weekly and …)

**Additional features under consideration:**

If we do end up with more time on our hands in this release we can try to address the following features
- Focus timer breakdown(pie chart): Shows the amount of focus time for each tag relative to total study time
- Searching and sorting in to-do list to facilitate task retrieval.
- Basic friend section to be able to see stats of other people

**Features that we will not be working on for this release:**

The following features will likely not be included in this release as they do not align with our primary focus:(more details about them can be found on trello)

- Study session table
- Reward system for users
- Public REST API 
- Google calendar integration
- Password change and email verification

## Release goals and scope of project:
Based on previously mentioned points the release goals are as follows which correspond to Trello stories. Each name mentioned bellow is based on the name of user stories on Trello

**High priority in function but not user value chosen for release:**
- create an account
- logging in
- logging out
- Nav bar

**Features with high value chosen for release:**

- Adding tasks to a to-do list
- basic timer features
- completion percentage
- Tag
- Pomodoro Timer Logical Flow
- To do list subtasks
- Completion percentage based on subtasks
- Configuring timer lengths
- Task completion chart view
- Time based focus distribution chart






**In case we are need more features for release:**
- Focus time breakdown chart
- Editing tasks in to do list
- Sorting to do list
- Search for tasks
- Adding friends and seeing their stats












