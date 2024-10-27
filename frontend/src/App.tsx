import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthProvider';
import Login from './components/Login';

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
          <div className="container">
            <div className="left-sidebar" />
            <div className="main-panel">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
            <div className="right-sidebar" />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
