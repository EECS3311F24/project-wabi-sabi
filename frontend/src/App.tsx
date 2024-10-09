import { useState } from 'react';
import MsgForm from './components/MsgForm';
import './App.css';

function App() {
  const [hello] = useState('hi');

  return (
    <>
      <h1 className="text-4x1 text-blue-500">{hello}</h1>
      <MsgForm />
    </>
  );
}

export default App;
