
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { async } from '@firebase/util';
import axiosWrapper from '../utils/axiosWrapper';
import { get, head } from 'lodash';
import { useAuthContext } from '../contexts/auth-context';
import { getCookie } from 'cookies-next';
import { authFirebase } from '../firebase/firebase';
const Page = () => {
  const [club,setClubs] = useState();
  const [campus,setCampus] = useState();
  const [selected, setSelected] = useState(null);
  // const {user} = useAuthContext();

  useEffect(() =>  {
    const fetchData = async ()=>{
    
    const header = {
      'Authorization' : "Bearer " + authFirebase.currentUser.accessToken
    }
      try { 
        const response = await axios(`https://event-project.herokuapp.com/api/campus`,
       header
   
        ).then(response =>{
         console.log(response);
        }).catch(error =>{
          console.log(error);
        })
       
        setCampus(response?.data?.data) 
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData()
  },[])

  //Mỗi khi select thay đổi thì gọi API 1 lần
  // useEffect(()=>{
  //   console.log(selected);
  // },[selected])

  return (
    <>
      <Head>
        <title>
          Clubs
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar  />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
