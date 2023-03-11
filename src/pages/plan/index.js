// import { async } from "@firebase/util";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  selectedOption,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
// import { CreateEvent } from "../components/dashboard/createEvent";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useAuthContext } from "../../contexts/auth-context";
import { CreateEvent } from "../../components/dashboard/createEvent";

const Page = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [campus, setCampus] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [clubJoinByThisUser, setClubJoinByThisUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [eventChoose, setEventChoose] = useState({});

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      const headers = {
        Authorization: "Bearer " + getCookie("accessToken"),
      };
      try {
        const responseAllClub = await axios.get(
          `https://event-project.herokuapp.com/api/club/student/${user.id}`
        );
        setClubJoinByThisUser(responseAllClub?.data);

        const responseGetAll = await axios.get(
          "https://event-project.herokuapp.com/api/event/?status=0"
        );
        setEvents(responseGetAll?.data);
        console.log("event", responseGetAll);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    if (clubJoinByThisUser == []) {
      alert("Del join club nào");
    } else {
      setEventChoose(event);
      setOpen(true);
    }
    console.log("dd", event);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (events === undefined) {
    return (
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleConfirm = (event) => {
    const fetchData = async () => {
      const bodyRequest = {
        event_id: event.event_id,
        club_id: selected,
        student_id: user.id,
      };
      await axios.post("https://event-project.herokuapp.com/api/event/organizer", { bodyRequest });
      setOpen(false);
    };
    fetchData();
  };

  const checkClub = () => {};
  return (
    <>
      <Head>
        <title>Plan</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" onClick={() => setVisible(true)}>
              Create Events
            </Button>
          </div>
          <CreateEvent
            visible={visible}
            setVisible={setVisible}
            onCancel={() => {
              setVisible(false);
            }}
            // onCancel={() => {
            //   setVisible(false);
            //   setProductDetail(undefined);
            // }}
            // productDetail={productDetail}
            isEdit={true}
          />
          <Box width="100%">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name: </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Point</TableCell>
                  <TableCell>Check-in</TableCell>
                  <TableCell>Check-out</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>button</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => {
                  const start_Date = parseISO(event.start_date);
                  const end_Date = parseISO(event.end_date);
                  return (
                    // <div key={event.event_id}>
                    <TableRow
                      hover
                      key={event.event_id}
                      selected={selectedCustomerIds.indexOf(user.id) !== -1}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {event.event_name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {event.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {event.point}
                          </Typography>
                        </Box>
                      </TableCell>
                      {event.start_date === null ? (
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              11/03/2023
                            </Typography>
                          </Box>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              {format(start_Date, "dd/MM/yyyy")}
                            </Typography>
                          </Box>
                        </TableCell>
                      )}

                      {event.end_date === null ? (
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              12/03/2023
                            </Typography>
                          </Box>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              {format(end_Date, "dd/MM/yyyy")}
                            </Typography>
                          </Box>
                        </TableCell>
                      )}
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {event.location}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleClickOpen(event)}>ok</Button>
                      </TableCell>
                    </TableRow>
                    // </div>
                  );
                })}
              </TableBody>
            </Table>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle sx={{ backgroundColor: "#0e6ae9", fontSize: "20px", color: "white" }}>
                Do you want to join Club: {`${eventChoose.event_name}`}?
                {console.log("cccccc", eventChoose)}
              </DialogTitle>
              <DialogContent>
                <FormControl>
                  <Select value={selectedOption} defaultValue={selected} onChange={handleChange}>
                    {clubJoinByThisUser.map((option) => (
                      <MenuItem key={option.club_id} value={option.club_id}>
                        {option.club_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  onClick={() => handleConfirm(event)}
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
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
