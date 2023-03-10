import React, { useEffect, useState } from "react";
import EventStyles from "./styles/event.module.scss";
import { format, parseISO } from 'date-fns';
import { async } from "@firebase/util";
import axios from "axios";
import { useAuthContext } from "../../contexts/auth-context";
import { color } from "@mui/system";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, ListItemButton, ListItemText, Slide, Typography } from "@mui/material";
import Link from "next/link";


export const Events = ({ event }) => {
  console.log('event', event);
  const startDate = parseISO(event.start_date);
  const endDate = parseISO(event.end_date);
  const { user } = useAuthContext();
  const [joinEventList, setJohnEventList] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const responseAllStudentJoinThisEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${event.event_id}`)
      setJohnEventList(responseAllStudentJoinThisEvent?.data);
    }
    fetchData();
  }, [])



  // const handleClick = (event) => {
  //   const fetchData = async () => {
  //     try {
  //       const requestBody = {
  //         event_id: event.event_id,
  //         student_id: user.id,
  //         registration_date: "2023-10-03 13-54-22"
  //       }
  //       const response = axios.post('https://event-project.herokuapp.com/api/event/join', requestBody)
  //       setSuccess(true)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }

  const handleClickMore = () => {

  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     //sai API

  //     const responseAllStudentJoinThisEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${event.event_id}`)
  //     setJohnEventList(responseAllStudentJoinThisEvent?.data);
  //   }
  //   fetchData();
  // }, [success])


  //Dialog
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className={`${EventStyles.tournament_section}`}>
      <div className={`${EventStyles.container}`}>
        {/* <div className="row"> */}
        {/* <div className="col-lg-12"> */}
        <div className={`${EventStyles.single_tournament}`}>
          <div className={`${EventStyles.left_area}`}>
            <div className={`${EventStyles.single_play}`}>
              <div className="image">
                <img
                  className={`${EventStyles.image}`}
                  src={`${event.img}`}
                  alt=""
                />
              </div>
              {user.role == 'admin' ? (
                <Link href={`/dashboard/${event.event_id}`} passHref>
                  <Button sx={{ fontSize: '30px', color: 'white' }}>
                    More Detail
                  </Button>
                </Link>
              ) : (
                <div className={`${EventStyles.content}`}>
                  {joinEventList.find(thisUser => thisUser.student_id == user.id) ? (
                    <div>
                      JOINED
                    </div>
                  ) : (
                    <>
                      <a
                        // style="text-decoration: none"
                        onClick={handleClickOpen}
                        className={`${EventStyles.tournament_btn}`}
                      >
                        JOIN EVENT
                      </a>

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
                      <Button onClick={handleClose} sx={{
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
            {/* <h4 className={`${EventStyles.people_playing}`}>
              59,000 People Playing
            </h4> */}
            {/* <ul className={`${EventStyles.players_list}`}>
              <li className={`${EventStyles.players}`}>
                <a href="#">
                  <img src="" alt="" />
                </a>
              </li>
              <li className={`${EventStyles.players}`}>
                <a href="#">
                  <img src="" alt="" />
                </a>
              </li>
              <li className={`${EventStyles.players}`}>
                <a href="#">
                  <img src="" alt="" />
                </a>
              </li>
              <li className={`${EventStyles.players}`}>
                <a href="#">
                  <img src="" alt="" />
                </a>
              </li>
              <li className={`${EventStyles.players}`}>
                <span className={`${EventStyles.more_players}`}>32+</span>
              </li>
            </ul> */}
          </div>
          <div className={`${EventStyles.right_area}`}>
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
                {/* <span className={`${EventStyles.title}`}>Date begin: </span> */}
                <div className={`${EventStyles.time_counter}`}>
                  {/* <i className="far fa-clock"></i>
                  <div data-countdown="2021/12/15"> */}
                  <h4>Timeline:</h4>
                  {event.start_date == null ? (
                    <span className={`${EventStyles.time}`}>Check-in:  19:00:00, 28/01/2023</span>
                  ) : (
                    <span className={`${EventStyles.time}`}>Check-in: 22:00:00, 28/01/2023 {format(startDate, 'HH:mm:ss, dd/MM/yyyy')}</span>
                  )}

                  {event.end_date == null ? (
                    <span className={`${EventStyles.time}`}>Check-in: 03-03-2023</span>
                  ) : (
                    <span className={`${EventStyles.time}`}>Check-in: {format(endDate, 'HH:mm:ss, dd/MM/yyyy')}</span>
                  )}
                 
                  <h4>Location:</h4>
                  <span className={`${EventStyles.time}`}>{`${event.location}`}</span>
                  {event.description ? (
                    <>
                      <h4>Description:</h4>
                      <span className={`${EventStyles.time}`}>{`${event.description}`}</span>
                    </>
                  ) : (<></>)}
                  {/* </div> */}
                </div>
                {/* <img src="" 
                alt="" className={`${EventStyles.time_image}`} /> */}
              </div>
              {/* <div className={`${EventStyles.time_line}`}>
                <h5 className={`${EventStyles.prize}`}>Prize pool</h5>
                <h3 className={`${EventStyles.prize_money}`}>$2,000,000</h3>
                <div>
                  <h6>9/11/22 6:00 AM - 11/02/21 5:59 AM</h6>
                  <img src="" alt="" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>

    </section>
  );
};