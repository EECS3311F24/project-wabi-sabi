import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

//this defines properties for the selectedButton
interface SelectedButtonProps {
  /**
   * Content that will be displayed in the button.
   * can accept SVG or text based on need
   */
  content: ReactNode;
  onClick: () => void; //click event handler
  className?: string; //additional class names to get height and width
}

/**
 * A button to represent a selected button in terms of
 * the page the user is currently on.
 * button has a white background and orange border
 * @param {SelectedButtonProps} props - The props for the component.
 * @returns Element that represents the button
 */
const SelectedButton = ({ content, onClick, className }: SelectedButtonProps) => (
  <Button
    onClick={onClick}
    className={`bg-white border-wabi-btn-primary-unselected border-2 text-wabi-btn-primary-unselected p-2 transition-opacity duration-200  hover:bg-gray-100 ${className}`}
  >
    {content}
  </Button>
);

export default SelectedButton;
