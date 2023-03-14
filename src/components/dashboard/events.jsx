import React, { useEffect, useState } from "react";
import EventStyles from "./styles/event.module.scss";
import { format, parseISO } from 'date-fns';
import { async } from "@firebase/util";
import axios from "axios";
import { useAuthContext } from "../../contexts/auth-context";
import { color } from "@mui/system";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, ListItem, ListItemButton, ListItemText, Slide, Typography } from "@mui/material";
import Link from "next/link";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export const Events = ({ event }) => {

  const startDate = parseISO(event.start_date);
  const endDate = parseISO(event.end_date);
  const { user } = useAuthContext();
  const [joinEventList, setJohnEventList] = useState([]);
 





  useEffect(() => {
    const fetchData = async () => {
      const responseAllStudentJoinThisEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${event.event_id}`)
      setJohnEventList(responseAllStudentJoinThisEvent?.data);
    }
    fetchData();
  }, [])



  const handleClick = () => {
    console.log('click');
    const fetchData2 = async () => {
      try {
        const currentTime = new Date();

        const requestBody = {
          event_id: event.event_id ,
          student_id: user.id,
          registration_date: currentTime.toISOString()
        }
        await axios.post('https://event-project.herokuapp.com/api/event/join', requestBody)


        const responseAllStudentJoinThisEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${event.event_id}`)
        setJohnEventList(responseAllStudentJoinThisEvent?.data);
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData2();
  }




  //Dialog
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (joinEventList == []) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: '500px' }}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <section className={`${EventStyles.tournament_section}`}>
      <div className={`${EventStyles.container}`}>
        {/* <div className="row"> */}
        {/* <div className="col-lg-12"> */}
        <Grid  container mt={16}>
          <Grid  item xs={4} className={`${EventStyles.left_area}`}>
            <div className={`${EventStyles.single_play}`}>
              <div className="image">
                <img
                  width='220px'
                  height='400px'
                  src={`${event.img}`}
                  alt=""
                />
              </div>
              {user.role == 'admin' ? (
                <Link href={`/dashboard/${event.event_id}`} passHref>
                  <Button sx={{
                    backgroundColor: '#0e6ae9', color: 'white', margin: '1px', ':hover': {
                      backgroundColor: 'white',
                      color: '#0e6ae9',
                      border: '1px solid #0e6ae9',
                      margin: '0px'
                    }
                  }}>
                    More Detail
                  </Button>
                </Link>
              ) : (
                <div className={`${EventStyles.content}`}>
                  {joinEventList.find(thisUser => thisUser.student_id == user.id) ? (
                    <Button disabled sx={{
                      backgroundColor: 'white', margin: '1px', border: '1px solid #0e6ae9'
                    }}>
                      <Typography color='#0e6ae9'>
                        JOINED
                      </Typography>
                    </Button>

                  ) : (
                    <>
                      <Button sx={{
                        backgroundColor: '#0e6ae9', color: 'white', margin: '1px', ':hover': {
                          backgroundColor: 'white',
                          color: '#0e6ae9',
                          border: '1px solid #0e6ae9',
                          margin: '0px'
                        }
                      }}
                        onClick={handleClickOpen}
                        className={`${EventStyles.tournament_btn}`}>
                        JOIN EVENT
                      </Button>

                    </>
                  )}
                  {/* Dialog */}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"

                  >
                    <DialogTitle sx={{ backgroundColor: '#0e6ae9', fontSize: '20px', color: 'white' }}>Do you want to join event {`${event.event_name}`}?</DialogTitle>
                    <DialogContent>
                      <DialogContentText sx={{ color: 'black' }}>
                        Clubs: {`${event.club_name}`}
                      </DialogContentText>
                      <DialogContentText sx={{ color: 'black' }}>
                        Organizer:  {`${event.student_name}`}
                      </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                      <Typography onClick={handleClose} sx={{
                        marginRight: '12px', cursor: 'pointer', ':hover': {
                          'textDecoration': 'underline'
                        }
                      }}>cancel</Typography>
                      <Button onClick={handleClick} sx={{
                        backgroundColor: '#0e6ae9', color: 'white', margin: '1px', ':hover': {
                          backgroundColor: 'white',
                          color: '#0e6ae9',
                          border: '1px solid #0e6ae9',
                          margin: '0px'
                        }
                      }}>Confirm</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}

            </div>
          </Grid>
          <Grid item xs={6} className={`${EventStyles.right_area}`}>
            <div className={`${EventStyles.right_top}`}>
              <h1>Event : {`${event.event_name}`} </h1>
              
              <div className={`${EventStyles.reward}`}>
                Clubs: {`${event.club_name}`}
              </div>
              <div className={`${EventStyles.reward}`}>
                Organizer:  {`${event.student_name}`}
              </div>
              <div className={`${EventStyles.reward}`}>
                Mail Contact:  {`${event.email}`}
              </div>
            </div>
            <div className={`${EventStyles.right_bottom}`}>
              <div>

                <div className={`${EventStyles.time_counter}`}>

                  <h4>Timeline:</h4>
                  {event.start_date == null ? (
                    <span className={`${EventStyles.time}`}>Check-in:  19:00:00, 28/01/2023</span>
                  ) : (
                    <span className={`${EventStyles.time}`}>Check-in:  {format(startDate, 'HH:mm:ss, dd/MM/yyyy')}</span>
                  )}

                  {event.end_date == null ? (
                    <span className={`${EventStyles.time}`}>Check-out: 22:00:00, 03-03-2023</span>
                  ) : (
                    <span className={`${EventStyles.time}`}>Check-out: {format(endDate, 'HH:mm:ss, dd/MM/yyyy')}</span>
                  )}

                  <h4>Location:</h4>
                  <span className={`${EventStyles.time}`}>{`${event.location}`}</span>
                  {event.description ? (
                    <>
                      <h4>Description:</h4>
                      <span className={`${EventStyles.time}`}>{`${event.description}`}</span>
                    </>
                  ) : (<></>)}

                </div>

              </div>  

            </div>
          </Grid>
        </Grid>

      </div>
    </section >
  );
};