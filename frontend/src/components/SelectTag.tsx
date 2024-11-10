import { useState } from 'react';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';

interface TagDropdownProps {
  onSelectChange: (value: string) => void;
  className?: string;
  isDisabled?: boolean;
}

const TagDropdown = ({ onSelectChange, className, isDisabled = false }: TagDropdownProps) => {
  const [options, setOptions] = useState<string[]>(['Tag1', 'Tag2', 'Tag3']);
  const [open, setOpen] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddClick = () => {
    // const newTag = `Tag ${options.length + 1}`;
    // setOptions([...options, newTag]);
    setOpen(true);
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setOptions([...options, newTag]);
      setNewTag('');
      setOpen(false);
    }
  };

  const handleSelectChange = (value: string) => {
    onSelectChange(value);
  };

  return (
    <div>
      <Select onValueChange={handleSelectChange} disabled={isDisabled}>
        <SelectTrigger className={`${className} bg-white truncate font-bold`}>
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent className="bg-white w-full max-h-40 overflow-y-auto ">
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
          <div
            className="px-4 py-2 cursor-pointer text-wabi-red hover:text-wabi-btn-hover-primary-unselected"
            onClick={handleAddClick}
          >
            + Add a Tag
          </div>
        </SelectContent>
      </Select>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new tag</DialogTitle>
            <DialogDescription>Enter the name of the tag you want to create.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag-name" className="text-right">
                Tag Name
              </Label>
              <Input id="tag-name" value={newTag} onChange={(e) => setNewTag(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddTag}> Add Tag </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagDropdown;
