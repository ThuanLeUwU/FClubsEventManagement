import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Input } from '@mui/material';

function UploadImage() {
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    console.log(file)

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FormControl onSubmit={handleSubmit}>
      <Input type="file" 
      onChange={handleFileChange} />
      <Button 
      type="submit" 
      href="/account"
      >Upload</Button>
    </FormControl>
  );
}

export default UploadImage;