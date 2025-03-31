import React, { useState } from 'react';
import axios from 'axios';

const UploadManyComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('pic', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://127.0.0.1:3009/uploadmany/doAdd', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Files uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" name="pic" onChange={handleFileChange} multiple />
      <button type="submit">Upload Files</button>
    </form>
  );
};

export default UploadManyComponent;
