import { async } from "@firebase/util";
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


const Page = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [campus, setCampus] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [clubJoinByThisUser, setClubJoinByThisUser] = useState([]);
  const [visible, setVisible] = useState(false);
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
        )
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

  const handleClickOpen = () => {
    if(clubJoinByThisUser == []){
      alert('Del join club nào')
    } else{
      setOpen(true);
    }
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
        event_id: event.event_id  ,
        club_id: selected,
        student_id: user.id
      }
      await axios.post('https://event-project.herokuapp.com/api/event/organizer', {bodyRequest})
      setOpen(false)
    }
    fetchData()
  };
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
            <Button type="primary" 
            // onClick={checkClub()}
            >
              Create Events
            </Button>
          </div>
          {/* <CreateEvent
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
          /> */}
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
                      key={event.id}
                      selected={selectedCustomerIds.indexOf(user.id) !== -1}
                    >
                      <TableCell>{event.event_name}</TableCell>
                      <TableCell>{event.email}</TableCell>
                      <TableCell>{event.point}</TableCell>
                      {event.start_date === null ? (
                        <>null</>
                      ) : (
                        <TableCell>{format(start_Date, "dd/MM/yyyy")}</TableCell>
                      )}

                      {event.end_date === null ? (
                        <>null</>
                      ) : (
                        <TableCell>{format(end_Date, "dd/MM/yyyy")}</TableCell>
                      )}
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <Button onClick={handleClickOpen}>ok</Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogTitle
                            sx={{ backgroundColor: "#0e6ae9", fontSize: "20px", color: "white" }}
                          >
                            Do you want to join Club: {`${event.name}`}?
                          </DialogTitle>
                          <DialogContent>
                            <FormControl>
                              <Select
                                value={selectedOption}
                                defaultValue={selected}
                                onChange={handleChange} 
                              >
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
                      </TableCell>
                    </TableRow>
                    // </div>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
