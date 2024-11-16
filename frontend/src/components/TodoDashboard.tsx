import { useState, useEffect } from 'react';
import { useAuth } from './AuthProviderUtils';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import AddTask from './AddTask';
import threeDots from '../assets/three-dots.svg';
import { Checkbox } from './ui/checkbox';
import rightArrow from '../assets/right-arrow.svg';
import downArrow from '../assets/down-arrow.svg';

// this defines users' task property for rendering in a table
interface Task {
  id: string; // id for the task
  text: string; // the title of the task
  tag?: string; // tag for each task. (It will be implemented later)
  due_date?: string; // an optional due date for the task
  status: string; // the status of the task(completed or not)
  sub_tasks?: SubTask[]; // list of subtasks
}

// this defines users' subtask property for a Task object for rendering in a table
interface SubTask {
  id: string; // id for the subtask
  text: string; // title of subtask
  parentTaskId: string; // parent id (task)
  completed: boolean; // status of subtask (completed or not)
}

/**
 * A button and a table with list of user tasks(if the user has any number of tasks). It
 * first makes a get request to get the list of tasks from backend and displays them
 * when the page is loaded. It can also handle adding a new task or deleting an existing
 * task.
 *
 * It uses table component to render the task and dropdown-menu to delete a task
 *
 * Link to docs: https://ui.shadcn.com/docs/components/data-table
 *               https://ui.shadcn.com/docs/components/dropdown-menu
 *
 *
 *
 * @returns A page with button and table of tasks(if the user has any number of tasks).
 */

