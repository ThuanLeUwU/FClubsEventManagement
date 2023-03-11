import axios from 'axios';
import { getCookie } from 'cookies-next';
import { format, parseISO } from 'date-fns';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useAuthContext } from '../../contexts/auth-context';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  selectedOption,
  TextField,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  Container,
  TableCell, Button,
  TableHead, TableRow,
  SvgIcon, Typography, Select, Breadcrumbs, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress
} from '@mui/material';


import { Search } from '../../icons/search';

import { async } from '@firebase/util';
import Link from 'next/link';
const Page = () => {
  const { user } = useAuthContext();
  const [selected, setSelected] = useState(user.campus);
  const [club, setClubs] = useState();
  const [campus, setCampus] = useState();
  const [allClubThatUserJoin, setAllClubThatUserJoin] = useState([]);
  const [clubChoise, setClubChoise] = useState();
  useEffect(() => {
    const fetchData = async () => {
      console.log('campus');
      const headers = {
        'Authorization': 'Bearer ' + getCookie('accessToken')
      }
      try {
        const responseAllCampus = await axios.get(`https://event-project.herokuapp.com/api/campus`, {
          headers
        })
        setCampus(responseAllCampus?.data)
        if (user.role == 'members') {
          const responseGetAllClubThatUserJoin = await axios.get(`https://event-project.herokuapp.com/api/club/student/${user.id}`)
          setAllClubThatUserJoin(responseGetAllClubThatUserJoin?.data)
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])


  useEffect(() => {
    console.log('select');
    const fetchData = async () => {
      const response = await axios.get(`https://event-project.herokuapp.com/api/club/campus/${selected}`)
      setClubs(response?.data)
    }
    fetchData()
  }, [selected])

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleJoin = async () => {
    console.log('data', clubChoise);
    const currentTime = new Date();
    try {
      const requestBody = {
        student_id: user.id,
        club_id:  clubChoise,
        role: 'MEMBER',
        join_date: currentTime.toISOString()
      }
      const response = await axios.post('https://event-project.herokuapp.com/api/club/member', requestBody)

      const responseGetAllClubThatUserJoin = await axios.get(`https://event-project.herokuapp.com/api/club/student/${user.id}`);
      setAllClubThatUserJoin(responseGetAllClubThatUserJoin?.data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    setSelected(event.target.value);
  }


  //Dialog
  const [open, setOpen] = useState(false);


  const handleClickOpen = (club) => {
    setClubChoise(club.club_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (campus == undefined || club == undefined) {
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

          <Box >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
              }}
            >
              <Typography
                sx={{ m: 1 }}
                variant="h4"
              >
                Clubs
              </Typography>
              <Box sx={{ m: 1, paddingRight: '10px' }}>
                <FormControl>
                  <Select value={selectedOption} defaultValue={selected} onChange={handleChange}>
                    {campus.map(option => (
                      <MenuItem key={option.campus_id} value={option.campus_id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              color="action"
                              fontSize="small"
                            >
                              <Search />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Search customer"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>


          <Box sx={{ mt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Club Name
                        </TableCell>
                        <TableCell>
                          Abbreviation
                        </TableCell>
                        <TableCell>
                          Established Date
                        </TableCell>
                        <TableCell>
                          Total Members
                        </TableCell>
                        {user.role == 'admin' ? (
                          <TableCell>
                            Information
                          </TableCell>
                        ) : (
                          <TableCell>
                            Status
                          </TableCell>)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {club.map((club) => {
                        const date = parseISO(club.established_date)
                        return (
                          <TableRow

                            hover
                            key={club.name}
                            selected={selectedCustomerIds.indexOf(club.id) !== -1}
                          >
                            <TableCell>
                              <Box
                                sx={{
                                  alignItems: 'center',
                                  display: 'flex'
                                }}
                              >
                                <Typography
                                  color="textPrimary"
                                  variant="body1"
                                >
                                  {club.name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {club.abbreviation}
                            </TableCell>
                            <TableCell>
                              {format(date, 'dd/MM/yyyy')}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {club.totalMembers}
                            </TableCell>

                            {user.role == 'admin' ? (
                              <TableCell>
                                <Link href={`clubs/${club.club_id}`} passHref>
                                  <Button sx={{
                                    backgroundColor: '#0e6ae9', color: 'white', margin: '1px', ':hover': {
                                      backgroundColor: 'white',
                                      color: '#0e6ae9',
                                      border: '1px solid #0e6ae9',
                                      margin: '0px'
                                    }
                                  }} >
                                    More
                                  </Button>
                                </Link>
                              </TableCell>
                            ) : (
                              <TableCell>
                                {club.campus_id == user.campus ? (
                                  <>
                                    {allClubThatUserJoin.find(thisClub => thisClub.club_id === club.club_id) ? (
                                      <Button disabled >
                                        Joined
                                      </Button>
                                    ) : (
                                      <Button onClick={()=>handleClickOpen(club)}
                                        sx={{
                                          backgroundColor: 'white', color: '#0e6ae9', border: '1px solid #0e6ae9', ':hover': {
                                            backgroundColor: '#0e6ae9',
                                            color: 'white',
                                          }
                                        }}>
                                        Join
                                      </Button>
                                    )}
                                  </>
                                ) : (
                                  <Button disabled>
                                    CAN&apos;T Join
                                  </Button>
                                )}

                              </TableCell>)}
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-describedby="alert-dialog-slide-description"
                            >
                              <DialogTitle sx={{ backgroundColor: '#0e6ae9', fontSize: '20px', color: 'white' }}>Do you want to join Club: {`${club.name}`}?</DialogTitle>
                              <DialogContent>
                              </DialogContent>
                              <DialogActions>
                                <Typography onClick={handleClose} sx={{
                                  marginRight: '12px', cursor: 'pointer', ':hover': {
                                    'textDecoration': 'underline'
                                  }
                                }}>cancel</Typography>

                                <Button onClick={() => handleJoin(club.club_id)} sx={{
                                  backgroundColor: '#0e6ae9', color: 'white', margin: '1px', ':hover': {
                                    backgroundColor: 'white',
                                    color: '#0e6ae9',
                                    border: '1px solid #0e6ae9',
                                    margin: '0px'
                                  }
                                }}><a onClick={() => setClubChoise(club)}>Confirm</a></Button>
                              </DialogActions>
                            </Dialog>
                          </TableRow>
                        )
                      })}
                    </TableBody>

                  </Table>
                </Box>
              </PerfectScrollbar>
            </Card>
          </Box>
        </Container>
      </Box >
    </>)
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
