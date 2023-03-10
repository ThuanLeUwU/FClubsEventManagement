import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
// import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
// import { Sales } from '../components/dashboard/createEvent';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';
import { Events } from '../components/dashboard/events';
import { CreateEvent } from '../components/dashboard/createEvent';


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
        py: 6
      }}
    >
      
      <Container maxWidth={false}>
      <CreateEvent/>
        <Events/>      
      </Container>
    </Box>
  </>
);


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
