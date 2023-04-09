import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  Box,
  List,
  Drawer,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Toolbar,
  Button,
  AppBar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../shared/components/Logo';
import { getLinks } from '../constants/menuLinks';
import useStyles from '../useStyles';
import { signOut } from '../api/auth.api';
import useUserStore from '../storage/useUserStore';
import UserAvatar from '../shared/components/UserAvatar';

import logoSizes from '../shared/constants/logo-sizes.constants';

import { UserStore } from '../shared/interfaces';

export default function Main() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useUserStore((state: UserStore) => state.user);
  const drawerWidth = 240;
  const styles = useStyles();
  const links = getLinks();

  const handleLogOut = () => {
    signOut();
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <>
      <Box
        className={styles.myBox}
        sx={{ my: 3 }}
      >
        <Logo size={logoSizes.md} />
        <Link to="profile" style={{ textDecoration: 'none' }}>
          <UserAvatar
            src={user?.avatar}
            name={user?.name}
            sx={{
              mt: 4,
            }}
          />
        </Link>
      </Box>
      <List>
        {links
          ? links.map(({
            linkURL, listText, linkId, isDisabled,
          }) => (
            <Link to={!isDisabled ? linkURL : '#'} key={linkId} className={`${styles.link}`}>
              <ListItemButton disabled={isDisabled}>
                <ListItem disablePadding>
                  <ListItemIcon />
                  <ListItemText primary={listText} />
                </ListItem>
              </ListItemButton>
            </Link>
          ))
          : null}
        {
          <Link to="/signin" key="logout" className={styles.link}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogOut}>
                <ListItemIcon />
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </Link>
        }
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{
          width: '100%',
          height: '60px',
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Logo size={logoSizes.md} />
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { md: drawerWidth } },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        position="relative"
        width="100%"
        px={{ xs: 4, sm: 5, md: 8 }}
        pt={{ xs: 10, md: 6 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
