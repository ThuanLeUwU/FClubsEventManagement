import { Box, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Head from "next/head";

import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Events } from "../../components/dashboard/events";
import { useAuthContext } from "../../contexts/auth-context";
import { Button } from "antd";
import { CreateEvent } from "../../components/dashboard/createEvent";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { campus } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(1);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseEvent = await axios.get(
          `https://event-project.herokuapp.com/api/event/${selected}?status=1&is_approved=1`
        );

        console.log("response nè", responseEvent);
        setEvents(responseEvent?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [selected]);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <DashboardLayout>
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
          <div style={{ display: "block"}}>
            <div style={{ m: 1, paddingRight: "10px", position: "absolute",justifyContent: "start", top: "60px"}}>
              <Button type="primary" onClick={() => setVisible(true)}>
                Create Event
              </Button>
            </div>
            <CreateEvent
              visible={visible}
              setVisible={setVisible}
              onCancel={() => {
                setVisible(false);
              }}
              setCount={setCount}
              count={count}
              isEdit={true}
            />

            <Box sx={{ m: 1, paddingRight: "10px", position: "fixed", right: "0px", top: "80px" }}>
              <FormControl>
                <InputLabel id="select-label">Campus</InputLabel>
                <Select
                  value={selected}
                  defaultValue={selected}
                  onChange={handleChange}
                  labelId="select-label"
                >
                  {campus.map((option) => (
                    <MenuItem key={option.campus_id} value={option.campus_id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <Box width="90%">
            {events.map((event) => (
              <div key={event.event_id}>
                <Events event={event} />
              </div>
            ))}
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
