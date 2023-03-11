import { Box, Container, FormControl, MenuItem, Select, Typography, selectedOption } from '@mui/material';
import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';



import { Events } from '../../components/dashboard/events';
import { useAuthContext } from '../../contexts/auth-context';
import { getCookie } from 'cookies-next';


const Dashboard = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [campus, setCampus] = useState([]);
  const [selected, setSelected] = useState(user.campus);
  useEffect(() => {
    const fetchEvents = async () => {
      const headers = {
        'Authorization': 'Bearer ' + getCookie('accessToken')
      }
      try {
        const responseAllCampus = await axios.get(`https://event-project.herokuapp.com/api/campus`, {
          headers
        })
        setCampus(responseAllCampus?.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents()
  }, [])


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseEvent = await axios.get(`https://event-project.herokuapp.com/api/event/${selected}?status=0`)
        // const responseEvent = await axios(`https://event-project.herokuapp.com/api/event/1?status=0`)
        console.log('response nè', responseEvent);
        setEvents(responseEvent?.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents()
  }, [selected])

  const handleChange = (event) => {
    setSelected(event.target.value);
  }

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


          <Box sx={{ m: 1, paddingRight: '10px', position: 'fixed', right: '0px', top: '80px' }}>
            <FormControl>
              <Select value={selectedOption} defaultValue={selected} onChange={handleChange}>
                {campus.map(option => (
                  <MenuItem key={option.campus_id} value={option.campus_id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              Thêm ở dashboard/index.js
            </Box>
          </Box>
          <Box width='90%'>
            {events.map(event => (
              <div key={event.event_id}>
                <Events event={event} />
              </div>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  )
};



export default Dashboard;
