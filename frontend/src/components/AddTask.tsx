import { useState } from 'react';
import { Dialog, DialogTrigger, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import SelectedButton from './ui/SelectedButton';
import UnselectedButton from './ui/UnselectedButton';
import { Input } from "./ui/input";
import plus from '../assets/plus.svg';
import AddSubTask from './AddSubTask';
import TagDropdown from './SelectTag';

// this defines properties of the props of AddTask.tsx
interface AddTaskProps {
  dialogOpen: boolean; // the state of the pop page
  setDialogOpen: (open: boolean) => void; //function to change the state of the pop up page
  addTask: (taskTitle: string, dueDate?: string, subTasks?: string[], tag?: string) => void; // function to add a task
  tasks: Task[];
}

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
  id: string;
  text: string;
  parentTaskId: string;
  completed: boolean;
}

/**
 *
 * A pop up form that takes the task title and an optional due date from
 * user to add a task. Since task title is required it makes sure the
 * user inputs a title before submission.
 *
 * It uses dialog.tsx component to render the pop up page.
 *
 * Link to docs: https://ui.shadcn.com/docs/components/dialog
 *
 *
 * @param param0 - the prop defined by AddTaskProps
 * @returns A form that includes two inputs(for task title and due date) and one button to add task
 */

const AddTask: React.FC<AddTaskProps> = ({ dialogOpen, setDialogOpen, addTask, tasks }) => {
  const [subTasks, setSubTasks] = useState<SubTask[]>([]); // state to store the lists of tasks(it sets it to an empty list of tasks at first)

  //state to manage the task title input. Its empty initially
  const [taskTitle, setTaskTitle] = useState('');
  //state to manage the due date input. Its empty initially
  const [dueDate, setDueDate] = useState('');

  //State to manage the paragraph tag that shows up when user adds task without title.
  //It doesn't show up at first so it's false.
  const [emptyTitleError, setEmptyTitleError] = useState(false);

  const [taskNameError, setTaskNameError] = useState(false); // state to track if the task already exists.

  // updates handleSubtasksChange prop from TodoDashboard.tsx
  const handleSubtasksChange = (updatedSubtasks: SubTask[]) => {
    setSubTasks(updatedSubtasks);
  };

  //Kimia
  const [selectedTag, setSelectedTag] = useState<string>('');

  /**
   * Handles the user input(task title and optional due date) to add the task. It makes sure
   * that the task title is not empty before adding the task.
   *
   * @returns adds the task if the user provides the title else it returns void.
   */

  const handleSubmit = () => {
    // as long as the page title is empty then the paragraph tag with warning shows up and stops user from
    //submitting an empty title
    if (!taskTitle.trim()) {
      setEmptyTitleError(true);
      return;
    }

    const isTaskDuplicate = tasks.some((task) => task.text.toLowerCase() === taskTitle.trim().toLowerCase());

    if (isTaskDuplicate) {
      setTaskNameError(true);
      return;
    }

    // passes an array of string of the subtask's titles
    const subTaskTitles = subTasks.map((subTask) => subTask.text);

    // Add the ask once the user provides the input
    addTask(taskTitle, dueDate, subTaskTitles, selectedTag);
    setDialogOpen(false); //close the pop page after adding page
    setTaskTitle(''); // set the task title input to empty after adding task
    setDueDate(''); // set the due date input to empty after adding task
    setSelectedTag(''); //kimia
    setEmptyTitleError(false); // change the state of the paragraph once the user enters the title
    setTaskNameError(false); // change the duplicate error warning state
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (open) {
          // Reset both title input and any error warnings(empty task title or duplicate task)
          setTaskTitle('');
          setTaskNameError(false);
          setEmptyTitleError(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <SelectedButton
          content={<img src={plus} alt="Add" className="h-6 w-6 " />}
          onClick={() => setDialogOpen(true)}
          className="flex items-center justify-center w-3/4 mb-3"
        />
      </DialogTrigger>

      <DialogOverlay className="bg-transparent" />
      <DialogContent>
        <DialogTitle>Add Task</DialogTitle>
        <DialogDescription>Please fill in the details regarding your task.</DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className="text-sm font-medium mr-2">Task Title</label>
            <Input
              type="text"
              placeholder="Enter task"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
                setTaskNameError(false);
                setEmptyTitleError(false); //once user starts typing task title, remove warning
              }}
              className="mt-1 p-2 border border-gray-200 rounded w-full"
            />
            {/* Show the warning if the emptyTitleError state is true*/}
            {emptyTitleError && <p className="text-red-500 text-sm mt-1 ml-2">Please enter a task</p>}

            {/* show a warning if the task is a duplicate(taskNameError is true) */}

            {taskNameError && <p className="text-red-500 text-sm mt-1 ml-2">The task already exists</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mr-2">Tag Name</label>
            <TagDropdown className="mt-1 p-2 w-full" onSelectChange={(value) => setSelectedTag(value)} />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium mr-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 p-2 border border-gray-200 rounded w-full"
            />
          </div>

          {/* Subtask */}
          <AddSubTask parentTaskId={taskTitle} onSubtasksChange={handleSubtasksChange} />

          <div className="flex justify-end">
            <UnselectedButton content="Add Task" onClick={handleSubmit} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
