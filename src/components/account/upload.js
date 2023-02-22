import React, { useState } from "react";
import axios from "axios";
import { Button, FormControl, Input } from "@mui/material";
import { Image } from "antd";



function ImageUpload() {
  const [imageDataUrl, setImageDataUrl] = useState();

  function handleImageChange(event) {
    // const reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onloadend = () => {
    //   setImageDataUrl(reader.result);
    // };
    // reader.readAsDataURL(event.target.files[0]);
    setImageDataUrl(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  const handleSubmit = async () => {
    console.log("File", imageDataUrl);
    const formData = new FormData();
    formData.append("file", imageDataUrl);
    try {
      const response = await axios.post(
        "https://node-js-fpt-wallet.herokuapp.com/firebase-services/images",
        formData
        // headers: {
        //   'content-type': 'multipart/form-data'
        // }
      );

      console.log("Response: ", response);
      console.log("abc");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" 
      onChange={handleImageChange} />
      {imageDataUrl && <Image 
      width={200}
      src={imageDataUrl}/>}

      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default ImageUpload;
