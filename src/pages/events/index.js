import { Box, Container, FormControl, InputLabel, MenuItem, Select, Button, Typography, Stack, Pagination, Grid, IconButton, TextField, CircularProgress } from '@mui/material';
import Head from 'next/head';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { Events } from '../../components/dashboard/events';
import { useAuthContext } from '../../contexts/auth-context';
import { getCookie } from 'cookies-next';
import { CreateEvent } from '../../components/dashboard/createEvent';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useRouter } from 'next/router';

const Page = () => {
  const { user } = useAuthContext();
  const [campus, setCampus] = useState([]);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(user ? (user.campus) : 1);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [selectItemsPerPage, setSelectItemPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const headers = {
          'Authorization': 'Bearer ' + getCookie('accessToken')
        }

        const responseAllCampus = await axios.get(`https://event-project.herokuapp.com/api/campus`, {
          headers
        })

        setCampus(responseAllCampus?.data)

      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])




  // Re-render the component when the URL changes
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      console.log('re-render');
    });

    // Clean up the event listener
    return () => {
      router.events.off('routeChangeComplete');
    };
  }, []);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseEvent = await axios.get(`https://event-project.herokuapp.com/api/event/${selected}?status=1&is_approved=1`)
        setEvents(responseEvent?.data)
       
      } catch (error) {
        console.log(error);
      }
    }
    setPage(1)
    fetchEvents()
  }, [selected])

  const handleChange = (event) => {
    setSelected(event.target.value);
  }

  //Page
  const getPageItems = () => {
    const startIndex = (page - 1) * selectItemsPerPage;
    const endIndex = startIndex + selectItemsPerPage;
    return events.slice(startIndex, endIndex);
  };


  //Search

  // const [resultSearch, setResultSearch] = useState([])
  // const handleSearch = (event) => {
  //   const searchTerm = event.target.value.toLowerCase();

  //   console.log('log', event.target.value);

  //   if (searchTerm.trim().length > 0) {
  //     setResultSearch(events.filter((thisEvent) =>
  //       thisEvent.event_name.toLowerCase().includes(searchTerm))
  //     );
  //   } else {
  //     setResultSearch([]);
  //   }
  //   console.log(resultSearch);
  // };

  if (events == undefined || user === undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
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
          <Stack direction='row' zIndex={2} width={user.role === 'admin' ? '125px' : '260px'} spacing={2} sx={{ m: 1, paddingRight: '10px', backgroundColor: 'white', border: '2px solid black', py: 1, px: 1.5, borderRadius: '30px', position: 'fixed', right: 3, top: '80px' }}>
            {/* <TextField
              label="Search by Event's name"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />
            <IconButton>
              <SearchIcon />
            </IconButton> */}
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
            {user.role !== 'admin' && (
              <>
                <Button
                  onClick={() => setVisible(true)}
                  sx={{
                    backgroundColor: "#0E6AE9",
                    color: "white",
                    margin: "1px",
                    ":hover": {
                      backgroundColor: "white",
                      color: "#0E6AE9",
                      border: "1px solid #0E6AE9"
                    },
                  }}>
                  <ControlPointIcon fontSize='small' />
                  <Typography variant='h6'> Events</Typography>
                </Button>

                <CreateEvent
                  visible={visible}
                  setVisible={setVisible}
                  onCancel={() => {
                    setVisible(false);
                  }}
                  isEdit={false}
                />
              </>
            )}




          </Stack>

          {events.length > 0 ? (
            <Stack display='flex' justifyItems='center' direction='column' width='100%'>
              {getPageItems().map(event => (
                <div key={event.event_id}>
                  <Events event={event} />
                </div>
              ))}
              <Stack direction='row' display='flex' justifyContent='center'>
                {/* <Typography variant='h6'>Events per page</Typography>
                <FormControl sx={{ direction: 'row' }}>
                  <Select onChange={handleChangeRowPerPage}>
                    {itemPerPage.map(option => (
                      <MenuItem key={option.value} value={option.value} sx={{ width: '10px' }}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                <Pagination
                  showFirstButton
                  showLastButton
                  count={Math.ceil(events.length / selectItemsPerPage)}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </Stack>
          ) : (
            <Stack pr='120px' display='flex' justifyItems='center' direction='column' width='100%'>

              <Stack direction='row' display='flex' justifyContent='center'>
              </Stack>
            </Stack>
          )}
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
