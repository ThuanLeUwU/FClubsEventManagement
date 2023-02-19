import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, Input } from '@mui/material';

// function UploadImage() {
//   const [file, setFile] = useState();

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     // console.log(event.target.files[0])
//     // 
    
//   }

//   const handleSubmit = async (event) => {
//     // event.preventDefault();
//     //console.log("hahaa")

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <FormControl onSubmit={handleSubmit}>
//       <Input type="file" 
//       onChange={handleFileChange} />
//       <Button 
//       type="submit" 
//       href="/account"
//       >Upload</Button>
//     </FormControl>
//   );
// }

function ImageUpload() {
  const [imageDataUrl, setImageDataUrl] = useState('');

  function handleImageChange(event) {
    // const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setImageDataUrl(reader.result);
    // };
    // reader.readAsDataURL(selectedFile);
    setImageDataUrl(event.target.files[0])
    console.log(event.target.files[0])
  }
  
  const handleSubmit =  async () => {
    console.log("File", imageDataUrl)
    const formData = new FormData();
    formData.append("file", imageDataUrl)
    // console.log(imageDataUrl)
    try {
              const response = await axios.post('https://node-js-fpt-wallet.herokuapp.com/api-docs/postFile', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
        
              console.log(response.data);
              console.log("abc")
            } catch (error) {
              console.error(error);
            }
  }

  return (
    <div>
      <input type="file" 
      onChange={handleImageChange} />
      {imageDataUrl && <img src={imageDataUrl} 
      alt="Uploaded image" />}

      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default ImageUpload;