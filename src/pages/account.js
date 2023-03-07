import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/auth-context';
import axios from 'axios';

const Page = () => {
  const { user } = useAuthContext();
  const [userInf, setUserInf] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`https://event-project.herokuapp.com/api/student/${user.id}`)
        setUserInf(response?.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {userInf.map(user => {
        return (
          <div key={user.name}>
            <Head>
              <title>
                Account
              </title>
            </Head>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8
              }}
            >
              <Container maxWidth="lg">
                <Typography
                  sx={{ mb: 3 }}
                  variant="h4"
                >
                  Account
                </Typography>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <AccountProfile user={user} />
                  </Grid>
                  <Grid
                    item
                    lg={8}
                    md={6}
                    xs={12}
                  >
                    <AccountProfileDetails userInf={user} />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </div>
        )
      })}



    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
