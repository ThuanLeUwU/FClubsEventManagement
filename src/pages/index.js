import { Box, Card, Container } from "@mui/material";
import Head from "next/head";
// import { Budget } from '../components/dashboard/budget';
import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { Events } from "../components/dashboard/events";
import { useAuthContext } from "../contexts/auth-context";
import { CreateEvent } from "../components/dashboard/createEvent";
import { Button } from "antd";

const Page = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const responseEvent = await axios(`https://event-project.herokuapp.com/api/event/${user.campus}?status=0`)
        const responseEvent = await axios.get(
          `https://event-project.herokuapp.com/api/event/1?status=0`
        );

        setEvents(responseEvent?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  console.log("fetch", events);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" 
            onClick={() => setVisible(true)}>
              Create Events
            </Button>
          </div>
          <CreateEvent
            visible={visible}
            setVisible={setVisible}
            onCancel={() => {
              setVisible(false);
            }}
            // onCancel={() => {
            //   setVisible(false);
            //   setProductDetail(undefined);
            // }}
            // productDetail={productDetail}
            isEdit={true}
          />
          {events.map((event) => (
            <div key={event.event_id}>
              <Events event={event} />
            </div>
          ))}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
