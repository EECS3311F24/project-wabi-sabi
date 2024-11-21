import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

interface SortTableProps {
  title: string;
}

export function TaskTableHeader({ title}: SortTableProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <span>{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
        >
          Sort Ascending
        </DropdownMenuItem>
        <DropdownMenuItem  
        >
          Sort Descending
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
