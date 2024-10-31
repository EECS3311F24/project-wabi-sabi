import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import plus from '../assets/plus.svg';
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"; 

const sampleTasks = [
  { id: 1, task: "Do 3311 assignment", tag: "3311", dueDate: "Nov 1", completed: false },
  { id: 2, task: "Read slides", tag: "3311", dueDate: "Nov 2", completed: false },
  { id: 3, task: "Project sprint 1", tag: "3311", dueDate: "Nov 3", completed: false },
  { id: 4, task: "Do 3311 assignment 2", tag: "3311", dueDate: "Nov 5", completed: false },
];

const TodoDashboard = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  const [dialogOpen, setDialogOpen] = useState(false); //visibility
  const [taskTitle, setTaskTitle] = useState('');
  const [tag, setTag] = useState('');
  const [dueDate, setDueDate] = useState('');

  const toggleCompletion = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const processSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      task: taskTitle,
      tag: tag,
      dueDate: dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setDialogOpen(false);
    setTaskTitle(''); 
    setTag('');
    setDueDate('');
  };

  return (
    <div className="w-full h-screen bg-lightOrangeBg flex flex-col items-center">
      <h1 className="text-3xl text-customOrange font-bold mb-4">To do List</h1>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-1/2 mb-4 border-2 border-customOrange bg-white hover:bg-customOrange">
            <img src={plus} alt="Add" className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogOverlay className="fixed inset-0 z-50 bg-transparent" />
        <DialogContent>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Please fill in the details regarding your task.</DialogDescription>
          <form onSubmit={processSubmission} className="flex flex-col gap-4">
            <div className='flex items-center'>
              <label className=" text-sm font-medium mr-2">Task Title</label> 
              <input
                type="text"
                placeholder="Enter task"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className='flex items-center mb-2'>
              <label className=" text-sm font-medium mr-9">Tag</label>
              <input
                type="text"
                placeholder="Enter tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            
            <div className='flex items-center mb-4'>
              <label className="text-sm font-medium mr-2">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex justify-end"> 
              <DialogClose asChild>
                <Button type="submit" className="bg-customOrange text-white w-24">Add Task</Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Table className="w-1/2 bg-white mx-auto"> 
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Completion(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id} className="text-left border-b border-gray-200">
              <TableCell className="py-2 flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="accent-black"
                />
                <span className="ml-2">{task.task}</span>
              </TableCell>
              <TableCell>{task.tag}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>{task.completed ? '100%' : '0%'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoDashboard;
