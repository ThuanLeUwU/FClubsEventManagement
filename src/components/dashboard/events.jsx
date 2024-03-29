import React, { useEffect, useState } from "react";
import EventStyles from "./styles/event.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { format, parseISO } from "date-fns";
import { async } from "@firebase/util";
import axios from "axios";
import { useAuthContext } from "../../contexts/auth-context";
import { color } from "@mui/system";
import StarsIcon from '@mui/icons-material/Stars';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Typography,
} from "@mui/material";
import Link from "next/link";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Warning } from "@mui/icons-material";

export const Events = ({ event }) => {
  const startDate = parseISO(event.start_date);
  const endDate = parseISO(event.end_date);
  const { user } = useAuthContext();
  const [joinEventList, setJohnEventList] = useState([]);
  const [deleteEvent, setDeleteEvent] = useState();
  const [count, setCount] = useState(0);
  
  // console.log("event", joinEventList)
  useEffect(() => {
    const fetchData = async () => {
      const responseAllStudentJoinThisEvent = await axios.get(
        `https://evenu.herokuapp.com/api/event/join/${event.event_id}`
      );
      setJohnEventList(responseAllStudentJoinThisEvent?.data);
    };
    fetchData();
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseAllStudentJoinThisEvent = await axios.get(
        `https://evenu.herokuapp.com/api/event/join/${event.event_id}`
      );
      setJohnEventList(responseAllStudentJoinThisEvent?.data);
    };
    fetchData();
  }, [count]);



  // useEffect(() => {
  //   handleDelete();
  // },[])

  // fetchData3();
  // };

  const handleClick = () => {
    const fetchData2 = async () => {
      try {
        const currentTime = new Date();

        const requestBody = {
          event_id: event.event_id,
          student_id: user.id,
          registration_date: currentTime.toISOString(),
        };
        await axios.post("https://evenu.herokuapp.com/api/event/join", requestBody);

        const responseAllStudentJoinThisEvent = await axios.get(
          `https://evenu.herokuapp.com/api/event/join/${event.event_id}`
        );
        setJohnEventList(responseAllStudentJoinThisEvent?.data);
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData2();
  };

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginTop: "500px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <section className={`${EventStyles.tournament_section}`}>
      <div className={`${EventStyles.container}`}>
        {/* <div className="row"> */}
        {/* <div className="col-lg-12"> */}
        <div className={`${EventStyles.single_tournament}`}>
          <Box className={`${EventStyles.left_area}`} width='800px' display='flex' justifyContent='center'>
            <div className={`${EventStyles.single_play}`}>
              <div className="image">
                <img width="100%" height="400px" src={`${event.img}`} alt="" />
              </div>
              {user.role == "admin" ? (
                <Link href={`/events/${event.event_id}`} passHref>
                  <Button
                    sx={{
                      backgroundColor: "#0e6ae9",
                      color: "white",
                      margin: "1px",
                      ":hover": {
                        backgroundColor: "white",
                        color: "#0e6ae9",
                        border: "1px solid #0e6ae9",
                        margin: "0px",
                      },
                    }}
                  >
                    More Detail
                  </Button>
                </Link>
              ) : (
                <>
                {event.student_id === user.id ? (<>
                  <Button
                        disabled
                        sx={{
                          backgroundColor: "white",
                          margin: "1px",
                          border: "1px solid #0e6ae9",
                        }}
                      >
                        <Typography color="#0e6ae9">ORGANIZER</Typography>
                      </Button></>) : (
                    <div className={`${EventStyles.content}`}>
                    {joinEventList.find((thisUser) => thisUser.student_id == user.id) ? (
                      <Button
                        disabled
                        sx={{
                          backgroundColor: "white",
                          margin: "1px",
                          border: "1px solid #0e6ae9",
                        }}
                      >
                        <Typography color="#0e6ae9">JOINED</Typography>
                      </Button>
                    ) : (
                      <>
                        <Button
                          sx={{
                            backgroundColor: "#0e6ae9",
                            color: "white",
                            margin: "1px",
                            ":hover": {
                              backgroundColor: "white",
                              color: "#0e6ae9",
                              border: "1px solid #0e6ae9",
                              margin: "0px",
                            },
                          }}
                          onClick={handleClickOpen}
                          className={`${EventStyles.tournament_btn}`}
                        >
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
                      <DialogTitle
                        sx={{ backgroundColor: "#0e6ae9", fontSize: "20px", color: "white" }}
                      >
                        Do you want to join event {`${event.event_name}`}?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText sx={{ color: "black" }}>
                          Clubs: {`${event.club_name}`}
                        </DialogContentText>
                        <DialogContentText sx={{ color: "black" }}>
                          Organizer: {`${event.student_name}`}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Typography
                          onClick={handleClose}
                          sx={{
                            marginRight: "12px",
                            cursor: "pointer",
                            ":hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          cancel
                        </Typography>
                        <Button
                          onClick={handleClick}
                          sx={{
                            backgroundColor: "#0e6ae9",
                            color: "white",
                            margin: "1px",
                            ":hover": {
                              backgroundColor: "white",
                              color: "#0e6ae9",
                              border: "1px solid #0e6ae9",
                              margin: "0px",
                            },
                          }}
                        >
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}
                
                </>

              )}
            </div>
          </Box>
          <Box className={`${EventStyles.right_area}`} width='380%'>
            <div className={`${EventStyles.right_top}`}>
              <Typography color="#ffc44c" fontSize='50px'> Event: {`${event.event_name}`} </Typography>
              <Typography className={`${EventStyles.reward}`} color='white'>Clubs: {`${event.club_name}`}</Typography>
              <Typography className={`${EventStyles.reward}`} color='white'>Organizer: {`${event.student_name}`}</Typography>
              <Typography className={`${EventStyles.reward}`} color='white'>Mail Contact: {`${event.email}`}</Typography>
            </div>
            <div className={`${EventStyles.right_bottom}`}>
              <div>
                <div className={`${EventStyles.time_counter}`}>
                  <Typography color="#ffc44c" fontSize='30px'>Timeline:</Typography>
                  {event.start_date == null ? (
                    <Typography color='white' className={`${EventStyles.time}`}>Check-in: 19:00:00, 28/01/2023</Typography>
                  ) : (
                    <Typography color='white' className={`${EventStyles.time}`}>
                      Check-in: {format(startDate, "HH:mm:ss, dd/MM/yyyy")}
                    </Typography>
                  )}

                  {event.end_date == null ? (
                    <Typography color='white' className={`${EventStyles.time}`}>Check-out: 22:00:00, 03-03-2023</Typography>
                  ) : (
                    <Typography color='white' className={`${EventStyles.time}`}>
                      Check-out: {format(endDate, "HH:mm:ss, dd/MM/yyyy")}
                    </Typography>
                  )}

                  <Typography color="#ffc44c" fontSize='30px'>Location:</Typography>
                  <Typography color='white' className={`${EventStyles.time}`}>{`${event.location}`}</Typography>
                  {event.description !== undefined ? (
                    <></>
                  ) : (
                    <>
                      <Typography color="#ffc44c" fontSize='30px'>Description:</Typography>
                      <Typography color='white' className={`${EventStyles.time}`}>{`${event.description}`}</Typography>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Box>
          <Box className={`${EventStyles.right_area}`} width='80%' display='flex' alignItems='start' justifyContent='center'>
            <Box sx={{ backgroundColor: 'white', color: '#ffc44c', width: '200px', height: '150px', borderRadius: '30px' }} >
              <Typography display='flex' alignItems='center' variant="h3" width='175px' justifyContent='center' >
                <StarsIcon fontSize='large' /> Price
              </Typography>
              <Typography sx={{ backgroundColor: '#ffc44c', height: '5px' }}></Typography>
              <Box mt={1}>
                <Typography variant="h2" display='flex' justifyContent='center' alignItems='center'> {event.price}</Typography>
              </Box>
            </Box>

          </Box>
        </div>
      </div>
    </section>
  );
};
