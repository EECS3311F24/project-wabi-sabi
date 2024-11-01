import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import AddTask from './AddTask';


import threeDots from '../assets/three-dots.svg';

const sampleTasks = [
  { id: 1, task: "Do 3311 assignment", tag: "3311", dueDate: "Nov 1", completed: false },
  { id: 2, task: "Read slides", tag: "3311", dueDate: "Nov 2", completed: false },
  { id: 3, task: "Project sprint 1", tag: "3311", dueDate: "Nov 3", completed: false },
  { id: 4, task: "Do 3311 assignment 2", tag: "3311", dueDate: "Nov 5", completed: false },
];

const TodoDashboard = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  const [dialogOpen, setDialogOpen] = useState(false); // visibility

  const toggleCompletion = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const processSubmission = (taskTitle: any, tag: any, dueDate: any) => {
    const newTask = {
      id: tasks.length + 1,
      task: taskTitle,
      tag: tag,
      dueDate: dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="w-full h-screen bg-lightOrangeBg flex flex-col items-center mt-6">
      <h1 className="text-3xl text-wabi-red font-bold mb-4">To do List</h1>
       
      <AddTask dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} processSubmission={processSubmission} />

      <Table className="w-3/4 bg-white mx-auto border-2 border-wabi-red rounded-lg"> 
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
              <TableCell className="text-right">
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <img src={threeDots} alt="Options" className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoDashboard;
