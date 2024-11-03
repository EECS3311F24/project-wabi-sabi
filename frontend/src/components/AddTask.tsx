import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"; 
import SelectedButton from './ui/SelectedButton'; 
import UnselectedButton from './ui/UnselectedButton';
import plus from '../assets/plus.svg';


// this defines properties of the props of AddTask.tsx
interface AddTaskProps {
  dialogOpen: boolean; // the state of the pop page
  setDialogOpen: (open: boolean) => void; //function to change the state of the pop up page
  addTask: (taskTitle: string, dueDate?: string) => void; // function to add a task
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

const AddTask: React.FC<AddTaskProps> = ({ dialogOpen, setDialogOpen, addTask }) => {

  //state to manage the task title input. Its empty initially 
  const [taskTitle, setTaskTitle] = useState('');
  //state to manage the due date input. Its empty initially
  const [dueDate, setDueDate] = useState('');

  //State to manage the paragraph tag that shows up when user adds task without title.
  //It doesn't show up at first so it's false.
  const [emptyTitleError, setEmptyTitleError] = useState(false);

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


    // Add the ask once the user provides the input
    addTask(taskTitle, dueDate);
    setDialogOpen(false);//close the pop page after adding page
    setTaskTitle('');// set the task title input to empty after adding task
    setDueDate('');// set the due date input to empty after adding task
    setEmptyTitleError(false); // change the state of the paragraph once the user enters the title
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => {
      setDialogOpen(open);
      if (open) {
        // Reset both title input and error paragraph tag to empty everytime the user opens the pop up page
        setTaskTitle('');
        setEmptyTitleError(false);
      }
    }}>


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
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-4">


          <div className='flex flex-col'>
            <label className="text-sm font-medium mr-2">Task Title</label> 
            <input
              type="text"
              placeholder="Enter task"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
                setEmptyTitleError(false); //once user starts typing task title, remove warning
              }}
              className="mt-1 p-2 border border-gray-200 rounded w-full"
            />
            {/* Show the warning if the emptyTitleError state is true*/}
            {emptyTitleError && (<p className="text-red-500 text-sm mt-1 ml-2">Please enter a task</p>
             )}
             
          </div>


          <div className='flex flex-col mb-4'>
            <label className="text-sm font-medium mr-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 p-2 border border-gray-200 rounded w-full"
            />
          </div>


          <div className="flex justify-end"> 
            <UnselectedButton content="Add Task" onClick={handleSubmit} /> 
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
