import { useState, useEffect } from 'react';
import { useAuth } from './AuthProviderUtils';
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

interface Task {
  id: string;
  text: string;
  tag?: string;
  dueDate?: string;  // Keep as `dueDate` as backend response
  completed?: boolean;
}

const TodoDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { authToken } = useAuth();

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks/get", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const processSubmission = async (taskTitle: string, dueDate?: string) => {
    try {
      const response = await fetch("http://localhost:5000/tasks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ text: taskTitle, dueDate: dueDate || null }),
      });
      if (response.ok) {
        fetchTasks(); 
      } else {
        console.error("Error adding task:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleCompletionCheckBox = async (id: string, isCompleted: boolean) => {
    try {
      const response = await fetch("http://localhost:5000/tasks/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, 
        },
        body: JSON.stringify({ task_id: id, status: isCompleted ? "Finished" : "Todo" }),  
      });
      if (response.ok) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === id ? { ...task, completed: isCompleted } : task
          )
        );
      } else {
        console.error("Error updating task:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch("http://localhost:5000/tasks/rm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ task_id: id }),
      });
      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Error deleting task:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-full bg-lightOrangeBg flex flex-col items-center mt-6">
      <h1 className="text-3xl text-wabi-red font-bold mb-4">To do List</h1>
      <AddTask dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} processSubmission={processSubmission} />
      <Table className="w-3/4 bg-white mx-auto border-2 border-wabi-btn-primary-unselected rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Completion(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">You don't have any task</TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id} className="text-left border-b border-gray-200">
                <TableCell className="py-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed || false} 
                    onChange={() => toggleCompletionCheckBox(task.id, !task.completed)}
                    className="accent-black"
                  />
                  <span className="ml-2">{task.text || "Untitled Task"}</span>
                </TableCell>
                <TableCell>{task.tag || ''}</TableCell>
                <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</TableCell>
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoDashboard;
