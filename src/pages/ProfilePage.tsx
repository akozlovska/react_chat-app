import React from 'react';
import { Box, Grid } from 'theme-ui';
import SideMenu from '../components/SideMenu';
import AnimatedOutlet from '../components/AnimatedOutlet';
import SideBar from '../components/SideBar';

const ProfilePage = () => {
  return (
    <Grid
      as="section"
      sx={{
        gap: 0,
        gridTemplateColumns: 'auto auto 1fr',
        width: '100%',
        gridTemplateRows: 'calc(100vh - 57px)',
      }}
    >
      <SideBar />

      <SideMenu />

      <Box sx={{ overflowY: 'scroll' }}>
        <AnimatedOutlet />
      </Box>
    </Grid>
  );
};

export default ProfilePage;
