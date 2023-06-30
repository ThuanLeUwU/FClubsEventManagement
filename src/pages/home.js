import Head from "next/head";
import { Box, Card, Container, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
// import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Typography from '@mui/material/Typography';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import Container from '@mui/material/Container';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// import MenuItem from '@mui/material/MenuItem';
import AdbIcon from "@mui/icons-material/Adb";
import { DashboardLayout } from "../components/dashboard-layout";
import { AdminPanelSettings, ChatRounded, Event, Group } from "@mui/icons-material";
import { NavItem } from "../components/nav-item";
import { useAuthContext } from "../contexts/auth-context";
import axios from "axios";
import { Carousel } from "antd";
import { format, parseISO } from "date-fns";
import Link from "next/link";
// import { Carousel } from "react-responsive-carousel";
// import Jumbotron from "react-bootstrap/Jumbotron";

// import Notification from '../components/notification/notification';
// import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";

const items = [
  {
    href: "/notification",
    icon: <Event fontSize="small" />,
    title: "Events",
  },
  {
    href: "/register",
    icon: <Group fontSize="small" />,
    title: "Clubs",
  },
];

const Home = () => {
  const { user } = useAuthContext();
  const [event, SetEvent] = useState([]);
  const [studentHighestScore, SetStudentHighestScore] = useState([]);
  console.log(studentHighestScore);
  console.log(event);

  useEffect(() => {
    const fetchData = async () => {
      const responseEvent = await axios.get(
        `https://evenu.herokuapp.com/api/event/?status=0&is_approved=1`
      );
      SetEvent(responseEvent?.data);
      
      const responseStudent = await axios.get(
        `https://evenu.herokuapp.com/api/student/point?campus_id=3`
      )

      SetStudentHighestScore(responseStudent?.data)

      // console.log("qr", checkinInfo);
    };
    fetchData();
  }, []);



  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {/* <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img width={"80px"} height={"80px"} src="https://storage.googleapis.com/f-club-management.appspot.com/logo-removebg-preview.png?GoogleAccessId=firebase-adminsdk-601p4%40f-club-management.iam.gserviceaccount.com&Expires=1893456000&Signature=Ha3W5X77Rkj1UNK7FKv7jQziWd%2Bj5GYPHiZ%2Byf2bDTkfoAEH7nMQMEYO7sKGc2hz25H1OvwypwR7CkstoaUuqocYG4vlct7MXA5Wxzz7Mp7LE5gPF1XzDItU7pn7nXcjzpqMxutq3AjT6L2iQzpy54U7ttcmZsLwEwtReYqDcazZkXgvxK6sTDbTAIU7BrDgQwmewNPHPVDirIYm2jLaVc8mMHVJiClZ1zGVP4IHQA4YCIknhsswBNWnoKTootjZMIXvPZUQ%2BPpBmL%2B2kCXVQtwEYHKwpV9Cc%2BeEGmu2CtWONPwwml5%2FwpOwXwBTlYKh2gpQ3xNbnS7%2FMZsb40aucg%3D%3D"/> 
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {items.map((item,index) => (
            <div key={index}>
              <NavItem
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                />
            </div>
          ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar> */}
      <div className="container">
        <div className="jumbotron">
          <div className="container ">
            <div className="row row-header">
              <div className="col-12 col-sm-6"></div>
            </div>
          </div>
        </div>
        <div className="row-content">
          <h1 className="title-eve">Events On-going </h1>

          {/* <h1>Top 10 students with the highest point </h1> */}
          <Carousel autoplay slidesToShow={3} className="carousel" >
            {/* {event.map((item) => {
                  <div>
                    <img src={item.img}/>
                  </div>
                })} */}
            {/* <div> */}
            {/* <h3 >{event.img}</h3> */}
            {/* </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3 >3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div> */}
            {event.map((item, key) => {
              return (
                <Card key={key} 
                className="card">
                  {/* {console.log(item.event_name)} */}
                  <Grid container >
                    <Grid item xs={8} className="grid_item">
                      <div className="title">
                      <h3>{item.event_name} </h3>
                      <br />
                      </div>
                      <div>
                      Check-in: {format(parseISO(item.start_date), "HH:mm:ss, dd/MM/yyyy")}
                      <br />
                      Check-out: {format(parseISO(item.end_date), "HH:mm:ss, dd/MM/yyyy")}
                      <br /> 
                      <Button className="link_button" >
                        <Link href="/login">More Detail</Link>
                      </Button>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <img src={item.img} className="image" width="150px" height="150px"></img>
                    </Grid>
                    {/* <h1>Top 10 students with the highest point </h1> */}
                  </Grid>
                </Card>
              );
              // <img src={event.img} width="100%"/>
            })}
          </Carousel>
        </div>
            <div className="row-content">
              <h1 className="title-eve">Top 3 students có số điểm cao nhất của FPT Spring2023</h1>
              {/* {console.log("name" , studentHighestScore.result)} */}
            </div>
      </div>
    </>
  );
};

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Home;
