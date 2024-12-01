# Sprint planning Meeting for sprint 3
**Date:** November 19th, 7pm

**Participants:**
Amanuel Aknaw, Jayden Brooks, Fred Hong, Jarod Lustre, Kimia Rajaeifar

All points mentioned in this document is based on discussions among the entire team. All members of the team contributed to the meeting and decision-making process.

## Meeting Summary:

During this meeting, we discussed the high-priority stories that we should address for sprint 3 based on the priority that we had assigned to them in the release planning meeting and on Trello.

Building on the groundwork established in sprint1 and 2, this sprint we can bring some more details into our features to allow users to customize based on their needs. We will also be bringing in 2 charts that can encapsulate our user’s data and give them useful information based on their study habits.

**As a result, we decided to work on the following sections for Sprint3:**

-	Task Completion per tag chart which allows the user to see their progress for each tag. We also allow the same information for tasks with no tag.
- Time based focus distribution chart (weekly) which allows the user to see how many hours they focused in the past 7 days. We also allow them to filter this chart based on the tag the timers were assigned to.
-	Ability to sort the to do list based on different columns either in an ascending or a descending way.
- Ability to search for a task by its name in the to do list
- Ability to customize the timer lengths for the focus timer, short break and long break.

## Sprint Goal
With our focus on bringing in charts to allow users to visually see their habits and work towards their goals and allowing for increased customization, we have established the following goals.  (More details for each goal is on Trello.)

- We decided to add the chart that displays what percentage of tasks in each tag has been completed. This chart depends on the completion percentage that the task has in the to do list and the tag that is assigned to it. We take into consideration tasks that are partially done, and we consider the portion of that task that has been completed (based on the number of subtasks checked off). We will display all the tags that a user has and for each task it will be assigned a percentage from 0-100 based on how much of its tasks are completed. This is a bar chart.
- 	We also wanted to give our users more information about the timers that they run. To do so we decided to add the time-based focused distribution chart which has the name of each day on the x axis and the number of hours studied on the y axis. This chart can tell you how much you studied each day for the past 7 days so that you can see your progress. The past 7 days correspond to today and they get updated. We also provide a tag dropdown which allows user to filter the chart based on the tag that was assigned to the timer when it ran. This means you can compare how much time you spent on each subject easily.
-	We also understand the importance of being able to sort your to do list based on its columns to allow users to easily find the data that they are looking for. Using this feature our users will be able to find the tasks with the least completion percentage and focus on them or find tasks with closest due dates to focus on.
- To allow our users to easily access a task that they are looking for to easily update it, we made sure to add a search bar that allows for search based on the task name.
-	We understand that not everyone has the same study habits and not everyone wants to focus for the exact same amounts of time. Because of this we decided to add the capability to customize the timer lengths based on your needs. We want to make sure everyone can use our app based on what works for them the best.

## Sprint stories:
The name of stories mentioned here follow the story names on Trello.

-	Task Completion Chart View
- 	time based focus distribution chart-week
- 	Sorting to-do list
- 	searching for tasks
-	Configuring timer lengths


## Task breakdown: 

-	Task Completion Chart View:
    - 	ticket-31-Task completion chart-backend:
        - 	percentage should consider the completion percentage in the to-do table meaning if a tag has 2 tasks and one is 33 percent done and the other one is not done it should show 16%
        -	endpoint to send back data broken down into parts based on tag name and percentage for each tag
        -	anything that doesn’t have a tag should be grouped together with a name no tag and be given percentage
    - 	ticket-32-Task completion chart-frontend:
        -	horizontal bar chart
        - 	name of each tag on y axis
        - 	percentage on x axis
        - 	shows percentage of main tasks that are completed in a tag
        -	 shadcn/ui barchart- mixed

-	time based focus distribution chart-week:
    - 	ticket-33-time based focus distribution chart-weekly-backend
        - 	the backend should check today’s date up until 6 days ago to create a week and for each day it should add up the focus time and return pairs of day of the week
        - 	another route that gets the tag id in the URL and filters above data by selected tag
        - 	make sure to return day of the week instead of date
    - 	ticket 34-time based focus distribution chart-weekly-frontend
        - 	vertical bar chart
        - 	number of hours y axis
        - 	day of the week on x axis
        - 	filter option dropdown with the tags available at the top right to allow for filtering
            - 	the dropdown should show all available tags and allow for unselecting
        - 	chart gets filtered based on tag selected and if not, it just displays everything

- 	Sorting to-do list:
    - 	ticket 35-Sorting to-do list-frontend
        - 	support for sorting all tasks based on due date(closest)
            - 	puts tasks with closer due dates at top
            - 	puts tasks with no due date at the bottom
        - 	support for sorting all tasks based on completion percentage(least)
            - 	puts tasks with least completion percentage at top
        - 	support for sorting all tasks based on completion percentage (most)
            - 	puts tasks with most completion percentage at top
        - 	support for sorting ascendingly and descending based on task name
        - 	the sorting can be done on the table by clicking on label


-	searching for tasks:
    - 	ticket 36-searching for tasks-frontend:
        - 	search should work for the full name of a task
        - 	if the search is partial search all matches should be shown sorted alphabetically
        - 	search based on tag should show all tasks with the tag sorted alphabetically
        - 	user can input the value they are searching for in search bar and enter to search
-	Configuring timer lengths:
    - 	ticket 37-Configuring timer lengths-frontend
        - 	support for each timer length being set separately
        - 	keep in cache so that it will be there for the ongoing session
        - 	max for each type of timer is 59 mins and 59 seconds
        - 	the changes should be applied in the UI when they are in that specific timer section
        - 	user should be able to click on gear cog and in the dialog box open user should see the current value for the timers and they should be able to change any timer length and save the changes
        - 	there should be a gear cog right under timer and when user clicks on it, it opens a pop-up that takes timer value for
            - 	focus timer
            - 	short break
            - 	long break
        - 	and for each option it should have a minute input and seconds’ input.


## Team Capacity:
**Amanuel Aknaw:** ticket 35-Sorting to-do list-frontend, ticket 36-searching for tasks-frontend and helping with bugs and additional styling issues if needed 

**Jayden Brooks:** ticket-33-time based focus distribution chart-weekly-backend, Ticket 38-bug-study time being saved in UTC

**Fred Hong:** ticket 37-Configuring timer lengths-frontend

**Jarod Lustre:** ticket-32-Task completion chart-frontend

**Kimia Rajaeifar:** ticket-31-Task completion chart-backend, ticket 34-time based focus distribution chart-weekly-frontend

## Spikes:
-	We were hoping to check if there is a better way to handle our to do list, but we did not find anything that was promising and because of time constraints we were not able to implement any fixes. However, everything is still working as expected
-	One of our team members was worried about some duplicate code in our code base and he decided to check the issue.
-	We did not know what to do in sorting if a task was updated in a way that affected the sorting. We decided to remove the icon signifying that sorting is apple because we could not be sure that the sorting was still accurate.
-	We decided to put the time style of our timer to EST for now to give accurate data. In future releases we could allow our users to select that.












