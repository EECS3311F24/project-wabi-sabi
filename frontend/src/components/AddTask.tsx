import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog"; 
import SelectedButton from './ui/SelectedButton'; 
import UnselectedButton from './ui/UnselectedButton';
import plus from '../assets/plus.svg';

interface AddTaskProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  processSubmission: (taskTitle: string, tag?: string, dueDate?: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ dialogOpen, setDialogOpen, processSubmission }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [tag, setTag] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    processSubmission(taskTitle, tag || undefined, dueDate || undefined);
    setDialogOpen(false);
    setTaskTitle('');
    setTag('');
    setDueDate('');
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
          <div className='flex items-center'>
            <label className="text-sm font-medium mr-2">Task Title</label> 
            <input
              type="text"
              placeholder="Enter task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-200 rounded w-full"
            />
          </div>
          <div className='flex items-center mb-2'>
            <label className="text-sm font-medium mr-9">Tag</label>
            <input
              type="text"
              placeholder="Enter tag (optional)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="mt-1 p-2 border border-gray-200 rounded w-full"
            />
          </div>
          <div className='flex items-center mb-4'>
            <label className="text-sm font-medium mr-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 p-2 border border-gray-200 rounded w-full"
            />
          </div>
          <div className="flex justify-end"> 
            <DialogClose asChild>
              <UnselectedButton content="Add Task" onClick={handleSubmit} /> 
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
