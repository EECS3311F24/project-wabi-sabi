import { useState} from 'react';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp, ChevronsUpDown} from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

interface SortTableProps {
  title: string;
}

export function TaskTableHeader({ title}: SortTableProps) {
  const[arrowType, setArrowType] = useState<"asc" | "desc" | null>(null); // state to track the arrow type
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <span>{title}</span>
            {arrowType === "desc" ? (
              <ArrowDown />
            ) : arrowType === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
        onClick={() => setArrowType("asc")}        
        >
        <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem  
        onClick={() => setArrowType("desc")}        
        >
        <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
