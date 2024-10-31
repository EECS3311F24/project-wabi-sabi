import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthProvider';

import ProtectedRoute from './components/ProtectedRoute';
import DashboardContainer from './components/DashboardContainer';
import Onboarding from './components/Onboarding';
import TimerDashboard from './components/TimerDashboard';
import TodoDashboard from './components/TodoDashboard';

/**
 * This is the main app component that wraps the entire application.
 * The AuthProvider component is used to provide authentication to the entire app.
 * The BrowserRouter component is used to provide routing to the app.
 * The Routes component is used to define the routes of the app, like login, homepage, etc.
 */
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Onboarding />} />
            <Route path="/signup" element={<Onboarding />} />
            <Route path="/confirmation" element={<Onboarding />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardContainer />
                </ProtectedRoute>
              }
            >
              <Route index element={<TimerDashboard />} />
              <Route path="timer" element={<TimerDashboard />} />
              <Route path="todo" element={<TodoDashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
