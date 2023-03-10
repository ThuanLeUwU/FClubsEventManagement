import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Input,
  Typography,
} from "@mui/material";
import axios from "axios";
import eact, { useState } from "react";
import { authFirebase } from "../../firebase/firebase";

// const [selectedFile, setSelectedFile] = useState(null);

// const onFileChange = (event) => {
//   setSelectedFile(event.target.files[0]);
// };

// const onFileUpload = () => {
//   const formData = new FormData();
//   formData.append('file', selectedFile);

//   axios.post('/api/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   }).then((response) => {
//     console.log(response);
//   });
// };

// eslint-disable-next-line react-hooks/rules-of-hooks

export const AccountProfile = ({ userInf }) => {
  console.log("heelu", userInf);
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
      // axios
      //   .get("https://event-project.herokuapp.com/images", {
      //     withCredentials: true,
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       "Content-Type": "application/json",
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      const response = await axios.post(
        "https://event-project.herokuapp.com/images",
        formData
        // withCredentials: true,
        // headers: {
        //   // "Access-Control-Allow-Origin": "*",
        //   "Content-Type": "application/json",
        // },
      );

      console.log("Response: ", response);
      console.log("abc");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={authFirebase.currentUser.photoURL}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {userInf.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${userInf.role}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {userInf.timezone}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {/* <FormControl onFileUpload={handleSubmit}>
        <Input type='file' 
        onChange={handleFileChange}/>
        <Button type='submit'>Upload</Button>
      </FormControl>  */}
        <Button color="primary" fullWidth variant="text">
          <input type="file" onChange={handleImageChange} />
          {imageDataUrl && <img width={200} src={imageDataUrl} />}

          <button onClick={handleSubmit}>submit</button>
        </Button>
      </CardActions>
    </Card>
  );
};
