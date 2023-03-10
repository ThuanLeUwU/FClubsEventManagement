import { Box, Card, Container } from '@mui/material';
import Head from 'next/head';
// import { Budget } from '../components/dashboard/budget';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Events } from '../components/dashboard/events';
import { useAuthContext } from '../contexts/auth-context';


const Page = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const responseEvent = await axios(`https://event-project.herokuapp.com/api/event/${user.campus}?status=0`)
        const responseEvent = await axios(`https://event-project.herokuapp.com/api/event/1?status=0`)
        
        setEvents(responseEvent?.data)

      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents()
  }, [])

  console.log('fetch', events);
  return (
    <>
      <Head>
        <title>
          Dashboard
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
         
          {events.map(event => (
            
            <div  key={event.event_id}>
              <Events event={event} />
            </div>
          ))}
           
        </Container>
      </Box>
    </>
  )
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
