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
  

export const AccountProfile = (props) => (
  

  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
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
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      {/* <FormControl onFileUpload={handleSubmit}>
        <Input type='file' 
        onChange={handleFileChange}/>
        <Button type='submit'>Upload</Button>
      </FormControl> */}
      <Button
        color="primary"
        fullWidth
        variant="text"
        href='/upload'
      > 
        Upload File       
      </Button>
    </CardActions>
  </Card>
);
