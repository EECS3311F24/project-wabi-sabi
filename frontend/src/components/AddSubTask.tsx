import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import plus from '../assets/plus.svg';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

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

  useEffect(() => {
    onSubtasksChange(subTasks); // Notify parent of subtask changes
  }, [subTasks, onSubtasksChange]);

  const handleAddSubtask = () => {
    if (subTaskTitle.trim()) {
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
  };

  return (
    // {/* SubTask Table*/}
    // {/* TODO: Add vertical scrolling */}
    <div className="mb-4 w-4/5 justify-center flex flex-col rounded-lg border border-gray-200 overflow-y-auto h-4/5">
      {/* <h3 className="font-semibold">Subtasks</h3> */}
      <Table className="max-w-full mx-auto">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-left px-5 py-2">Subtasks</TableHead>
            <TableHead className="text-right px-5 py-2">
              {/* Subtask Inner Dialog */}
              <Dialog open={isSubtaskDialogOpen} onOpenChange={setIsSubtaskDialogOpen}>
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
                    onChange={(e) => setSubTaskTitle(e.target.value)}
                    placeholder="Subtask Title"
                    className="mb-4"
                  />
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
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="text-left px-5 font-medium" colSpan={2}>
                  {subtask.text}
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
