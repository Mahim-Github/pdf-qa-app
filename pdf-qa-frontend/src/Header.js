import React from 'react';
import './Header.css';
import UploadSection from './UploadSection'; 

const Header = ({ onUpload, pdfName, isUploaded }) => {
  return (
    <div className="header">
      <div className="logo">
        <img src="https://982851387-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fs7L723OVLEMUWCbQcOdb%2Flogo%2FRn0VLCwSKPxbH85xVg6e%2Flogo.svg?alt=media&token=84e17c45-39ee-4025-b058-46a2f9ff44e7" alt="AI Planet Logo" />
      </div>
      <UploadSection pdfName={pdfName} isUploaded={isUploaded} onUpload={onUpload} />
    </div>
  );
};

export default Header;