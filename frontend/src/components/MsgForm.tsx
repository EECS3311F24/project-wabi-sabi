import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (message) {
      try {
        const response = await axios.post('http://localhost:5000/api/data', { message: message });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message"
        required
      />
      <button type="submit">send</button>
    </form>
  );
};

export default MessageForm;
