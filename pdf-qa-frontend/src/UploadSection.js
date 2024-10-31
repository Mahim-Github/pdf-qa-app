import React from 'react';
import { UploadIcon } from './Icons';

const UploadSection = ({ pdfName, isUploaded, onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file); // Pass the file to the parent handler
    }
  };

  return (
    <div className="upload-section">
      {pdfName && (
        <div className="uploaded-file">
          <UploadIcon className="upload-icon" />
          <span className="pdf-name">{pdfName}</span>
          {/* Add a download button or other actions here */}
        </div>
      )}
      {!isUploaded && (
        <div className="upload-button-container">
          <button className="upload-button" onClick={() => document.getElementById('fileInput').click()}>
            <UploadIcon className="upload-icon" />
            <span>Upload PDF</span>
          </button>
          <input type="file" id="fileInput" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
      )}
    </div>
  );
};

export default UploadSection;