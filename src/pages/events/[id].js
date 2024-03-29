import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  TableSortLabel,
  Stack,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
  TableContainer,
  TablePagination,
  IconButton,
} from "@mui/material";

import axios from "axios";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import DeleteIcon from "@mui/icons-material/Delete";
import { Warning } from "@mui/icons-material";
import PropTypes from "prop-types";
import { async } from "@firebase/util";
import { Modal } from "antd";

function Event() {
  const router = useRouter();
  const [allUserJoin, setAllUserJoin] = useState([]);
  const [eventInfor, setEventInfor] = useState();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [checkinInfo, setCheckinInfo] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState(null);

  const [statusQR, setStatusQR] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = router.query.id;
        const responseGetAllUserJoinEvent = await axios.get(
          `https://evenu.herokuapp.com/api/event/join/${id}`
        );

        setAllUserJoin(responseGetAllUserJoinEvent?.data);

        const responseGetClubInfor = await axios.get(
          `https://evenu.herokuapp.com/api/event/detail/${id}`
        );
        setEventInfor(responseGetClubInfor?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = router.query.id;
        const responseGetAllUserJoinEvent = await axios.get(
          `https://evenu.herokuapp.com/api/event/join/${id}`
        );
        setAllUserJoin(responseGetAllUserJoinEvent?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [count]);

  //Table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userPaid, setUserPaid] = useState();

//   console.log("tao nè", userPaid);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUserJoin.length + 1.49) : 0;

  if (allUserJoin == undefined || eventInfor == undefined) {
    return (
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleClickQR = async () => {
    try {
      if (statusQR === true) {
        const responseCheckinEvent = await axios.get(
          `https://evenu.herokuapp.com/imagesQrCodeCheckin/event/${eventInfor.event_id}?status=0`
        );
        setCheckinInfo(null);
        setCheckinInfo(responseCheckinEvent?.data);

        setStatusQR(false);
      } else if (statusQR === false) {
        const responseCheckoutEvent = await axios.get(
          `https://evenu.herokuapp.com/imagesQrCodeCheckin/event/${eventInfor.event_id}?status=1`
        );
        setCheckoutInfo(null);
        setCheckoutInfo(responseCheckoutEvent?.data);
        setStatusQR(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    // const fetchData3 = async () => {
    try {
      await axios.delete(`https://evenu.herokuapp.com/api/event/${eventInfor.event_id}`);

      // //Noti
      const bodyRequestNoti = {
        send_option: "device",
        topic: "",
        title: `Cancel the event!!! ${eventInfor.event_name}`,
        content: "Something bad happened, so we decided to cancel the event",
      };

      await axios.post("https://evenu.herokuapp.com/notifications", bodyRequestNoti);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  //Dialog

  const OnClickOpenId = (user) => {
    setUserPaid(user);
    setOpen(true);
  };

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    const fetchData2 = async () => {
      try {
        const requestBody = {
          student_id: userPaid.student_id,
          payment: 1,
        };
        await axios.put(
          `https://evenu.herokuapp.com/api/event/join/${eventInfor.event_id}/payment`,
          requestBody
        );
        console.log("bodyput", requestBody);
        setOpen(false);
        setCount(count + 1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData2();
  };

  return (
    <DashboardLayout>
      <Typography sx={{ mb: 0, ml: 5 }} variant="h4">
        Events
      </Typography>

      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "40px", ml: 5 }}>
        <Link as={"/events"} href="/events">
          Events
        </Link>
        <Typography>{eventInfor.event_name}</Typography>
      </Breadcrumbs>

      <Box sx={{ marginBottom: "30px", display: "flex", justifyContent: "center" }}>
        <Paper key={eventInfor.club_id} display="flex" elevation={4}>
          <Grid container width="1200px">
            <Grid item xs={3}>
              <div className="image">
                <img width="250px" height="300px" src={`${eventInfor.img}`} alt="" />
              </div>
            </Grid>
            <Grid item xs={6.5}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography component="div" fontSize="50px">
                  <Box>{eventInfor.event_name}</Box>
                </Typography>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle
                    sx={{ backgroundColor: "#ff0000", fontSize: "20px", color: "white" }}
                  >
                    {" "}
                    <Warning /> WARNING!!!{" "}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <Typography>
                        Do you want to Cancel Event: {`${eventInfor.event_name}`} ?
                      </Typography>
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
                    <Link as={"/events"} href="/events" passHref>
                      <Button
                        onClick={() => handleDelete()}
                        sx={{
                          backgroundColor: "#ff0000",
                          color: "white",
                          margin: "1px",
                          ":hover": {
                            backgroundColor: "white",
                            color: "#ff0000",
                            border: "1px solid #ff0000",
                            margin: "0px",
                            ml: "10px",
                          },
                        }}
                      >
                        Remove
                      </Button>
                    </Link>
                  </DialogActions>
                </Dialog>

                <Typography variant="h6" color="text.secondary" component="div">
                  <Box>Point: {eventInfor.point}</Box>
                  <Box>Price: {eventInfor.price}</Box>
                </Typography>
                <Typography variant="h6" color="text.secondary" component="div">
                  {eventInfor.start_date == null ? (
                    <Box>Check-in: Check-in: 19:00:00, 28/01/2023</Box>
                  ) : (
                    <Box>Check-in: {format(parseISO(eventInfor.start_date), "dd/MM/yyyy")}</Box>
                  )}
                </Typography>
                <Typography variant="h6" color="text.secondary" component="div">
                  {eventInfor.end_date == null ? (
                    <Box>Check-out: 22:00:00, 03-03-2023</Box>
                  ) : (
                    <Box>Check-out: {format(parseISO(eventInfor.end_date), "dd/MM/yyyy")}</Box>
                  )}
                </Typography>
                <Typography variant="h6" color="text.secondary" component="div">
                  <Box>Location: {eventInfor.location}</Box>
                </Typography>
                {checkinInfo === null && (
                  <Box justifySelf="end" mt={2} mb={1}>
                    <Button
                      onClick={handleClickQR}
                      sx={{
                        backgroundColor: "#0E6AE9",
                        color: "white",
                        margin: "1px",
                        ":hover": {
                          backgroundColor: "white",
                          color: "#0E6AE9",
                          border: "1px solid #0E6AE9",
                          margin: "0px",
                        },
                      }}
                    >
                      Show QR code
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={2.4} p={1}>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    backgroundColor: "#ff0000",
                    color: "white",
                    margin: "1px",
                    ":hover": {
                      backgroundColor: "white",
                      color: "#ff0000",
                      border: "1px solid #ff0000",
                      margin: "0px",
                    },
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Box>
              {checkinInfo !== null && (
                <Box align="center" mt={4}>
                  <Typography variant="h6" width="200px">
                    {statusQR !== true ? "Check-in" : "Check-out"} QR code
                  </Typography>
                  <Box>
                    {statusQR !== true ? (
                      <IconButton onClick={handleOpen}>
                        <img src={checkinInfo.data} />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleOpen}>
                        <img src={checkoutInfo.data} />
                      </IconButton>
                    )}
                  </Box>
                  <Modal
                    className="w-2/3 min-h-[300px]"
                    // title={isEdit ? 'Edit PRoduct' : 'Create Product'}
                    destroyOnClose
                    open={openModal}
                    footer={false}
                    onCancel={handleCloseModal}
                  >
                    <Box>
                      <Typography
                        variant="h3"
                        color="#0E6AE9"
                        display="flex"
                        justifyContent="center"
                      >
                        {statusQR !== true ? "Check-in" : "Check-out"} QR code
                      </Typography>
                      <Box display="flex" justifyContent="center">
                        {statusQR !== true ? (
                          <img src={checkinInfo.data} width={400} height={400} />
                        ) : (
                          <img src={checkoutInfo.data} width={400} height={400} />
                        )}
                      </Box>
                    </Box>
                  </Modal>
                  <Button
                    onClick={handleClickQR}
                    sx={{
                      backgroundColor: "#0E6AE9",
                      color: "white",
                      margin: "1px",
                      ":hover": {
                        backgroundColor: "white",
                        color: "#0E6AE9",
                        border: "1px solid #0E6AE9",
                        margin: "0px",
                      },
                    }}
                  >
                    Switch to {statusQR === true ? "Check-in" : "Check-out"} QR
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Card sx={{ padding: "30px" }}>
        <Box display="flex" justifyContent="center" textTransform="uppercase" fontSize="40px">
          Table of Participants
        </Box>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {stableSort(allUserJoin, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    const joinDate = parseISO(user.registration_date);
                    return (
                      <TableRow hover tabIndex={-1} key={user.student_id}>
                        <TableCell component="th" scope="row" padding="normal">
                          {user.student_name}
                        </TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{user.dpm_name}</TableCell>
                        <TableCell align="left">{user.campus_name}</TableCell>
                        {user.registration_date === null ? (
                          <TableCell align="right">22/02/2023</TableCell>
                        ) : (
                          <TableCell align="right">{format(joinDate, "dd/MM/yyyy")}</TableCell>
                        )}
                        {user.payment === 1 ? (
                          <Button
                            disabled
                            sx={{
                              backgroundColor: "white",
                              margin: "1px",
                              border: "1px solid #0e6ae9",
                            }}
                          >
                            <Typography color="#0e6ae9">Paid</Typography>
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
                              onClick={() => OnClickOpenId(user)}
                              //   className={`${EventStyles.tournament_btn}`}
                            >
                              Payment
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
                            Are you sure they has paid for {`${eventInfor.event_name}`}?
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText sx={{ color: "black" }}>
                              Price: {`${eventInfor.price}`}
                            </DialogContentText>
                            <DialogContentText sx={{ color: "black" }}>
                              Point: {`${eventInfor.point}`}
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
                              onClick={() => handleClick()}
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
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allUserJoin.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Card>
    </DashboardLayout>
  );
}

function descendingComparator(a, b, orderBy) {
  if (orderBy === "name") {
    return compareStrings(a.student_name, b.student_name);
  }
  if (orderBy === "joinDate") {
    const dateA = new Date(a.registration_date);
    const dateB = new Date(b.registration_date);
    return dateA.getTime() - dateB.getTime();
  }
  if (orderBy === "department") {
    return compareStrings(a.dpm_name, b.dpm_name);
  }
  if (orderBy === "campus") {
    return compareStrings(a.campus_name, b.campus_name);
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function compareStrings(a, b) {
  return a.localeCompare(b);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Name of User",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
  },
  {
    id: "department",
    numeric: false,
    label: "Department",
  },
  {
    id: "campus",
    numeric: false,
    label: "Campus",
  },
  {
    id: "joinDate",
    numeric: true,
    label: "Join Date",
  },
  { id: "payment", numeric: false, label: "Payment" },
];

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) =>
          headCell.label === "Remove" ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding="normal"
            >
              <Table>{headCell.label}</Table>
            </TableCell>
          ) : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding="normal"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

export default Event;