const TodoDashboard = () => {
  //Uses useState to update a state
  const [tasks, setTasks] = useState<Task[]>([]); // state to store the lists of tasks(it sets it to an empty list of tasks at first)

  //a state that manages the visiblity of the pop page when user add a new task(false: hidden, true: visible)
  const [dialogOpen, setDialogOpen] = useState(false);

  //it gets and stores the users authentication token
  const { authToken } = useAuth();

  // a state that manages the visibility of tasks
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);

  /**
   * Function that toggles the expansion of task
   *
   * @param taskId - a string for the task id
   */
  const toggleExpandTask = (taskId: string) => {
    setExpandedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]));
  };

  /**
   * It makes a GET request to the tasks/get endpoint to retrieve a list of
   * user's tasks.
   */

  const getTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/task/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setTasks(data.tasks || []); // if users doesn't have anytasks dont display anything else fill the table with the list of tasks
    } catch (error) {
      console.error(error); //Prints the error occured during fetching the tasks
    }
  };

  /**
   * It makes a POST request to tasks/add endpoint to add a task given
   * a task title and an optional due date.
   *
   * @param taskTitle - The title of the task the user want to add.
   * @param due_date - The due date of the task(the user has an option not to provide the due date).
   */

  const addTask = async (taskTitle: string, due_date?: string, subTasks?: string[], tag?: string) => {
    try {
      const response = await fetch('http://localhost:5000/task/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          text: taskTitle,
          due_date: due_date || null,
          subtasks: subTasks ?? [],
          tag: tag || null,
        }),
      });
      if (response.ok) {
        //if the response is successful then update else print out the server error
        getTasks();
      } else {
        console.error(await response.text());
      }
    } catch (error) {
      console.error(error); //Prints the error occured while adding the tasks
    }
  };

  /**
   * It makes a PATCH request to tasks/edit endpoint to update the status of the task. If the
   * checkout is toggled then it changes to status to Finished else it will remain TODO.
   *
   *
   * @param id - a string of the task id
   * @param isCompleted - a boolean for the status of the task. True if its finished and false if it is not.
   */

  const toggleCompletionCheckBox = async (taskId: string, isCompleted: boolean) => {
    try {
      const newStatus = isCompleted ? 'Finished' : 'Todo';
      
      const response = await fetch(`http://localhost:5000/task/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the task's status and subtasks in the frontend state
        getTasks();
      } else {
        console.error('Error updating task:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  /**
   * Updates the subtask's status (completed or not) of the Task
   *
   *
   * @param taskId - a string of the task id
   * @param subTaskId - a string of the subtask id
   */

  const toggleSubtaskCompletion = async (taskId: string, subTaskId: string, subtaskTitle: string, isCompleted: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/task/${taskId}/${subTaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ text: subtaskTitle, completed: isCompleted }),
      });

      if (response.ok) {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  sub_tasks: task.sub_tasks?.map((subtask) =>
                    subtask.id === subTaskId ? { ...subtask, completed: isCompleted } : subtask
                  ) ?? [],
                }
              : task,
          );

          const parentTask = updatedTasks.find((task) => task.id === taskId);
          const completionPercentage = parentTask ? calculateCompletionPercentage(parentTask) : 0;
          if (completionPercentage === 100) {
            toggleCompletionCheckBox(taskId, true); 
          }else{
            toggleCompletionCheckBox(taskId, false);
          }

          return updatedTasks;
        });

       
      } else {
        console.error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * It makes a DELETE request to task/rm to delete user's task.
   * @param id - the unique id of the task
   */

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ task_id: id }),
      });
      if (response.ok) {
        await getTasks(); //if request is successful then update the table else printout the error
      } else {
        console.error(await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateCompletionPercentage = (task: Task) => {

    if(!task.sub_tasks || task.sub_tasks.length === 0) return 0;

    let completedSubtasksCount = 0;
    for (let subtask of task.sub_tasks) {
      if (subtask.completed) {
        completedSubtasksCount++; 
      }
    }

    const completionPercentage = (completedSubtasksCount / task.sub_tasks.length) * 100; 

    return Math.round(completionPercentage);

  }


  useEffect(() => {
    // requests the table from backend and renders the table once the page loads
    getTasks();
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-6">
      <h1 className="text-3xl text-wabi-red font-bold mb-4">To do List</h1>
      <AddTask dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} addTask={addTask} />
      <div className="rounded-md border w-3/4 mx-auto bg-white border-wabi-btn-primary-unselected">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead className="w-10"></TableHead>
              <TableHead className="text-left px-4 py-2">Task</TableHead>
              <TableHead className="text-center px-4 py-2">Tag</TableHead>
              <TableHead className="text-center px-4 py-2">Due Date</TableHead>
              <TableHead className="text-center px-4 py-2">Completion(%)</TableHead>
              <TableHead className="text-right px-4 py-2"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? ( // If users dont have any tasks then display "you don't have a task"
              <TableRow>
                <TableCell colSpan={5} className="h-12 text-center">
                  You don't have any task
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <>
                  <TableRow key={task.id}>
                    {/* checkbox section */}
                    <TableCell className="w-10">
                      <Checkbox
                        checked={task.status === 'Finished'}
                        onCheckedChange={() => toggleCompletionCheckBox(task.id, task.status !== 'Finished')}
                        aria-label="Select row"
                      />
                    </TableCell>
                    {/* Expand/collapse arrow */}
                    <TableCell className="w-10 cursor-pointer" onClick={() => toggleExpandTask(task.id)}>
                      {task.sub_tasks && task.sub_tasks.length > 0 ? 
                      (<img src={expandedTasks.includes(task.id) ? downArrow : rightArrow} alt="Toggle Subtasks" />) : null
                    }
                    </TableCell>

                    {/* title section */}
                    <TableCell className="text-left px-4 font-medium">{task.text}</TableCell>

                    <TableCell className="text-center">{task.tag ?? ''}</TableCell>

                    {/* Due date section */}
                    <TableCell className="text-center font-medium">
                      {task.due_date ? new Date(task.due_date).toLocaleDateString() : ''}
                    </TableCell>

                    {/* Task completion section */}
                    <TableCell className="text-center font-medium">
                      {calculateCompletionPercentage(task)}%
                    </TableCell>

                    {/* The dropdown menu section to delete a task */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-full hover:bg-gray-100">
                            <img src={threeDots} alt="Options" className="h-5 w-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-red-500" onClick={() => deleteTask(task.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {/* User expands task */}
                  {expandedTasks.includes(task.id) &&
                    task.sub_tasks?.map((subtask, index) => (
                      <TableRow key={index}>
                        {/* Empty Cell */}
                        <TableCell></TableCell>

                        {/* Subtask checkbox */}
                        <TableCell className="w-10">
                          <Checkbox
                            checked={subtask.completed}
                            onCheckedChange={() => toggleSubtaskCompletion(task.id, subtask.id, subtask.text, !subtask.completed)}
                            aria-label="Select subtask"
                          />
                        </TableCell>
                        <TableCell colSpan={5} className="text-left pl-8 pr-4 font-medium text-gray-600">
                          {subtask.text}
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TodoDashboard;
