
import { Box, Breadcrumbs, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";


import axios from "axios";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DashboardLayout } from "../../components/dashboard-layout";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { async } from "@firebase/util";

function Club() {
    const router = useRouter();
    const [allUserJoin, setAllUserJoin] = useState([])
    const [clubInf, setClubInfor] = useState([])
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [userChoice, setUserChoice] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const id = router.query.id
            const responseGetAllUserJoinClub = await axios.get(`https://event-project.herokuapp.com/api/club/member?club_id=${id}`)
            setAllUserJoin(responseGetAllUserJoinClub?.data)
            setUserChoice(responseGetAllUserJoinClub?.data[0])
            const responseGetClubInfor = await axios.get(`https://event-project.herokuapp.com/api/club/detail/${id}`)
            setClubInfor(responseGetClubInfor?.data)
        }
        fetchData()
    }, [])

    const handleDelete = async () => {
        console.log(userChoice);
        try {
            const bodyRequest = {
                club_id: clubInf.id
            }
            await axios.delete(`https://event-project.herokuapp.com/api/${userChoice.student_id}`, bodyRequest)
            const id = router.query.id
            const responseGetAllUserJoinClub = await axios.get(`https://event-project.herokuapp.com/api/club/member?club_id=${id}`)
            setAllUserJoin(responseGetAllUserJoinClub?.data)
            setUserChoice(responseGetAllUserJoinClub?.data[0])

        } catch (error) {
            console.log(error)
        }
        setOpen(false)
    }


    //Dialog
    const [open, setOpen] = useState(false);


    const handleClickOpen = (user) => {
        console.log(user);
        setUserChoice(user)
        console.log(clubInf);

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    if (allUserJoin == undefined || clubInf == undefined) {
        return (
            <DashboardLayout>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', marginTop: '500px' }}>
                    <CircularProgress />
                </div>
            </DashboardLayout>

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
                                    <TableCell>
                                        Remove
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUserJoin.map((user, count) => {
                                    const joinDate = parseISO(user.join_date)
                                    return (
                                        <TableRow
                                            hover
                                            key={count}
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
                                            {user.join_date === null ? (<TableCell>12/03/2022</TableCell>) : (
                                                <TableCell>
                                                    {format(joinDate, 'dd/MM/yyyy')}
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                <Button onClick={() => handleClickOpen(user)}
                                                    sx={{
                                                        backgroundColor: '#ff0000', color: 'white', margin: '1px', ':hover': {
                                                            backgroundColor: 'white',
                                                            color: '#ff0000',
                                                            border: '1px solid #ff0000',
                                                            margin: '0px'
                                                        }
                                                    }} >
                                                    <DeleteIcon />
                                                </Button>

                                            </TableCell>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-describedby="alert-dialog-slide-description"
                                            >
                                                <DialogTitle sx={{ backgroundColor: '#ff0000', fontSize: '20px', color: 'white' }}> <WarningAmberIcon /> WARNING!!! </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        <Typography>
                                                            Do you want to REMOVE user:  {`${userChoice.student_name}`}  out of Club {`${clubInf.club_name}`}?
                                                        </Typography>

                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Typography onClick={handleClose} sx={{
                                                        marginRight: '12px', cursor: 'pointer', ':hover': {
                                                            'textDecoration': 'underline'
                                                        }
                                                    }}>cancel</Typography>

                                                    <Button onClick={() => handleDelete(clubInf.club_id)} sx={{
                                                        backgroundColor: '#ff0000', color: 'white', margin: '1px', ':hover': {
                                                            backgroundColor: 'white',
                                                            color: '#ff0000',
                                                            border: '1px solid #ff0000',
                                                            margin: '0px'
                                                        }
                                                    }}>Remove</Button>
                                                </DialogActions>
                                            </Dialog>
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