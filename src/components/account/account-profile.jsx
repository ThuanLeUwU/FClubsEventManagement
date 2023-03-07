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
  Typography
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { authFirebase } from '../../firebase/firebase';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'hahahaa',
  timezone: 'GTM-7'
};

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
  

export const AccountProfile = ({user}) => (

  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={authFirebase.currentUser.photoURL}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {`${user.role}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <CardActions>
      {/* <FormControl onFileUpload={handleSubmit}>
        <Input type='file' 
        onChange={handleFileChange}/>
        <Button type='submit'>Upload</Button>
      </FormControl> */}
      {/* <Button
        color="primary"
        fullWidth
        variant="text"
        href='/upload'
      > 
        Upload File       
      </Button> */}
    </CardActions>
  </Card>
);
