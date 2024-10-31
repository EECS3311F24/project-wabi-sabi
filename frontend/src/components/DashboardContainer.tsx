import Logout from './Logout';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

const DashboardContainer = () => {
  return (
    <>
      <div className="container">
        <div className="left-sidebar" />
        <div className="main-panel">
          {/* <h2>wow! timer goes here</h2> */}
          <Navbar />
          <Outlet />
        </div>
        <div className="right-sidebar">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default DashboardContainer;
