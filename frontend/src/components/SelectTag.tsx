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

/**
 * Interface for the dropdown component
 *
 * @property onSelectChange - holds the value for the callback function that is set when tag is selected
 * @property className - optional additional styling
 * @property isDisabled - boolean value to disable the component when needed
 *
 */
interface TagDropdownProps {
  onSelectChange: (value: string) => void;
  className?: string;
  isDisabled?: boolean;
}

/**
 * Interface for Tag object
 *
 * @property id - string value for the tag id
 * @property text - holds the name of the tag
 *
 */
interface Tag {
  id: string;
  text: string;
}

/**
 * tag dropdown component
 *
 * The dropdown component shows the list of tags that is stored in the database
 * and is retrieved from the backend. Users can add new tgas which will be stored
 * in the database as well.
 * to add a new tag the user will see a dialog box which will
 * check to see if the tag already exists and if it does it stops the user from
 * adding it.
 *
 *
 * Users are able to select a tag which will then be sent back to the parent component if needed.
 *
 *
 *
 * @param param0 which consist of the properties mentioned in tag dropdown props
 * @returns the Tag dropdown component, including the dropdown and add tag dialog.
 */
const TagDropdown = ({ onSelectChange, className, isDisabled = false }: TagDropdownProps) => {
  const [options, setOptions] = useState<Tag[]>([]); //state to store a list of tags
  const [open, setOpen] = useState(false); //state to store if the dialog for add tag should be open
  const [newTag, setNewTag] = useState(''); //state to store the new tag that is being added
  const { authToken } = useAuth(); //needed for connecting with backend to authenticate
  const [TagNameError, setTagNameError] = useState(false); //state to track if the inputted tag is a duplicate

  /**
   * this fetches tags from the backend to populate the dropdown.
   * We also include the authentication token in the call.
   */
  const fetchTags = async () => {
    try {
      const response = await fetch('http://localhost:5000/tag/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`, // auth token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOptions(data); // Set the options with the fetched tags
      } else {
        console.error('Failed to fetch tags:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  /**
   * this calls the backend to add a new tag and it closes the dialog and
   * it updates the dropdown and sets the new tag state to empty to allow for
   * adding more new tags.
   */
  const addTag = async () => {
    try {
      const response = await fetch('http://localhost:5000/tag/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ text: newTag }),
      });
      if (response.ok) {
        fetchTags(); //update the tags
        setNewTag(''); //reset the newtag state
        setOpen(false); //close the add tag dialog
      }
    } catch (error) {
      console.error('Error adding tags:', error);
    }
  };
  //initial tag fetch for the component
  useEffect(() => {
    fetchTags();
  }, []);

  // handler for user clicking on add tag button that opens the dialog
  const handleAddClick = () => {
    setOpen(true);
  };

  /**
   * First checks if the tag name already exists and sets the error to true
   * if it is a duplicate. if not it will call the function that will add the tag
   * to the backend.
   *
   */
  const handleAddTag = () => {
    const isDuplicate = options.some((option) => option.text.toLowerCase() === newTag.trim().toLowerCase());
    if (isDuplicate) {
      setTagNameError(true); //set errorto true if the tag name exists
    } else {
      setTagNameError(false);
      if (newTag.trim()) {
        addTag(); //add the tag to the tag database if it does not exist
      }
    }
  };

  /**
   * handles when the user changes their tag selection and triggers the callback
   *
   * @param value -which is the tag id
   */
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
              <Input
                id="tag-name"
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value);
                  setTagNameError(false);
                }}
                className="col-span-3"
              />
            </div>
            {TagNameError && <p className="text-red-500 text-sm mt-1 ml-2">this tag exists.</p>}
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
