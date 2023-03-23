import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Typography, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { AccountPopover } from './account-popover';
import { authFirebase } from '../firebase/firebase';
import { useAuthContext } from '../contexts/auth-context';
import { FlutterDashTwoTone } from '@mui/icons-material';
import { async } from '@firebase/util';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import StarsIcon from '@mui/icons-material/Stars';
const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const [point, setPoint] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`https://event-project.herokuapp.com/api/student/${user.id}/point`)
        setPoint(response?.data)
        console.log(response?.data);
      }
      fetchData()
    } catch (error) {
      console.log(error);
    }

  }, [])

  if (user === undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress />
      </div>
    )
  }


  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title={point !== undefined && `${point.semester}`}>
            <IconButton sx={{ ml: 1 }}>
              <SchoolIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {user.role !== 'admin' && (
            <Tooltip title="Point">
              <IconButton sx={{ ml: 1 }} >
                <StarsIcon fontSize="small" />
                {point !== undefined ? `${point.point}` : '0'}
              </IconButton>
            </Tooltip>)}


          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1
            }}
            src={authFirebase.currentUser.photoURL}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        username={authFirebase.currentUser.displayName}
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
