import Head from "next/head";
import { Box, Container, Grid, MenuItem, Typography } from "@mui/material";
import * as React from "react";
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
  return (
    <>
      <Head>
        <title>Event</title>
      </Head>
      <AppBar position="static">
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
              LOGO
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
      </AppBar>
    </>
  );
};

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Page;
