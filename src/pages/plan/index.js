import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useAuthContext } from "../../contexts/auth-context";

const Page = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [eventChoose, setEventChoose] = useState({});
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  //Table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchEvent = async () => {
    try {
      const responseGetAll = await axios.get(
        "https://event-project.herokuapp.com/api/event/?status=1&is_approved=0"
      );
      setEvents(responseGetAll?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [count]);

  const handleClickOpen = (event) => {
    setEventChoose(event);
    setOpen(true);
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
      await axios.put(`https://event-project.herokuapp.com/api/event/${eventChoose.event_id}`);
      const bodyRequestNoti = {
        send_option: "device",
        topic: "my-topic",
        title: eventChoose.event_name,
        content:
          "Location:" +
          eventChoose.location +
          " From: " +
          eventChoose.start_date +
          " To: " +
          eventChoose.end_date,
      };

      await axios.post("https://event-project.herokuapp.com/notifications", bodyRequestNoti);

      setCount(count + 1);
    };
    fetchData();
    setOpen(false);
  };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - events.length + 1.49) : 0;
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
          p: 4,
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="h2"> Table Of Events Plan</Typography>
          <Paper sx={{ width: "100%" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 900 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {stableSort(events, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((event, index) => {
                      const start_Date = parseISO(event.start_date);
                      const end_Date = parseISO(event.end_date);
                      const num = page * rowsPerPage + index + 1;
                      const campus =
                        event.club_id < 4 ? "Xavalo" : event.club_id < 7 ? "Hola" : "Fuda";
                      return (
                        <TableRow hover tabIndex={-1} key={event.event_id}>
                          <TableCell>{num}</TableCell>
                          <TableCell>
                            <div className="image">
                              <img width="40px" height="60px" src={`${event.img}`} alt="" />
                            </div>
                          </TableCell>
                          <TableCell align="left">{event.event_name}</TableCell>
                          <TableCell align="left">{event.email}</TableCell>
                          <TableCell align="right">{event.point}</TableCell>

                          {event.start_date === null ? (
                            <TableCell align="right">30/03/2023</TableCell>
                          ) : (
                            <TableCell align="right">{format(start_Date, "dd/MM/yyyy")}</TableCell>
                          )}
                          {event.end_date === null ? (
                            <TableCell align="right">31/03/2023</TableCell>
                          ) : (
                            <TableCell align="right">{format(end_Date, "dd/MM/yyyy")}</TableCell>
                          )}
                          <TableCell align="right"> {campus}</TableCell>
                          <TableCell align="right">{event.location}</TableCell>
                          <TableCell align="right">
                            <Button onClick={() => handleClickOpen(event)}>
                              <NotificationsActiveIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle
                      sx={{ backgroundColor: "#0e6ae9", fontSize: "20px", color: "white" }}
                    >
                      {" "}
                      <NotificationsActiveIcon /> Notications!!!{" "}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <Typography>
                          Do you want to Public Event: {`${eventChoose.event_name}`} ?
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

                      <Button
                        onClick={() => handleConfirm()}
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
              display="flex"
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={events.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

function descendingComparator(a, b, orderBy) {
  if (orderBy === "name") {
    return compareStrings(a.event_name, b.event_name);
  }
  if (orderBy === "check-in") {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);
    return dateA.getTime() - dateB.getTime();
  }
  if (orderBy === "check-out") {
    const dateA = new Date(a.end_date);
    const dateB = new Date(b.end_date);
    return dateA.getTime() - dateB.getTime();
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  if (orderBy === "no") {
    return (a, b) => {
      return order === "desc" ? b.no - a.no : a.no - b.no;
    };
  }
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
    id: "no",
    numeric: false,
    label: "No.",
  },
  {
    id: "img",
    numeric: false,
    label: "Image",
  },
  {
    id: "name",
    numeric: false,
    label: "Name of Event",
  },
  {
    id: "email",
    numeric: false,
    label: "Email Contact",
  },
  {
    id: "point",
    numeric: true,
    label: "Point",
  },
  {
    id: "check-in",
    numeric: true,
    label: "Check-in",
  },
  {
    id: "check-out",
    numeric: true,
    label: "Check-out",
  },
  {
    id: "campus",
    numeric: true,
    label: "Campus",
  },

  {
    id: "location",
    numeric: true,
    label: "Location",
  },
  {
    id: "notications",
    numeric: true,
    label: "Notications",
  },
];

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  //Table

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) =>
          headCell.label === "Notications" ||
          headCell.label === "Image" ||
          headCell.label === "Location" ||
          headCell.label === "Campus" ? (
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
              {headCell.id === "no" ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
