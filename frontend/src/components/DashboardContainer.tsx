import Logout from './Logout';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './NavBar';
import { useCallback, useEffect, useState } from 'react';

const DashboardContainer = () => {
  const location = useLocation();
  const [saveHandler, setSaveHandler] = useState<(() => void) | null>(null);
  // function to register a save handler from child components
  const registerSaveHandler = useCallback((handler: () => void) => {
    setSaveHandler(() => handler);
  }, []);

  // trigger the save handler when route changes
  // currently used for timer study session data
  useEffect(() => {
    if (saveHandler && location.pathname != '/timer') {
      saveHandler();
    }
  }, [location.pathname, saveHandler]);
  return (
    <>
      <div className="container">
        <div className="left-sidebar" />
        <div className="main-panel">
          <Navbar />
          <Outlet context={{ registerSaveHandler }} />
        </div>
        <div className="right-sidebar">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default DashboardContainer;
