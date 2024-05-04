import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Flex, Heading } from 'theme-ui';
import { sideMenuAnimation } from '../utils/animations';
import UserRoomsList from './RoomLists/UserRoomsList';
import DirectsList from './RoomLists/DirectsList';
import { useParams } from 'react-router-dom';
import SuspenseWrapper from './SuspenseWrapper';

const SideMenu = () => {
  const [listShown, setListShown] = useState<'rooms' | 'directs'>('rooms');
  const { roomId, directId } = useParams();

  useEffect(() => {
    if (roomId) {
      setListShown('rooms');
    } else if (directId) {
      setListShown('directs');
    }
  }, [roomId, directId]);

  return (
    <AnimatePresence>
      <motion.div
        key="sideMenu"
        variants={sideMenuAnimation}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, type: 'easeInOut' }}
      >
        <Box as="aside" py={4} px={3} variant="aside">
          <Flex mb={4} sx={{ justifyContent: 'space-around' }}>
            <Button
              variant={listShown === 'rooms' ? 'tabs.active' : 'tabs.inactive'}
              onClick={() => setListShown('rooms')}
            >
              <Heading as="h3">Rooms</Heading>
            </Button>
            <Button
              variant={
                listShown === 'directs' ? 'tabs.active' : 'tabs.inactive'
              }
              onClick={() => setListShown('directs')}
            >
              <Heading as="h3">Directs</Heading>
            </Button>
          </Flex>

          <SuspenseWrapper>
            {listShown === 'rooms' ? <UserRoomsList /> : <DirectsList />}
          </SuspenseWrapper>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default SideMenu;
