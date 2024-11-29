import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

//this defines properties for the UnselectedButton
interface UnselectedButtonProps {
  /**
   * content to be displayed in the button.
   * SVG or text based on needs
   */
  content: ReactNode;
  onClick: () => void; //click event handler
  className?: string; //additional class names to get height and width
  disabled?: boolean;
}

/**
 * Button component to represent the unselected state of a button
 * based on the state of the page the user is on.
 * Button has orange background and border
 * @param {SelectedButtonProps} props - The props for the component.
 * @returns Element that represents the button
 */
const UnselectedButton = ({ content, onClick, className, disabled }: UnselectedButtonProps) => (
  <Button
    onClick={onClick}
    className={`bg-wabi-btn-primary-unselected border-wabi-btn-primary-unselected border-2 text-white p-2 transition-opacity duration-200 hover:bg-wabi-btn-hover-primary-unselected ${className}`}
    disabled={disabled}
  >
    {content}
  </Button>
);

export default UnselectedButton;
