import React from 'react';
import { Box, Grid } from 'theme-ui';
import SideMenu from '../components/SideMenu';
import AnimatedOutlet from '../components/AnimatedOutlet';
import SideBar from '../components/SideBar';
import AnimatedLayout from '../components/AnimatedLayout';
import { ErrorBoundary } from 'react-error-boundary';
import OutletErrorFallback from '../components/OutletErrorFallback';

const ProfilePage = () => {
  return (
    <AnimatedLayout>
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

        <ErrorBoundary fallback={<OutletErrorFallback />}>
          <Box sx={{ overflowY: 'scroll' }}>
            <AnimatedOutlet />
          </Box>
        </ErrorBoundary>
      </Grid>
    </AnimatedLayout>
  );
};

export default ProfilePage;
