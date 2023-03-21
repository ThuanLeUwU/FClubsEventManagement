
import { Box, Breadcrumbs, Button, Card, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from "@mui/material";


import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { format, parseISO, compareAsc  } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import react, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";

function Club() {
    const router = useRouter();
    const [allUserJoin, setAllUserJoin] = useState([])
    const [clubInf, setClubInfor] = useState([])
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [userChoice, setUserChoice] = useState(null);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    useEffect(() => {
        const fetchData = async () => {
            const id = router.query.id
            const responseGetAllUserJoinClub = await axios.get(`https://event-project.herokuapp.com/api/club/member?club_id=${id}`)
            setAllUserJoin(responseGetAllUserJoinClub?.data)
            setUserChoice(responseGetAllUserJoinClub?.data[0])
            const responseGetClubInfor = await axios.get(`https://event-project.herokuapp.com/api/club/detail/${id}`)
            setClubInfor(responseGetClubInfor?.data)
        }
        fetchData()
    }, [])

    const handleDelete = async () => {
        console.log(userChoice);
        try {
            await axios.delete(`https://event-project.herokuapp.com/api/club/member/${userChoice.student_id}?club_id=${router.query.id}`)
            const id = router.query.id

            const responseGetAllUserJoinClub = await axios.get(`https://event-project.herokuapp.com/api/club/member?club_id=${id}`)
            setAllUserJoin(responseGetAllUserJoinClub?.data)
            setUserChoice(responseGetAllUserJoinClub?.data[0])

        } catch (error) {
            console.log(error)
        }
        setOpen(false)
    }




    //Dialog
    const [open, setOpen] = useState(false);


    const handleClickOpen = (user) => {
        console.log(user);
        setUserChoice(user)
        console.log(clubInf);

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    if (allUserJoin == undefined || clubInf == undefined) {
        return (
            <DashboardLayout>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: '500px' }}>
                    <CircularProgress />
                </div>
            </DashboardLayout>
        )
    }

    //test
    
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

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length + 1.49) : 0;






    return (
        <DashboardLayout>
            <Typography
                sx={{ mb: 0, ml: 5 }}
                variant="h4"
            >
                Clubs
            </Typography>

            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '40px', ml: 5 }}>
                <Link as={"/clubs"} href="/clubs">
                    Clubs
                </Link>
                <Typography>
                    {clubInf.club_name}
                </Typography>
            </Breadcrumbs>
            <Paper elevation={4} sx={{ p: 4, margin: '40px' }}>
                <Typography fontSize='30px'>Name: {clubInf.club_name}</Typography>
                <Typography fontSize='20px'>Abbreviation: {clubInf.abbreviation}</Typography>
                {clubInf.established_date == null ? (
                    <>
                        22/01/2020
                    </>
                ) : (
                    <Typography fontSize='20px'>Established Date: {format(parseISO(clubInf.established_date), 'dd/MM/yyyy')}</Typography>
                )}

            </Paper>

            <Card sx={{ padding: '30px' }}>
                <Box display='flex' justifyContent='center' textTransform='uppercase' fontSize='40px'>
                    Table of Members
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
                                            const joinDate = parseISO(user.join_date);
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
                                                    <TableCell align="left">{user.phone}</TableCell>
                                                    <TableCell align="right">{format(joinDate, 'dd/MM/yyyy')}</TableCell>
                                                    <TableCell align="right">
                                                        <Button onClick={() => handleClickOpen(user)}
                                                            sx={{
                                                                backgroundColor: '#ff0000', color: 'white', margin: '1px', ':hover': {
                                                                    backgroundColor: 'white',
                                                                    color: '#ff0000',
                                                                    border: '1px solid #ff0000',
                                                                    margin: '0px'
                                                                }
                                                            }} >
                                                            <DeleteIcon />
                                                        </Button>
                                                    </TableCell>
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
    )
}


function descendingComparator(a, b, orderBy) {
    if (orderBy === 'name') {
        return compareStrings(a.student_name, b.student_name);
    }
    if(orderBy === 'joinDate'){
            const dateA = new Date(a.join_date);
            const dateB = new Date(b.join_date);
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
        id: 'phone',
        numeric: false,
        label: 'Phone',
    },
    {
        id: 'joinDate',
        numeric: true,
        label: 'JoinDate',
    },
    {
        id: 'Remove',
        numeric: true,
        label: 'Remove',
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


export default Club;