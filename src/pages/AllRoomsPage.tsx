import React from 'react';
import { Box, Heading } from 'theme-ui';
import AnimatedLayout from '../components/AnimatedLayout';
import AnimatedSlideLeft from '../components/AnimatedSlideLeft';
import AvailableRoomsList from '../components/RoomLists/AvailableRoomsList';
import SuspenseWrapper from '../components/SuspenseWrapper';

const AllRoomsPage = () => {
  return (
    <AnimatedLayout>
      <Box sx={{ px: 4, pb: 4 }}>
        <AnimatedSlideLeft order={1}>
          <Heading py={4} sx={{ textAlign: 'center' }}>
            Available Rooms
          </Heading>
        </AnimatedSlideLeft>

        <SuspenseWrapper>
          <AvailableRoomsList />
        </SuspenseWrapper>
      </Box>
    </AnimatedLayout>
  );
};

export default AllRoomsPage;
