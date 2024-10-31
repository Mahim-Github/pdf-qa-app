// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import ChatWindow from './ChatWindow';
import InputField from './InputField';

function App() {
  const [pdfName, setPdfName] = useState('');
  const [messages, setMessages] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = (file) => {
    if (file) {
      setPdfName(file.name);
      console.log("Uploaded file name:", file.name); // Log filename for debugging
      setIsUploaded(true);

      // Handle file upload to backend
      const formData = new FormData();
      formData.append("file", file);

      fetch("http://127.0.0.1:8000/upload-pdf/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload response:", data);
          if (data.status === "PDF uploaded successfully") {
            setPdfName(data.filename);
            setIsUploaded(true);
          }
        })
        .catch((error) => {
          console.error("Error uploading PDF:", error);
        });
    }
  };

  const handleSendMessage = async (text) => {
    setMessages([...messages, { sender: 'user', text }]);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask-question/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: pdfName, question: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to get a response from the backend");
      }

      const data = await response.json();
      console.log("Backend response:", data); // Log backend response
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: data.answer },
      ]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: "Error fetching answer." },
      ]);
    }
  };

  return (
    <div className="App">
      <div className="app-content">
        <Header onUpload={handleUpload} pdfName={pdfName} isUploaded={isUploaded} />
        <ChatWindow messages={messages} />
        <InputField onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;
