import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SelectedButton from './ui/SelectedButton';
import UnselectedButton from './ui/UnselectedButton';
import ClockOrange from '../assets/clock-orange.svg';
import ClockWhite from '../assets/clock-white.svg';
import TodoWhite from '../assets/pencil-white.svg';
import TodoOrange from '../assets/pencil-orange.svg';
import ChartWhite from '../assets/white-chart.svg';
import ChartOrange from '../assets/orange-chart.svg';

/**
 * Navbar component for navigating between different available dashboards
 * it displays buttons that visually indicate the currently active dashboard
 * based on the color of the button.
 * the buttons change base don what page user is on and they navigate
 * users when they are clicked.
 * @returns The rendered navbar component.
 */
const Navbar = () => {
  const [activePage, setActivePage] = useState('timer'); //the active page currently
  const navigate = useNavigate(); //hook to navigate between pages
  const location = useLocation(); //hook to get current location

  useEffect(() => {
    //updating active page based on current pathname
    const path = location.pathname.replace('/', '') || 'timer';
    setActivePage(path);
  }, [location.pathname]);

  const handleNavClick = (page: string) => {
    setActivePage(page); //update the active page
    navigate(`/${page}`); //navigate to selected page
  };

  return (
    <nav className="top-navbar flex justify-center space-x-4 mt-4 mr-5">
      {activePage === 'timer' ? (
        <SelectedButton
          content={<img src={ClockOrange} alt="Timer" width={30} height={30} />}
          className="h-10 w-20"
          onClick={() => handleNavClick('timer')}
        />
      ) : (
        <UnselectedButton
          content={<img src={ClockWhite} alt="Timer" width={30} height={30} />}
          className="h-10 w-20"
          onClick={() => handleNavClick('timer')}
        />
      )}

      {activePage === 'todo' ? (
        <SelectedButton
          content={<img src={TodoOrange} alt="Todo" width={30} height={30} />}
          className="h-10 w-20"
          onClick={() => handleNavClick('todo')}
        />
      ) : (
        <UnselectedButton
          content={<img src={TodoWhite} alt="Todo" width={30} height={30} />}
          className="h-10 w-20"
          onClick={() => handleNavClick('todo')}
        />
      )}

      {activePage === 'charts' ? (
        <SelectedButton
          content={<img src={ChartOrange} alt="Charts" width={30} height={30} />}
          className="h-10 w-20"
          onClick={() => handleNavClick('charts')}
        />
      ) : (
        <UnselectedButton
          content={<img src={ChartWhite} alt="charts" width={30} height={30} />}
          className="h-10 w-20"
          onClick={() => handleNavClick('charts')}
        />
      )}
    </nav>
  );
};

export default Navbar;
