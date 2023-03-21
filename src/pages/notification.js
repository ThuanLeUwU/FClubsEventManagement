import Head from "next/head";
import { Box, Container, Grid, MenuItem, Typography } from "@mui/material";
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

const Page = () => {
  const { user } = useAuthContext();
  const [event, SetEvent] = useState();
  console.log(event);

  useEffect(() => {
    const fetchData = async () => {
      const responseEvent = await axios.get(
        `https://event-project.herokuapp.com/api/event/?status=0&is_approved=1`
      );
      SetEvent(responseEvent?.data);

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
      <div className="jumbotron">
        <div className="container ">
          <div className="row row-header">
            <div className="col-12 col-sm-6">Hellu</div>
          </div>
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

export default Page;
