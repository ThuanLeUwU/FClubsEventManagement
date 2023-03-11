import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow , Typography} from '@mui/material';
import Head from 'next/head';
// import { Budget } from '../components/dashboard/budget';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { useAuthContext } from '../contexts/auth-context';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import { getCookie } from 'cookies-next';
const Page = () => {

  const { user } = useAuthContext();
  const [allUser, setAllUser] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  // if (!user.role == 'admin') {
  //   const router = useRouter();
  //   router.replace({
  //     pathname: '/',
  //     query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
  //   })
  //     .catch(console.error)
  // }

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
        <h1>Loading...</h1>
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
          py: 8
        }}
      >
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Name of User
                    </TableCell>
                    <TableCell>
                      Email
                    </TableCell>
                    <TableCell>
                      Phone
                    </TableCell>
                    <TableCell>
                      Address
                    </TableCell>
                    <TableCell>
                      Role
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUser.map((user) => {

                    return (
                      <TableRow
                        hover
                        key={user.student_id}
                        selected={selectedCustomerIds.indexOf(user.student_id) !== -1}
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
                              {user.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {user.email}
                        </TableCell>
                        <TableCell>
                          {user.phone}
                        </TableCell>
                        <TableCell>
                          {user.address}
                        </TableCell>

                        {user.role == null ? (
                          <TableCell>members</TableCell>
                        ) : (
                          <TableCell>{`${user.role}`}</TableCell>
                        )}
                      </TableRow>

                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
      </Box>
    </>
  )
}




Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
