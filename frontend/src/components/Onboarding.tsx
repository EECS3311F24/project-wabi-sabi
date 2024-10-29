import { useLocation } from 'react-router-dom';
import wabiSabiLogo from '../assets/wabi-sabi-logo.svg';
import Login from './Login';

import Signup from './Signup';
import { useMemo } from 'react';

const Onboarding = () => {
  const location = useLocation();
  const isSignup = useMemo(() => location.pathname === '/signup', [location.pathname]);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img src={wabiSabiLogo} alt="Wabi Sabi Logo" className="w-1/2 h-auto mt-20" />
        <h2 className="text-center text-l hidden md:block" style={{ fontSize: '1em' }}>
          Put your life in focus.
        </h2>
      </div>
      <div className="mt-20 flex justify-center items-center">{isSignup ? <Signup /> : <Login />}</div>
    </>
  );
};

export default Onboarding;
