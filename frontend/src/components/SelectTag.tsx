import { useEffect, useState } from 'react';
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
import { useAuth } from './AuthProviderUtils';

interface TagDropdownProps {
  onSelectChange: (value: string) => void;
  className?: string;
  isDisabled?: boolean;
}
interface Tag {
    id: string;
    text: string;
  }

const TagDropdown = ({ onSelectChange, className, isDisabled = false }: TagDropdownProps) => {
//   const [options, setOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const [newTag, setNewTag] = useState('');
  const {authToken} = useAuth();
  const [TagNameError, setTagNameError] = useState(false);
  

//   const fetchTags = async() =>{
//     try{
//         const response = await fetch('http://localhost:5000/tag/', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${authToken}`,
//               },

//         });
//         const data = await response.json();
//         setOptions(data.map((tag:any)=> tag.text));


//     }
//     catch(error){
//         console.error("Error fetching tags:", error);

//     }
//   };
    const fetchTags = async () => {
        try {
        const response = await fetch('http://localhost:5000/tag/', {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${authToken}`,  // Ensure the token is included
            },
        });
    
        if (response.ok) {
            const data = await response.json();
            setOptions(data);  // Set the options with the fetched tags
        } else {
            console.error('Failed to fetch tags:', await response.text());
        }
        } catch (error) {
        console.error('Error fetching tags:', error);
        }
    };
  
  


  const addTag = async() =>{
    try {
        const response = await fetch ('http://localhost:5000/tag/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body : JSON.stringify({ text: newTag}),
        });
        if (response.ok){
            fetchTags();
            setNewTag('');
            setOpen(false);
        }

    }
    catch(error){
        console.error("Error adding tags:", error);


    }
  };

  useEffect (()=>{
    fetchTags();
  },[]);

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleAddTag = () => {
    const isDuplicate = options.some(option => option.text.toLowerCase() === newTag.trim().toLowerCase());
    if(isDuplicate){
        setTagNameError(true);
    }
    else{
        setTagNameError(false);
        if (newTag.trim()) {
            addTag();
          }

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
          {/* {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))} */}
          {options.length > 0 ? (
            options.map((option, index) => (
                <SelectItem key={index} value={option.id}>
                    {option.text}
                </SelectItem>
                ))
            ) : (
                <div className="px-4 py-2 text-gray-500">No tags available</div>
            )}
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
              <Input id="tag-name" value={newTag} 
                onChange={(e) => {
                setNewTag(e.target.value)
                setTagNameError(false);
                }} className="col-span-3" />
            </div>
            {TagNameError &&(<p className="text-red-500 text-sm mt-1 ml-2">this tag exists.</p>)}
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
