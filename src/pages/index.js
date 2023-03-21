import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Head from "next/head";
// import { Budget } from '../components/dashboard/budget';

import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { useAuthContext } from "../contexts/auth-context";
// import { CreateEvent } from "../components/dashboard/createEvent";
// import Dashboard from './Dashboard';gt
import CelebrationIcon from "@mui/icons-material/Celebration";
import CircleIcon from "@mui/icons-material/Circle";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import GroupIcon from "@mui/icons-material/Group";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StarsIcon from "@mui/icons-material/Stars";
import { getCookie } from "cookies-next";
import { Chart } from "react-google-charts";
import { authFirebase } from "../firebase/firebase";
const Page = () => {
  const { user } = useAuthContext();
  const [campus, setCampus] = useState([]);
  const [selectedCampusForPoint, setSelectedCampusForPoint] = useState(user ? user.campus : 1);
  const [selectedCampusForClub, setSelectedCampusForClub] = useState(user ? user.campus : 1);
  const [selectedCampusForChart, setSelectedCampusForChart] = useState(user ? user.campus : 1);

  //point this User
  const [point, setPoint] = useState(0);

  //Chart Data
  const [topUser, setTopUser] = useState({});
  const [topClubs, setTopClubs] = useState([]);
  const [eventNotApproved, setEventNotApproved] = useState([]);

  //Chart Admin
  const [allEvent, setAllEvent] = useState([]);

  //Chart user
  const [allEventThatUserJoin, setAllEventThatUserJoin] = useState([]);
  const [allClubThatUserJoin, setAllClubThatUserJoin] = useState([]);
  const [allClubInCampus, setAllClubInCampus] = useState([]);

  useEffect(() => {
    const fetchCampus = async () => {
      const headers = {
        Authorization: "Bearer " + getCookie("accessToken"),
      };
      const responseAllCampus = await axios.get(`https://event-project.herokuapp.com/api/campus`, {
        headers,
      });
      setCampus(responseAllCampus?.data);

      if (user.role !== "admin") {
        const responseInfor = await axios.get(
          `https://event-project.herokuapp.com/api/student/${user.id}/point`
        );
        setPoint(responseInfor?.data);

        const responseGetAllEventThatUserJoin = await axios.get(
          `https://event-project.herokuapp.com/api/event/join/student/${user.id}`
        );
        setAllEventThatUserJoin(responseGetAllEventThatUserJoin?.data);

        const responseGetAllClub = await axios.get(
          `https://event-project.herokuapp.com/api/club/campus/${user.campus}`
        );
        setAllClubInCampus(responseGetAllClub?.data);

        const responseGetAllClubThatUserJoin = await axios.get(
          `https://event-project.herokuapp.com/api/club/student/${user.id}`
        );
        setAllClubThatUserJoin(responseGetAllClubThatUserJoin?.data);
      }

      const responseGetAll = await axios.get(
        "https://event-project.herokuapp.com/api/event/?status=1&is_approved=1"
      );
      setAllEvent(responseGetAll?.data);
    };
    fetchCampus();
  }, []);

  useEffect(() => {
    const fetchCampus = async () => {
      const response = await axios.get(
        `https://event-project.herokuapp.com/api/student/point?campus_id=${selectedCampusForPoint}`
      );
      setTopUser(response?.data);
    };
    fetchCampus();
  }, [selectedCampusForPoint]);

  useEffect(() => {
    const fetchCampus = async () => {
      const response = await axios.get(
        `https://event-project.herokuapp.com/api/club/topEvent?campus_id=${selectedCampusForClub}`
      );
      setTopClubs(response?.data);
    };
    fetchCampus();
  }, [selectedCampusForClub]);

  useEffect(() => {
    const fetchCampus = async () => {
      const response = await axios.get(
        `https://event-project.herokuapp.com/api/event/${selectedCampusForChart}?status=1&is_approved=0`
      );
      setEventNotApproved(response?.data);
    };
    fetchCampus();
  }, [selectedCampusForChart]);

  const handleChangePoint = (event) => {
    setSelectedCampusForPoint(event.target.value);
  };
  const handleChangeClub = (event) => {
    setSelectedCampusForClub(event.target.value);
  };
  const handleChangeChart = (event) => {
    setSelectedCampusForChart(event.target.value);
  };
  if (user === undefined) {
    return (
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}
      >
        <CircularProgress />
      </div>
    );
  }

  //Data of Admin
  const chart1dataA = 0;
  const chart1dataB = 0;
  const chart1dataC = 0;
  if (allEvent !== []) {
    allEvent.map((event) => {
      console.log("event", event);
      if (event.club_id === 1 || event.club_id === 2 || event.club_id === 3) {
        chart1dataA = chart1dataA + 1;
      } else if (event.club_id === 4 || event.club_id === 5 || event.club_id === 6) {
        chart1dataB = chart1dataB + 1;
      } else {
        chart1dataC = chart1dataC + 1;
      }
    });
  }

  const adminFirstData = [
    ["Task", "Hours per Day"],
    ["Xavalo", chart1dataA],
    ["Hola", chart1dataB],
    ["Fuda", chart1dataC],
  ];
  const adminFisrtOptions = {
    backgroundColor: "#fff1d8",
    chartArea: { width: "90%", height: "90%" },
    legend: "none",
  };

  const adminSecondtData = [
    ["Task", "Hours per Day"],
    ["Xavalo", 3],
    ["Hola", 3],
    ["Fuda", 3],
  ];

  const adminSecondOptions = {
    backgroundColor: "#FFEEE6",
    chartArea: { width: "90%", height: "90%" },
    legend: "none",
  };

  //Data of User
  const userChart1dataA = 0;
  const userChart1dataB = 0;
  if (allEventThatUserJoin !== []) {
    userChart1dataA = allEventThatUserJoin.length;
    userChart1dataB = allEvent.length - allEventThatUserJoin.length;
  }
  const userFirstData = [
    ["Task", "Hours per Day"],
    ["This User", userChart1dataA],
    ["Others", userChart1dataB],
  ];
  const userFisrtOptions = {
    backgroundColor: "#fff1d8",
    chartArea: { width: "90%", height: "90%" },
    legend: "none",
  };

  const userChart2dataA = 0;
  const userChart2dataB = 0;
  if (allClubThatUserJoin !== []) {
    userChart2dataA = allClubThatUserJoin.length;
    userChart2dataB = allClubInCampus.length - allClubThatUserJoin.length;
  }

  const userSecondtData = [
    ["Task", "Hours per Day"],
    ["This User", userChart2dataA],
    ["Other", userChart2dataB],
  ];
  const userSecondOptions = {
    backgroundColor: "#FFEEE6",
    chartArea: { width: "90%", height: "90%" },
    legend: "none",
  };
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box ml="10px">
            <Stack
              direction="column"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Typography sx={{ m: 1, mb: 0 }} variant="h4">
                Dashboard
              </Typography>
              {user.role === "admin" ? (
                <Typography sx={{ m: 1, mt: 0, color: "#7f7f7f" }}>
                  Welcome, Admin {`${authFirebase.currentUser.displayName}`} !
                </Typography>
              ) : (
                <Typography sx={{ m: 1, mt: 0, color: "#d1d1d1" }}>
                  Welcome, {`${authFirebase.currentUser.displayName}`} !
                </Typography>
              )}

              {user.role === "admin" ? (
                <Box>
                  <Typography variant="h3" alignItems="center" display="flex">
                    <LeaderboardIcon fontSize="large" />
                    Chart
                  </Typography>
                  <Stack
                    sx={{ m: 1, paddingRight: "10px" }}
                    direction="row"
                    spacing={4}
                    display="flex"
                  >
                    <Paper
                      sx={{
                        backgroundColor: "#fff1d8",
                        borderRadius: "30px",
                        width: "500px",
                        height: "300px",
                        p: 2,
                      }}
                      elevation={4}
                    >
                      <Typography variant="h5" display="flex" alignItems="center">
                        <EventIcon fontSize="large" /> Events of All Campus
                      </Typography>
                      <Grid container>
                        <Grid item xs={7}>
                          <Box width="250px" height="250px">
                            <Chart
                              chartType="PieChart"
                              data={adminFirstData}
                              options={adminFisrtOptions}
                              width="220px"
                              height="220px"
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={4} alignContent="center" alignSelf="center">
                          <Typography variant="h5" color="#3366CC">
                            {" "}
                            <CircleIcon fontSize="small" /> Xavalo
                          </Typography>
                          <Typography variant="h5" color="#FF9900">
                            {" "}
                            <CircleIcon fontSize="small" /> Fuda
                          </Typography>
                          <Typography variant="h5" color="#DC3912">
                            {" "}
                            <CircleIcon fontSize="small" /> Hola
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    <Paper
                      sx={{
                        backgroundColor: "#ffeee6",
                        borderRadius: "30px",
                        width: "500px",
                        height: "300px",
                        p: 2,
                      }}
                      elevation={4}
                    >
                      <Typography variant="h5" display="flex" alignItems="center">
                        <GroupIcon fontSize="large" /> Club of All Campus
                      </Typography>
                      <Grid container>
                        <Grid item xs={7}>
                          <Box width="250px" height="250px">
                            <Chart
                              chartType="PieChart"
                              data={adminSecondtData}
                              options={adminSecondOptions}
                              width="220px"
                              height="220px"
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={4} alignContent="center" alignSelf="center">
                          <Typography variant="h5" color="#3366CC">
                            {" "}
                            <CircleIcon fontSize="small" /> Xavalo
                          </Typography>
                          <Typography variant="h5" color="#FF9900">
                            {" "}
                            <CircleIcon fontSize="small" /> Fuda
                          </Typography>
                          <Typography variant="h5" color="#DC3912">
                            {" "}
                            <CircleIcon fontSize="small" /> Hola
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    <Paper
                      sx={{
                        backgroundColor: "#f0fceb",
                        borderRadius: "30px",
                        width: "500px",
                        height: "300px",
                        p: 2,
                      }}
                      elevation={4}
                    >
                      <Typography variant="h5" display="flex" alignItems="center">
                        <EventBusyIcon fontSize="large" /> Events have not been approved
                      </Typography>
                      <Box height="100%" width="100%">
                        <Grid container height="100%" width="100%">
                          <Grid
                            item
                            xs={9.5}
                            height="100%"
                            display="flex"
                            alignContent="center"
                            justifyContent="center"
                          >
                            <Typography fontSize="120px" display="flex" alignItems="center">
                              {eventNotApproved.length}
                              <Typography mt={9}>Event</Typography>
                            </Typography>
                          </Grid>
                          <Grid item xs={1} height="100%" mt={10}>
                            <FormControl>
                              <InputLabel id="select-label">Campus</InputLabel>
                              <Select
                                value={selectedCampusForChart}
                                defaultValue={selectedCampusForChart}
                                onChange={handleChangeChart}
                                labelId="select-label"
                              >
                                {campus.map((option) => (
                                  <MenuItem key={option.campus_id} value={option.campus_id}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Stack>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h3" alignItems="center" display="flex">
                    <LeaderboardIcon fontSize="large" />
                    Chart
                  </Typography>
                  <Stack
                    sx={{ m: 1, paddingRight: "10px" }}
                    direction="row"
                    spacing={4}
                    display="flex"
                  >
                    <Paper
                      sx={{
                        backgroundColor: "#fff1d8",
                        borderRadius: "30px",
                        width: "500px",
                        height: "300px",
                        p: 2,
                      }}
                      elevation={4}
                    >
                      <Typography variant="h5" display="flex" alignItems="center">
                        <EventIcon fontSize="large" /> All Event that you join
                      </Typography>
                      <Grid container>
                        <Grid item xs={7}>
                          <Box width="250px" height="250px">
                            <Chart
                              chartType="PieChart"
                              data={userFirstData}
                              options={userFisrtOptions}
                              width="220px"
                              height="220px"
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={4} alignContent="center" alignSelf="center">
                          <Typography variant="h5" color="#3366CC">
                            {" "}
                            <CircleIcon fontSize="small" /> This user
                          </Typography>
                          <Typography variant="h5" color="#DC3912">
                            {" "}
                            <CircleIcon fontSize="small" /> Other
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    <Paper
                      sx={{
                        backgroundColor: "#ffeee6",
                        borderRadius: "30px",
                        width: "500px",
                        height: "300px",
                        p: 2,
                      }}
                      elevation={4}
                    >
                      <Typography variant="h5" display="flex" alignItems="center">
                        <GroupIcon fontSize="large" /> All clubs that you join
                      </Typography>
                      <Grid container>
                        <Grid item xs={7}>
                          <Box width="250px" height="250px">
                            <Chart
                              chartType="PieChart"
                              data={userSecondtData}
                              options={userSecondOptions}
                              width="220px"
                              height="220px"
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={4} alignContent="center" alignSelf="center">
                          <Typography variant="h5" color="#3366CC">
                            {" "}
                            <CircleIcon fontSize="small" /> This
                          </Typography>
                          <Typography variant="h5" color="#DC3912">
                            {" "}
                            <CircleIcon fontSize="small" /> Other
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                    <Paper
                      sx={{
                        backgroundColor: "#f0fceb",
                        borderRadius: "30px",
                        width: "500px",
                        height: "300px",
                        p: 2,
                      }}
                      elevation={4}
                    >
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography
                            variant="h5"
                            display="flex"
                            alignItems="center"
                            justifyContent="start"
                          >
                            <StarsIcon fontSize="large" /> Your Point
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="body1" alignItems="end" display="flex">
                            {point.semester}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box height="100%" width="100%">
                        <Box
                          item
                          xs={9.5}
                          height="100%"
                          display="flex"
                          alignContent="center"
                          justifyContent="center"
                        >
                          <Typography fontSize="120px" display="flex" alignItems="center">
                            {point.point}
                            <Typography mt={9}>point</Typography>
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Stack>
                  {/* <Paper sx={{ backgroundColor: '#f0fceb', borderRadius: '30px', width: '500px', height: '300px', p: 2 }} elevation={4}>
                  <Typography variant='h5' display='flex' alignItems='center'>
                    <PersonIcon fontSize='large' /> User of All Campus
                  </Typography>
                  <Grid container>
                    <Grid item xs={7}>
                      <Box width='250px' height='250px'>
                        <Chart
                          chartType="PieChart"
                          data={adminThirdData}
                          options={adminThirdOptions}
                          width="220px"
                          height="220px"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={4} alignContent='center' alignSelf='center'>
                      <Typography variant='h5' color='#3366CC'> <CircleIcon fontSize='small' /> Xavalo</Typography>
                      <Typography variant='h5' color='#FF9900'> <CircleIcon fontSize='small' /> Fuda</Typography>
                      <Typography variant='h5' color='#DC3912'> <CircleIcon fontSize='small' /> Hola</Typography>
                    </Grid>

                  </Grid>
                </Paper> */}
                </Box>
              )}

              <Box mt="10px">
                <Typography variant="h3" alignItems="center" display="flex">
                  <StarsIcon fontSize="large" />
                  Point
                </Typography>
                <Stack direction="row" spacing={9} display="flex" justifyContent="center">
                  <Paper elevation={4} sx={{ width: "700px", height: "500px", p: 3 }}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                          Top 10 student have Highest Point
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <FormControl>
                          <InputLabel id="select-label">Campus</InputLabel>
                          <Select
                            value={selectedCampusForPoint}
                            defaultValue={selectedCampusForPoint}
                            onChange={handleChangePoint}
                            labelId="select-label"
                          >
                            {campus.map((option) => (
                              <MenuItem key={option.campus_id} value={option.campus_id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Box sx={{ width: "100%", mt: 5 }}>
                      <TableContainer
                        style={{ height: 360, width: 675, paddingRight: 20, paddingBottom: 10 }}
                      >
                        <Table>
                          <TableBody>
                            {topUser.result &&
                              topUser.result.map((user, index) => {
                                return (
                                  <TableRow
                                    key={index}
                                    sx={{
                                      backgroundColor: "#f7f7f7",
                                      ":hover": {
                                        backgroundColor: "#e53633",
                                      },
                                      marginTop: "10px", // Khoảng cách giữa các hàng
                                      marginBottom: "10px", // Khoảng cách giữa các hàng
                                    }}
                                  >
                                    <TableCell
                                      sx={{
                                        borderTopLeftRadius: "10px",
                                        borderEndStartRadius: "10px",
                                      }}
                                    >
                                      <Typography variant="h6" alignItems="center" display="flex">
                                        {user.student_name}
                                      </Typography>
                                    </TableCell>

                                    <TableCell></TableCell>
                                    <TableCell align="right">
                                      <Tooltip title="Point">
                                        <Typography variant="h6" alignItems="center" display="flex">
                                          <StarsIcon fontSize="small" />
                                          {user.point}
                                        </Typography>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        borderEndEndRadius: "10px",
                                        borderStartEndRadius: "10px",
                                      }}
                                    >
                                      <Tooltip title="Join Event">
                                        <Typography variant="h6" alignItems="center" display="flex">
                                          <EventAvailableIcon fontSize="small" />
                                          {user.totalEvent}
                                        </Typography>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Paper>

                  <Paper elevation={4} sx={{ width: "820px", height: "500px", p: 3 }}>
                    <Grid container>
                      <Grid item xs={10.5}>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                          Top 5 Club have Highest Point
                        </Typography>
                      </Grid>
                      <Grid item xs={1.5}>
                        <FormControl>
                          <InputLabel id="select-label">Campus</InputLabel>
                          <Select
                            value={selectedCampusForClub}
                            defaultValue={selectedCampusForClub}
                            onChange={handleChangeClub}
                            labelId="select-label"
                          >
                            {campus.map((option) => (
                              <MenuItem key={option.campus_id} value={option.campus_id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Box sx={{ width: "100%", mt: 5 }}>
                      <TableContainer style={{ height: 360, width: 800, paddingRight: 20 }}>
                        <Table>
                          <TableBody>
                            {topClubs &&
                              topClubs.map((club, index) => {
                                return (
                                  <TableRow
                                    key={index}
                                    sx={{
                                      backgroundColor: "#f7f7f7",
                                      ":hover": {
                                        backgroundColor: "#49cc90",
                                      },
                                    }}
                                  >
                                    <TableCell
                                      sx={{
                                        borderTopLeftRadius: "10px",
                                        borderEndStartRadius: "10px",
                                      }}
                                    >
                                      <Typography variant="h6" alignItems="center" display="flex">
                                        {club.club_name}
                                      </Typography>
                                    </TableCell>

                                    <TableCell>
                                      <Tooltip title="Abv">
                                        <Typography
                                          variant="body1"
                                          alignItems="center"
                                          display="flex"
                                        >
                                          {club.abv}
                                        </Typography>
                                      </Tooltip>
                                    </TableCell>

                                    <TableCell align="right"></TableCell>
                                    <TableCell
                                      sx={{
                                        borderEndEndRadius: "10px",
                                        borderStartEndRadius: "10px",
                                      }}
                                    >
                                      <Tooltip title="Total Event">
                                        <Typography variant="h6" alignItems="center" display="flex">
                                          <CelebrationIcon fontSize="small" />
                                          {club.totalEvent}
                                        </Typography>
                                      </Tooltip>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Paper>
                </Stack>
              </Box>
            </Stack>

            <Paper></Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
