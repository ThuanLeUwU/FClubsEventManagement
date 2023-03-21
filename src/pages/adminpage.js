import { Box, Card, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, Button } from '@mui/material';
import Head from 'next/head';
// import { Budget } from '../components/dashboard/budget';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { useAuthContext } from '../contexts/auth-context';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
const Page = () => {
  const { user } = useAuthContext();
  const [allUser, setAllUser] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUser.length + 0.11) : 0;

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        'Authorization': 'Bearer ' + getCookie('accessToken')
      }
      const response = await axios.get(`https://event-project.herokuapp.com/api/students`, {
        headers
      })
      setAllUser(response?.data)
    }
    fetchData()
  }, [])



  if (allUser == []) {
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
          Admin
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          p: 9
        }}
      >
        <Card>
          <Box display='flex' justifyContent='center'>
            <Typography textTransform='uppercase' variant='h3'> Table Of all user</Typography>
          </Box>


          <Paper sx={{ width: '100%' }}>
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
                  {stableSort(allUser, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {

                      const birthDate = parseISO(user.birthday);
                      const num = page * rowsPerPage + index + 1;
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell>{num}
                          </TableCell>
                          {/* <TableCell>
                          <div className="image">
                            <img width="40px" height="60px" src={`${event.img}`} alt="" />
                          </div>
                        </TableCell> */}
                          <TableCell align="left">{user.name}</TableCell>
                          <TableCell align="left">{user.email}</TableCell>
                          <TableCell align="left">{user.phone}</TableCell>


                          {user.birthday === null ? (
                            <TableCell align="right">20/03/2001</TableCell>
                          ) : (
                            <TableCell align="right">
                              {format(birthDate, 'dd/MM/yyyy')}
                            </TableCell>
                          )}

                          <TableCell align="right">{user.address}</TableCell>
                          <TableCell align="right">{user.role === 'admin' ? 'admin' : 'member'} </TableCell>
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
              display='flex'
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={allUser.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      </Box>
    </>
  )
}


function descendingComparator(a, b, orderBy) {
  if (orderBy === 'name') {
    return compareStrings(a.name, b.name);
  }

  if (orderBy === 'birthday') {
    if(a.birthDate === null){
      a.birthDate = '20/3/2001'
    }
    if(b.birthDate === null){
      b.birthDate = '20/3/2001'
    }
    const dateA = new Date(a.birthday);
    const dateB = new Date(b.birthday);
    return dateA.getTime() - dateB.getTime();
  }
  // if (b[orderBy] < a[orderBy]) {
  //   return -1;
  // }
  // if (b[orderBy] > a[orderBy]) {
  //   return 1;
  // }

  return 0;
}




function getComparator(order, orderBy) {
  if (orderBy === 'no') {
    return (a, b) => {
      return order === 'desc' ? b.no - a.no : a.no - b.no;
    };
  }
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
    id: 'no',
    numeric: false,
    label: 'No.',
  },
  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email Contact',
  },
  {
    id: 'phone',
    numeric: false,
    label: 'Phone',
  },
  {
    id: 'birthday',
    numeric: true,
    label: 'Birth Day',
  },
  {
    id: 'address',
    numeric: true,
    label: 'Address',
  },
  {
    id: 'role',
    numeric: true,
    label: 'Role',
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

  //Table


  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          headCell.label === 'Phone' || headCell.label === 'Address' || headCell.label === 'Role' || headCell.label === 'Email Contact' ? (
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
              {headCell.id === 'no' ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
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
