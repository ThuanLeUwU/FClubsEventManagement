import React, { useEffect, useState } from "react";
import EventStyles from "./styles/event.module.scss";
import { format, parseISO } from 'date-fns';
import { async } from "@firebase/util";
import axios from "axios";
import { useAuthContext } from "../../contexts/auth-context";
import { color } from "@mui/system";
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
      //sai API
      
      const responseAllStudentJoinThisEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${event.event_id}`)
      setJohnEventList(responseAllStudentJoinThisEvent?.data);
    }
    fetchData();
  }, [])



  const handleClick = () => {
    const fetchData = async () => {
      try {
        const requestBody = {
          event_id: event.event_id,
          student_id: user.id,
          registration_date: "2023-10-03 13-54-22"
        }
        const response = axios.post('https://event-project.herokuapp.com/api/event/join', requestBody)
        setSuccess(true)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }

  useEffect(() => {
    const fetchData = async () => {
      //sai API
      
      const responseAllStudentJoinThisEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${event.event_id}`)
      setJohnEventList(responseAllStudentJoinThisEvent?.data);
    }
    fetchData();
  }, [success])

  console.log('list Event', joinEventList);
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
              <div className={`${EventStyles.content}`}>
                {joinEventList.find(thisUser => thisUser.student_id == user.id) ? (
                  <div  class="text-danger">
                    JOINED
                  </div>
                ) : (
                  <a
                    // style="text-decoration: none"
                    onClick={handleClick}
                    className={`${EventStyles.tournament_btn}`}
                  >
                    JOIN EVENT
                  </a>
                )}

              </div>
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

                  <span className={`${EventStyles.time}`}>Check-in: {format(startDate, 'HH:mm:ss, dd/MM/yyyy')}</span>
              <span className={`${EventStyles.time}`}>Check-out: {format(endDate, 'HH:mm:ss, dd/MM/yyyy')}</span>
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