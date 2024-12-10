import { useAuth } from './AuthProviderUtils';
import wabiSabiLogo from '../assets/wabisabi-icon.svg';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut } from 'lucide-react';

const Logout = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className="flex flex-col items-end mt-4 mr-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img src={wabiSabiLogo} alt="Wabi Sabi Logo" className="cursor-pointer w-8 h-8 hover:opacity-80" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Logout;
