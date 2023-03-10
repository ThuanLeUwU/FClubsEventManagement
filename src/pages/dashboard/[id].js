
import { Box, Breadcrumbs, Card, CardContent, CardMedia, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import axios from "axios";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DashboardLayout } from "../../components/dashboard-layout";

function Event() {
    const router = useRouter();
    console.log('router', router);
    const [allUserJoin, setAllUserJoin] = useState([])
    const [eventInfor, setEventInfor] = useState([])
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log('router1111', router.query.id);
            const id = router.query.id
            const responseGetAllUserJoinEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${id}`)

            setAllUserJoin(responseGetAllUserJoinEvent?.data)

            const responseGetClubInfor = await axios.get(`https://event-project.herokuapp.com/api/event/detail/${id}`)
            setEventInfor(responseGetClubInfor?.data)
        }
        fetchData()
    }, [])


    if (allUserJoin == undefined || eventInfor == undefined) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <DashboardLayout>
            <Typography
                sx={{ mb: 3 }}
                variant="h4"
            >
                Account
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '10px' }}>
                <Link as={"/"} href="/">
                    Events
                </Link>

                {eventInfor.map(event => {
                    return (
                        <Typography key={event.event_id}>
                            {event.event_name}
                        </Typography>
                    )
                })}

            </Breadcrumbs>


            <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                {eventInfor.map(event => {
                    const start_date = parseISO(event.start_date);
                    const end_date = parseISO(event.end_date);
                    return (
                        <Card sx={{ display: 'flex' }} key={event.club_id}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={event.img}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" fontSize='50px'>
                                        <Box>{event.event_name}</Box>
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        <Box>Point: 1000</Box>
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        {event.start_date == null ? (
                                            <Box>Check-in: Check-in:  19:00:00, 28/01/2023</Box>
                                        ) : (
                                            <Box>Check-in: {format(start_date, 'dd/MM/yyyy')}</Box>)}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        {event.end_date == null ? (
                                            <Box>Check-out: 22:00:00, 03-03-2023</Box>
                                        ) : (
                                            <Box>Check-out: {format(end_date, 'dd/MM/yyyy')}</Box>)}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        <Box>Location: {event.location}</Box>
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    )
                })}
            </Box>

            <Card sx={{ padding: '30px' }}>
                <Box display='flex' justifyContent='center' textTransform='uppercase' fontSize='40px'>
                    Table of Participants
                </Box>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name of User
                                    </TableCell>
                                    <TableCell>
                                        Department
                                    </TableCell>
                                    <TableCell>
                                        Email
                                    </TableCell>
                                    <TableCell>
                                        Campus
                                    </TableCell>
                                    <TableCell>
                                        Join Date
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUserJoin.map((user) => {
                                    const joinDate = parseISO(user.registration_date)
                                    return (
                                        <TableRow
                                            hover
                                            key={user.id}
                                            selected={selectedCustomerIds.indexOf(user.id) !== -1}
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
                                                        {user.student_name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {user.dpm_name}
                                            </TableCell>
                                            <TableCell>
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                {user.campus_name}
                                            </TableCell>
                                            <TableCell>
                                                {format(joinDate, 'dd/MM/yyyy')}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
            </Card>

        </DashboardLayout>
    )
}

export default Event;