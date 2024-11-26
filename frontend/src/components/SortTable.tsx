import { useState} from 'react';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp, ChevronsUpDown} from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

interface SortTableProps {
  headerName: string;
  tasks: any[];
  setTasks: (tasks: any[]) => void;
  currColumn: string | null; // Tracks the column thats being used for sorting
  setCurrColumn: (column: string) => void; // Function to update the current column thats being used for sorting
}

export function ColumnSort({ headerName, tasks, setTasks, currColumn, setCurrColumn}: SortTableProps) {
  const[sortType, setSortType] = useState<"asc" | "desc" | null>(null); // Tracks the type of sorting the user picked(ascending or descending)
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center">
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
              
        >
        <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem  
         
        >
        <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
