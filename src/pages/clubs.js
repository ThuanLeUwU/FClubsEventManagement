import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { async } from '@firebase/util';
import axiosWrapper from '../utils/axiosWrapper';
import { head } from 'lodash';
import { useAuthContext } from '../contexts/auth-context';
import { getCookie } from 'cookies-next';
import { authFirebase } from '../firebase/firebase';
import { format, parseISO } from 'date-fns';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Avatar,
  
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Button } from 'antd';
const Page = () => {
  const [club, setClubs] = useState([]);
  const [campus, setCampus] = useState();
  const [selected, setSelected] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    console.log(getCookie('accessToken'));
    const fetchData = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + getCookie('accessToken')
      }
      try {
        const response = await axios.get(`https://event-project.herokuapp.com/api/campus`, {
          headers
        })

        // const response = await axios(`https://event-project.herokuapp.com/api/club/1`
        // ).then(response => {
        //   setClubs(response?.data)
        // }).catch(error => {
        //   console.log(error);
        // })

        setCampus(response?.data?.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()
  }, [])

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleJoin = (event) =>{

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
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Club Name
                        </TableCell>
                        <TableCell>
                          Abbreviation
                        </TableCell>
                        <TableCell>
                          Established Date
                        </TableCell>
                        <TableCell>
                          Total Members
                        </TableCell>
                        {user.role == 'admin' ? (<></>): (
                        <TableCell>
                          Status
                        </TableCell>)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {club.map((club) => {
                        const date =  parseISO(club.established_date)
                        return( 
                           <TableRow
                          hover
                          key={club.name}
                          selected={selectedCustomerIds.indexOf(club.id) !== -1}
                        >
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex'
                              }}
                            >
                              <Typography
                                color="textPrimary"
                                variant="body1"
                              >
                                {club.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {club.abbreviation}
                          </TableCell>
                          <TableCell>
                            
                           {format(date, 'dd/MM/yyyy')}
                           
                          </TableCell>
                          <TableCell sx={{textAlign: 'center'}}>
                            {club.totalMembers}
                          </TableCell>
                          {user.role == 'admin' ? (<></>): (
                          <TableCell>
                           <Button onClick={handleJoin()}>  
                            Take part in
                           </Button>
                          </TableCell>)}
                        </TableRow>
                          
                        )
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              {/* <TablePagination
                component="div"
                count={club.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              /> */}
            </Card>
          </Box>
        </Container>
      </Box>
    </>)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
