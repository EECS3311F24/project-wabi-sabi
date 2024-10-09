import React, { useState } from 'react';

const MessageForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (message) {
      console.log(message);
      await fetch(`/addmsg/${encodeURIComponent(message)}/`);
      setMessage('');
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
