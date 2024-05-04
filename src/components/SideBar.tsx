import React from 'react';
import { Button, Flex, Text, useColorMode } from 'theme-ui';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import roomsIcon from '../assets/rooms-icon.svg';
import logoutIcon from '../assets/logout-icon.svg';
import createIcon from '../assets/create-icon.svg';
import sun from '../assets/sun-icon.svg';
import moon from '../assets/moon-icon-light.svg';
import Icon from './Icon';
import { sideBarAnimation } from '../utils/animations';

const SideBar = () => {
  const [colorMode, setColorMode] = useColorMode();
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <AnimatePresence>
      <motion.aside
        key="sideBar"
        variants={sideBarAnimation}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.5, type: 'easeInOut' }}
      >
        <Flex
          bg="primary"
          py={5}
          px={2}
          sx={{
            flexDirection: 'column',
            gap: '30px',
            height: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <Button
            variant="sideBar"
            onClick={() =>
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
            }
          >
            <Flex sx={{ gap: '20px', alignItems: 'center' }}>
              <Icon icon={colorMode === 'light' ? moon : sun} />
              <Text sx={{ color: 'light' }}>SWITCH THEME</Text>
            </Flex>
          </Button>
          <Button variant="sideBar" onClick={() => navigate('/profile/rooms')}>
            <Flex sx={{ gap: '20px', alignItems: 'center' }}>
              <Icon icon={roomsIcon} />
              <Text sx={{ color: 'light' }}>ALL ROOMS</Text>
            </Flex>
          </Button>
          <Button
            variant="sideBar"
            onClick={() => navigate('/profile/rooms/create')}
          >
            <Flex sx={{ gap: '20px', alignItems: 'center' }}>
              <Icon icon={createIcon} />
              <Text sx={{ color: 'light' }}>CREATE ROOM</Text>
            </Flex>
          </Button>
          <Button variant="sideBar" onClick={handleLogout}>
            <Flex sx={{ gap: '20px', alignItems: 'center' }}>
              <Icon icon={logoutIcon} />
              <Text sx={{ color: 'light' }}>LOG OUT</Text>
            </Flex>
          </Button>
        </Flex>
      </motion.aside>
    </AnimatePresence>
  );
};

export default SideBar;
