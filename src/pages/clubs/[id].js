
import { Box, Breadcrumbs, Card, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import axios from "axios";
import { format, parse, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DashboardLayout } from "../../components/dashboard-layout";

function Club() {
    const router = useRouter();
    console.log('router', router);
    const [allUserJoin, setAllUserJoin] = useState([])
    const [clubInf, setClubInfor] = useState()
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const id = router.query.id
            const responseGetAllUserJoinClub = await axios.get(`https://event-project.herokuapp.com/api/club/member?club_id=${id}`)
            setAllUserJoin(responseGetAllUserJoinClub?.data)

            const responseGetClubInfor = await axios.get(`https://event-project.herokuapp.com/api/club/detail/${id}`)
            setClubInfor(responseGetClubInfor?.data)
        }
        fetchData()
    }, [])


    if (allUserJoin == undefined || clubInf == undefined) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop:'500px' }}>
                <CircularProgress />
            </div>
        )
    }
    return (
        <DashboardLayout>
            <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '10px' }}>
                <Link as={"/clubs"} href="/clubs">
                    Clubs
                </Link>
                <Typography>
                    {clubInf.club_name}
                </Typography>
            </Breadcrumbs>
            <Box sx={{ marginBottom: '30px', marginLeft: '40px' }}>
                <Typography fontSize='30px'>Name: {clubInf.club_name}</Typography>
                <Typography fontSize='20px'>Abbreviation: {clubInf.abbreviation}</Typography>
                {clubInf.established_date == null ? (
                    <>
                        22/01/2020
                    </>
                ) : (
                    <Typography fontSize='20px'>Established Date: {format(parseISO(clubInf.established_date), 'dd/MM/yyyy')}</Typography>
                )}

            </Box>
            <Card sx={{ padding: '30px' }}>
                <Box display='flex' justifyContent='center' textTransform='uppercase' fontSize='40px'>
                    Table of Members
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
                                        Email
                                    </TableCell>
                                    <TableCell>
                                        Phone
                                    </TableCell>
                                    <TableCell>
                                        Join Date
                                    </TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUserJoin.map((user) => {
                                    const joinDate = parseISO(user.join_date)
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
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                {user.phone}
                                            </TableCell>
                                            {user.join_date === null ? (<>12/03/2022</>) : (
                                                <TableCell>
                                                    {format(joinDate, 'dd/MM/yyyy')}
                                                </TableCell>
                                            )}

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

export default Club;