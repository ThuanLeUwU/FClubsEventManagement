
import { Box, Breadcrumbs, Card, CardContent, CardMedia, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

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
    const [clubInfor, setClubInfor] = useState([])
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log('router1111', router.query.id);
            const id = router.query.id
            const responseGetAllUserJoinEvent = await axios.get(`https://event-project.herokuapp.com/api/event/join/${id}`)

            setAllUserJoin(responseGetAllUserJoinEvent?.data)

            const responseGetClubInfor = await axios.get(`https://event-project.herokuapp.com/api/event/detail/${id}`)
            setClubInfor(responseGetClubInfor?.data)
        }
        fetchData()
    }, [])


    if (allUserJoin == undefined || clubInfor == undefined) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <DashboardLayout>
            <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '10px' }}>
                <Link as={"/"} href="/">
                    Events
                </Link>

                {clubInfor.map(club => {
                    return (
                        <Typography key={club.club_id}>
                            {club.name}
                        </Typography>
                    )
                })}

            </Breadcrumbs>

            <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                {clubInfor.map(club => {
                    const start_date = parseISO(club.start_date);
                    const end_date = parseISO(club.end_date);
                    return (
                        <Card sx={{ display: 'flex' }} key={club.club_id}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={club.img}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" fontSize='50px'>
                                        <Box>{club.name}</Box>
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        <Box>Point: {club.point}</Box>
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        <Box>Check-in: {format(start_date, 'dd/MM/yyyy')}</Box>
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        <Box>Check-out: {format(end_date, 'dd/MM/yyyy')}</Box>
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        <Box>Location: {club.location}</Box>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUserJoin.map((user) => {
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