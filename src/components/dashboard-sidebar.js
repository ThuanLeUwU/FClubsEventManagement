import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { useAuthContext } from '../contexts/auth-context';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Image } from '@mui/icons-material';
import Link from 'next/link';
// import { Image } from 'antd';
const items = [
  {
    href: '/',
    icon: (<DashboardIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/events',
    icon: (<EventIcon fontSize="small" />),
    title: 'Event'
  },
  {
    href: '/clubs',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Clubs'
  },
  {
    href: '/adminpage',
    icon: (<AdminPanelSettingsIcon fontSize="small" />),
    title: 'Admin '
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/plan',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Plan'
  }
  // {
  //   href: '/payment',
  //   icon: (<ChartBarIcon fontSize="small" />),
  //   title: 'Payment'
  // }
];

export const DashboardSidebar = (props) => {
  const { user } = useAuthContext();
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />


        <Box sx={{ flexGrow: 1 }}>
          {items.map((item,index) => (
            <div key={index}>
              {item.title == 'Admin ' || item.title == 'Plan' || item.title == "Payment" ? (
                <>
                  {user.role == 'admin' ? (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      href={item.href}
                      title={item.title}
                    />
                  ) : (<></>)}
                </>
              ) : (
                <NavItem
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                />)}

            </div>
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>

      <Button href='/'>
              <img src="https://fap.fpt.edu.vn/images/play-store.png" 
              width={200}  /> 
      </Button>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
