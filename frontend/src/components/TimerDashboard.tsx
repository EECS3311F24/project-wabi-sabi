import { useAuth } from './AuthProviderUtils';
import { Button } from './ui/button';

const TimerDashboard = () => {
  const { logout } = useAuth();
  return (
    <>
      <Button onClick={logout}>Logout</Button>
      <h2>wow! timer goes here</h2>
    </>
  );
};

export default TimerDashboard;
