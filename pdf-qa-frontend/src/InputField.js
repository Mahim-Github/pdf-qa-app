// src/components/InputField.js
import React, { useState } from 'react';

const InputField = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="input-field-container">
      <form className="input-field" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Send a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">➤</button>
      </form>
    </div>
  );
};

export default InputField;
