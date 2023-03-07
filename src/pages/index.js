import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import {Events } from '../components/dashboard/events';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';


const Page = () => (
  <>
    <Head>
      <title>
        Dashboard 
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
        <Events />
      </Container>
      {/* <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
         
        Event nhét vô đây
       
        </Grid>
      </Container> */}
    </Box>
  </>
);


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
