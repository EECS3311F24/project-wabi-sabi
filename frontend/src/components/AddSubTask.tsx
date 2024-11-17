import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import plus from '../assets/plus.svg';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import threeDots from '../assets/three-dots.svg';

// this defines users' subtask property for a Task object for rendering in a table
interface SubTask {
  id: string;
  text: string;
  parentTaskId: string;
  completed: boolean;
}

// this defines properties of the props of AddSubTask.tsx
interface SubTasksProps {
  parentTaskId: string;
  onSubtasksChange: (subtasks: SubTask[]) => void;
}

const AddSubTask: React.FC<SubTasksProps> = ({ parentTaskId, onSubtasksChange }) => {
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [subTaskTitle, setSubTaskTitle] = useState('');
  const [isSubtaskDialogOpen, setIsSubtaskDialogOpen] = useState(false);
  const [subtaskNameError, setSubtaskNameError] = useState(false); // state to track if the subtask already exists.

  useEffect(() => {
    onSubtasksChange(subTasks); // Notify parent of subtask changes
  }, [subTasks, onSubtasksChange]);

  const handleAddSubtask = () => {
    if (subTaskTitle.trim()) {
      const isSubTaskDuplicate = subTasks.some((subtask) => subtask.text.toLowerCase() === subTaskTitle.trim().toLowerCase());
      if(isSubTaskDuplicate){ //If the subtask title is a duplicate display the error
        setSubtaskNameError(true); 
        return;
      }else{
        setSubtaskNameError(false);

        const newSubTask = {
          id: Date.now().toString(), // Use a timestamp or UUID library for unique IDs
          text: subTaskTitle,
          parentTaskId,
          completed: false,
        };
        setSubTasks((prev) => [...prev, newSubTask]);
        setSubTaskTitle('');
        setIsSubtaskDialogOpen(false);
      }

      
    }
  };

  /**
   * deletes the the subtask on the fronted
   * @param subtaskId - the id of the task
   */
  const handleDeleteSubtask = (subtaskId: String) => {

    setSubTasks((prev) => {
      const updatedSubtasksList = [];

      for(let i=0; i < prev.length; i++){
        if(prev[i].id !== subtaskId){
          updatedSubtasksList.push(prev[i]);
        }
      }

      return updatedSubtasksList;
    });
  };

  return (
    // {/* SubTask Table*/}
    // {/* TODO: Add vertical scrolling */}
    <div className="mb-4 w-4/5 justify-center flex flex-col rounded-lg border border-gray-200 overflow-y-auto h-4/5">
      {/* <h3 className="font-semibold">Subtasks</h3> */}
      <Table className="max-w-full mx-auto">
        <TableHeader className="bg-gray-100">
          <TableRow className="flex justify-between items-center">
            <TableHead className="text-left px-5 py-2">Subtasks</TableHead>
            <TableHead className="text-right px-5 py-2 flex items-center justify-end">
              {/* Subtask Inner Dialog */}
              <Dialog open={isSubtaskDialogOpen} onOpenChange={(open) => {
                setIsSubtaskDialogOpen(open);
                if(open){//whenever user opens up the popup page set the title input to empty and remove any warning from previous pages
                  setSubTaskTitle(''); 
                  setSubtaskNameError(false); 
                }
              }}>
                <DialogTrigger asChild>
                  <button onClick={() => setIsSubtaskDialogOpen(true)} className="m-auto mt-1">
                    <img src={plus} width="20px" />
                  </button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Subtask</DialogTitle>
                  </DialogHeader>
                  <Input
                    value={subTaskTitle}
                    onChange={(e) => { 
                      setSubTaskTitle(e.target.value);
                      if(subTaskTitle){setSubtaskNameError(false);} // when the user starts typing remove the error warning
                    }}
                    placeholder="Subtask Title"
                  />
                  {/* If the subtask title is duplicate display the warning */}
                  {subtaskNameError && <p className="text-red-500 text-sm ml-1">The subtask already exists</p>} 
                  <Button onClick={handleAddSubtask}>Add Subtask</Button>
                </DialogContent>
              </Dialog>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-x-auto max-w-full">
          {subTasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-12 text-center">
                You don't have any task
              </TableCell>
            </TableRow>
          ) : (
            subTasks.map((subtask, index) => (
              <TableRow key={index} className="hover:bg-gray-50 flex justify-between items-center">
                <TableCell className="text-left px-5 font-medium" >
                  {subtask.text}
                </TableCell>

                {/* A dropdown menu  section to delete the subtasks on the frontend */}
                <TableCell className="text-right">
                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                          <img src={threeDots} alt="Delete" className="h-5 w-5"/>
                        </button>
                    </DropdownMenuTrigger>

                   <DropdownMenuContent align="end">

                      <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteSubtask(subtask.id)}> 
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

export default AddSubTask;
