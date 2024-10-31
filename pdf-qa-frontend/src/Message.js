// src/components/Message.js
import React from 'react';

const Message = ({ message }) => {
  return (
    <div className={`message ${message.sender}`}>
      <span className="message-avatar">{message.sender === 'user' ? 'S' : 'AI'}</span>
      <p className="message-text">{message.text}</p>
    </div>
  );
};

export default Message;
