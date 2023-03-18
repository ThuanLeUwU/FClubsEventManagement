import { Box, Container, FormControl, InputLabel, MenuItem, Select, Button, Typography, Stack, CircularProgress } from '@mui/material';
import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { Events } from '../../components/dashboard/events';
import { useAuthContext } from '../../contexts/auth-context';
import { getCookie } from 'cookies-next';
import { CreateEvent } from '../../components/dashboard/createEvent';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


const Dashboard = () => {
  const { user } = useAuthContext();
  const [campus, setCampus] = useState([]);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(1);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const fetchCampus = async () => {
      const headers = {
        'Authorization': 'Bearer ' + getCookie('accessToken')
      }

      const responseAllCampus = await axios.get(`https://event-project.herokuapp.com/api/campus`, {
        headers
      })

      setCampus(responseAllCampus?.data)
    }
    fetchCampus()
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseEvent = await axios.get(`https://event-project.herokuapp.com/api/event/${selected}?status=1&is_approved=1`)

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



  if (events == undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <Head>
        <title>
          Event
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


          <Stack direction='column-reverse' spacing={2} sx={{ m: 1, paddingRight: '10px', position: 'fixed', right: '0px', top: '80px' }}>
            <FormControl>
              <InputLabel id="select-label">Campus</InputLabel>
              <Select value={selected} defaultValue={selected} onChange={handleChange} labelId="select-label">
                {campus.map(option => (
                  <MenuItem key={option.campus_id} value={option.campus_id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button sx={{
              backgroundColor: "#0e6ae9",
              color: "white",
              margin: "1px",
              ":hover": {
                backgroundColor: "white",
                color: "#0e6ae9",
                border: "1px solid #0e6ae9",
                margin: "0px",
                marginBottom: '14px'
              },
            }} onClick={() => setVisible(true)}>
              <ControlPointIcon />    <Typography> Events</Typography>
            </Button>

            <CreateEvent
              visible={visible}
              setVisible={setVisible}
              onCancel={() => {
                setVisible(false);
              }}
              isEdit={false}
            />

          </Stack>
          <Box width='90%'>
            {events.map(event => (
              <div key={event.event_id}>
                <Events event={event} />
              </div>
            ))}
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  )
};



export default Dashboard;
