
import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, CircularProgress, TableSortLabel, Stack, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, TableContainer, TablePagination } from "@mui/material";

import axios from "axios";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DashboardLayout } from "../../components/dashboard-layout";
import DeleteIcon from "@mui/icons-material/Delete";
import { Warning } from "@mui/icons-material";
import PropTypes from 'prop-types';

function Event() {
    const router = useRouter();
    const [allUserJoin, setAllUserJoin] = useState([])
    const [eventInfor, setEventInfor] = useState()
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            console.log('router1111', router.query.id);
            const id = router.query.id
            const responseGetAllUserJoinEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${id}`)

            setAllUserJoin(responseGetAllUserJoinEvent?.data)

            const responseGetClubInfor = await axios.get(`https://event-project.herokuapp.com/api/event/detail/${id}`)
            setEventInfor(responseGetClubInfor?.data)
        }
        fetchData()
    }, [])

    //Table
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length + 1.49) : 0;

    if (allUserJoin == undefined || eventInfor == undefined) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    const handleDelete = async () => {
        // const fetchData3 = async () => {
        try {
            await axios.delete(`https://event-project.herokuapp.com/api/event/${eventInfor.event_id}`);

            // //Noti
            const bodyRequestNoti = {
                send_option: "device",
                topic: "",
                title: `Cancel the event!!! ${eventInfor.event_name}`,
                content: "Something bad happened, so we decided to cancel the event"
            };

            await axios.post("https://event-project.herokuapp.com/notifications", bodyRequestNoti);
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
    };

    //Dialog


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <DashboardLayout>


            <Typography
                sx={{ mb: 0, ml: 5 }}
                variant="h4"
            >
                Events
            </Typography>

            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '40px', ml: 5 }}>
                <Link as={"/events"} href="/events">
                    Events
                </Link>
                <Typography >
                    {eventInfor.event_name}
                </Typography>

            </Breadcrumbs>



            <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                <Paper key={eventInfor.club_id} display='flex' elevation={4}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={eventInfor.img}
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Grid container>
                                <Grid item xs={11}>
                                    <Typography component="div" fontSize='50px'>
                                        <Box>{eventInfor.event_name}</Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button
                                        onClick={() => handleClickOpen()}
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
                                </Grid>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle sx={{ backgroundColor: "#ff0000", fontSize: "20px", color: "white" }}>
                                        {" "}
                                        <Warning /> WARNING!!!{" "}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            <Typography>Do you want to Cancel Event: {`${eventInfor.event_name}`} ?</Typography>
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
                                                        ml: '10px'
                                                    },
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Link>
                                    </DialogActions>
                                </Dialog>
                            </Grid>


                            <Typography variant="h6" color="text.secondary" component="div">
                                <Box>Point: 1000</Box>
                            </Typography>
                            <Typography variant="h6" color="text.secondary" component="div">
                                {eventInfor.start_date == null ? (
                                    <Box>Check-in: Check-in:  19:00:00, 28/01/2023</Box>
                                ) : (
                                    <Box>Check-in: {format(parseISO(eventInfor.start_date), 'dd/MM/yyyy')}</Box>)}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" component="div">
                                {eventInfor.end_date == null ? (
                                    <Box>Check-out: 22:00:00, 03-03-2023</Box>
                                ) : (
                                    <Box>Check-out: {format(parseISO(eventInfor.end_date), 'dd/MM/yyyy')}</Box>)}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" component="div">
                                <Box>Location: {eventInfor.location}</Box>
                            </Typography>

                      
                        </CardContent>
                    </Box>
                </Paper>
            </Box >

            <Card sx={{ padding: '30px' }}>
                <Box display='flex' justifyContent='center' textTransform='uppercase' fontSize='40px'>
                    Table of Participants
                </Box>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
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
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={user.student_id}
                                            >
                                                <TableCell

                                                    component="th"
                                                    scope="row"
                                                    padding="normal"
                                                >
                                                    {user.student_name}
                                                </TableCell>
                                                <TableCell align="left">{user.email}</TableCell>
                                                <TableCell align="left">{user.dpm_name}</TableCell>
                                                <TableCell align="left">{user.campus_name}</TableCell>
                                                {user.registration_date === null ? (
                                                    <TableCell align="right">22/02/2023</TableCell>
                                                ) : (
                                                    <TableCell align="right">
                                                        {format(joinDate, 'dd/MM/yyyy')}
                                                    </TableCell>
                                                )}

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

        </DashboardLayout >
    )
}


function descendingComparator(a, b, orderBy) {
    if (orderBy === 'name') {
        return compareStrings(a.student_name, b.student_name);
    }
    if (orderBy === 'joinDate') {
        const dateA = new Date(a.registration_date);
        const dateB = new Date(b.registration_date);
        return dateA.getTime() - dateB.getTime();
    }
    if (orderBy === 'department') {
        return compareStrings(a.dpm_name, b.dpm_name);
    }
    if (orderBy === 'campus') {
        return compareStrings(a.campus_name, b.campus_name);
    }


    return 0;
}



function getComparator(order, orderBy) {
    return order === 'desc'
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
        id: 'name',
        numeric: false,
        label: 'Name of User',
    },
    {
        id: 'email',
        numeric: false,
        label: 'Email',
    },
    {
        id: 'department',
        numeric: false,
        label: 'Department',
    },
    {
        id: 'campus',
        numeric: false,
        label: 'Campus',
    },
    {
        id: 'joinDate',
        numeric: true,
        label: 'Join Date',
    },
];


EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    headCell.label === 'Remove' ? (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding='normal'
                        >
                            <Table>
                                {headCell.label}
                            </Table>
                        </TableCell>
                    ) : (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding='normal'
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    )

                ))}
            </TableRow>
        </TableHead>
    );
}

export default Event;