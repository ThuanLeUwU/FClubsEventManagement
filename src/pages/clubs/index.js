import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useAuthContext } from '../../contexts/auth-context';
import PropTypes from 'prop-types';
import {
  Box, Button, Card, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table,
  TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Typography
} from '@mui/material';



import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { width } from '@mui/system';
const Page = () => {
  const { user } = useAuthContext();
  const [campus, setCampus] = useState([]);
  const [selected, setSelected] = useState(user ? (user.campus) : 1);
  const [club, setClubs] = useState();
  const [allClubThatUserJoin, setAllClubThatUserJoin] = useState([]);
  const [clubChoise, setClubChoise] = useState();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const headers = {
          'Authorization': 'Bearer ' + getCookie('accessToken')
        }

        const responseAllCampus = await axios.get(`https://evenu.herokuapp.com/api/campus`, {
          headers
        })

        setCampus(responseAllCampus?.data)

        if (user.role == 'members') {
          const responseGetAllClubThatUserJoin = await axios.get(`https://evenu.herokuapp.com/api/club/student/${user.id}`)
          setAllClubThatUserJoin(responseGetAllClubThatUserJoin?.data)
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])


  useEffect(() => {
    console.log('select');
    const fetchData = async () => {
      const response = await axios.get(`https://evenu.herokuapp.com/api/club/campus/${selected}`)
      setClubs(response?.data)
    }
    fetchData()
  }, [selected])

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleJoin = async () => {
    const currentTime = new Date();
    try {
      const requestBody = {
        student_id: user.id,
        club_id: clubChoise,
        role: 'MEMBER',
        join_date: currentTime.toISOString()
      }
      await axios.post('https://evenu.herokuapp.com/api/club/member', requestBody)

      const response = await axios.get(`https://evenu.herokuapp.com/api/club/campus/${selected}`)
      setClubs(response?.data)

      const responseGetAllClubThatUserJoin = await axios.get(`https://evenu.herokuapp.com/api/club/student/${user.id}`);
      setAllClubThatUserJoin(responseGetAllClubThatUserJoin?.data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    setSelected(event.target.value);

  }

  //Dialog
  const [open, setOpen] = useState(false);


  const handleClickOpen = (club) => {
    setClubChoise(club.club_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //test
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selectedPage, setSelectedPage] = useState([]);
  const [page, setPage] = useState(0);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - club.length + 1.49) : 0;

  if (club == undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>
          Clubs
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Box >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
              }}
            >
              <Typography
                sx={{ m: 1 }}
                variant="h4"
              >
                Clubs
              </Typography>
              <Box sx={{ m: 1, paddingRight: '10px' }}>

                <FormControl>
                  <InputLabel id="select-label">Campus</InputLabel>
                  <Select value={selected} defaultValue={selected} onChange={handleChange} labelId="select-label">
                    {campus.map(option => (
                      <MenuItem key={option.campus_id} value={option.campus_id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

          </Box>


          <Box sx={{ mt: 3 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={'medium'}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  <TableBody>
                    {stableSort(club, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((club, index) => {
                        const establishDate = parseISO(club.established_date);
                        const num = page * rowsPerPage + index + 1;
                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell><Typography variant='body1'>{num}</Typography>  </TableCell>
                            <TableCell>
                              <Box height={120} width={120}>
                                <Tooltip followCursor arrow title={
                                  <img src={club.img} height={200} width={200} />
                                }>
                                  <img src={club.img} height={110} width={110} style={{ borderRadius: '50%' }} />
                                </Tooltip>
                              </Box>
                            </TableCell>
                            <TableCell align="left"><Typography variant='body1'>{club.name}</Typography></TableCell>
                            <TableCell align="left"><Typography variant='body1'>{club.abbreviation}</Typography></TableCell>
                            <TableCell align="right"><Typography variant='body1'>{format(establishDate, 'dd/MM/yyyy')}</Typography></TableCell>
                            <TableCell align="right">  <Typography variant='body1'>{club.totalMembers}</Typography></TableCell>

                            {user.role == 'admin' ? (
                              <TableCell align='right'>
                                <Link href={`clubs/${club.club_id}`} passHref>
                                  <Button sx={{
                                    backgroundColor: '#0e6ae9', color: 'white', margin: '1px', ':hover': {
                                      backgroundColor: 'white',
                                      color: '#0e6ae9',
                                      border: '1px solid #0e6ae9',
                                      margin: '0px'
                                    }
                                  }} >
                                    More
                                  </Button>
                                </Link>
                              </TableCell>
                            ) : (
                              <TableCell align='right'>
                                {club.campus_id == user.campus ? (
                                  <>
                                    {allClubThatUserJoin.find(thisClub => thisClub.club_id === club.club_id) ? (
                                      <Button disabled >
                                        Joined
                                      </Button>
                                    ) : (
                                      <>
                                        <Button onClick={() => handleClickOpen(club)}
                                          sx={{
                                            backgroundColor: 'white', color: '#0e6ae9', border: '1px solid #0e6ae9', ':hover': {
                                              backgroundColor: '#0e6ae9',
                                              color: 'white',
                                            }
                                          }}>
                                          Join
                                        </Button>
                                        <Dialog
                                          open={open}
                                          onClose={handleClose}
                                          aria-describedby="alert-dialog-slide-description"
                                        >
                                          <DialogTitle sx={{ backgroundColor: '#0e6ae9', fontSize: '20px', color: 'white' }}>Do you want to join Club: {`${club.name}`}?</DialogTitle>
                                          <DialogContent>
                                          </DialogContent>
                                          <DialogActions>
                                            <Typography onClick={handleClose} sx={{
                                              marginRight: '12px', cursor: 'pointer', ':hover': {
                                                'textDecoration': 'underline'
                                              }
                                            }}>cancel</Typography>

                                            <Button onClick={() => handleJoin(club.club_id)} sx={{
                                              backgroundColor: '#0e6ae9', color: 'white', margin: '1px', ':hover': {
                                                backgroundColor: 'white',
                                                color: '#0e6ae9',
                                                border: '1px solid #0e6ae9',
                                                margin: '0px'
                                              }
                                            }}><a onClick={() => setClubChoise(club)}>Confirm</a></Button>
                                          </DialogActions>
                                        </Dialog>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <Button disabled>
                                    CAN&apos;T Join
                                  </Button>
                                )}

                              </TableCell>)}
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={club.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Container>
      </Box >
    </>)
};



function descendingComparator(a, b, orderBy) {
  if (orderBy === 'name') {
    return compareStrings(a.name, b.name);
  }

  if (orderBy === 'establishDate') {
    const dateA = new Date(a.establishDate);
    const dateB = new Date(b.establishDate);
    return dateA.getTime() - dateB.getTime();
  }
  if(orderBy === 'total'){
    return compareInts(a.totalMembers, b.totalMembers)
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

function compareInts(a, b) {
  return a - b;
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
    id: 'no',
    numeric: false,
    label: 'No.',
  },
  {
    id: 'img',
    numeric: false,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Name of Club',
  },
  {
    id: 'abbreviation',
    numeric: false,
    label: 'Abbreviation',
  },
  {
    id: 'establishDate',
    numeric: true,
    label: 'Establish Day',
  },
  {
    id: 'total',
    numeric: true,
    label: 'Total',
  },
  {
    id: 'information',
    numeric: true,
    label: 'Information',
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
          headCell.label === 'No.' || headCell.label === 'Information' || headCell.label === 'Email' || headCell.label === 'Image' ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding='normal'
            >
    
                <Typography variant='h6'>
                  {headCell.label}
                </Typography>

        
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
                <Typography variant='h6'>   {headCell.label}</Typography>

              </TableSortLabel>
            </TableCell>
          )
        ))}
      </TableRow>
    </TableHead>
  );
}




Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
