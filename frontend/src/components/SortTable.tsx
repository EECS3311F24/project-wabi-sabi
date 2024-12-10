import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

interface SortTableProps {
  headerName: string; //the header name thats used to sort the table
  tasks: any[]; //the list of tasks
  setTasks: (tasks: any[]) => void; // fuction to update the tasks
  currColumn: string | null; // Tracks the column thats being used for sorting
  setCurrColumn: (column: string) => void; // Function to update the current column thats being used for sorting
}

export function ColumnSort({ headerName, tasks, setTasks, currColumn, setCurrColumn }: SortTableProps) {
  const [sortType, setSortType] = useState<"asc" | "desc" | null>(null); // Tracks the type of sorting the user picked(ascending or descending)

  const sortTasks = (sortDirection: "asc" | "desc") => {

    const sortedTasks = [...tasks].sort((a, b) => {
      if (headerName === "Title") { // sorts based on task title
        return sortDirection === "asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text);
      } else if (headerName === "Tag") { // sorts based on Tag

        const tagA = a.tag || "";
        const tagB = b.tag || "";
        //If a task doesn't have a tag then move it to the bottom
        if (!tagA && tagB) return 1;
        if (tagA && !tagB) return -1;

        return sortDirection === "asc" ? tagA.localeCompare(tagB) : tagB.localeCompare(tagA);
      } else if (headerName === "Due Date") {

        const dateA = a.due_date ? new Date(a.due_date).getTime() : Number.MAX_SAFE_INTEGER;
        const dateB = b.due_date ? new Date(b.due_date).getTime() : Number.MAX_SAFE_INTEGER;
        //If a task doesn't have a due date then move it to the bottom
        if (!a.due_date && b.due_date) return 1;
        if (a.due_date && !b.due_date) return -1;

        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (headerName === "Completion(%)") {

        const percentageA = a.completion || 0;
        const percentageB = b.completion || 0;

        return sortDirection === "asc" ? percentageA - percentageB : percentageB - percentageA;
      }
      return 0;
    });

    setTasks(sortedTasks); //updates the tasks state with the sorted table
    setSortType(sortDirection);  //updates the sort directions
    setCurrColumn(headerName); //updates the currenlty column header thats being used for sorting the table
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size='customSize' className="flex items-center gap-0">
          <span>{headerName}</span>
          {
            currColumn === headerName
              ? (sortType === "asc" ? <ArrowUp /> : <ArrowDown />)
              : <ChevronsUpDown />
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => sortTasks("asc")}
        >
          <ArrowUp className="h-3.5 w-3.5" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => sortTasks("desc")}
        >
          <ArrowDown className="h-3.5 w-3.5" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
