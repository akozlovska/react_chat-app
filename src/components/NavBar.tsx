import React from 'react';
import { Avatar, Flex, Heading, Text, useColorMode } from 'theme-ui';
import { useUser } from '../context/UserContext';
import profileIcon from '../assets/profile-icon.svg';
import sun from '../assets/sun-icon.svg';
import moon from '../assets/moon-icon.svg';
import IconBtn from './IconBtn';

const NavBar = () => {
  const { user } = useUser();
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Flex
      as="nav"
      variant="nav"
      sx={{
        boxShadow:
          colorMode === 'light'
            ? '0 10px 10px -10px var(--theme-ui-colors-boxShadow)'
            : 'inset 0 -10px 10px -10px var(--theme-ui-colors-boxShadow)',
      }}
    >
      <Heading>React Chat App</Heading>
      <Flex sx={{ gap: '20px', alignItems: 'center' }}>
        {user ? (
          <Flex sx={{ gap: '10px', alignItems: 'center' }}>
            <Avatar
              src={profileIcon}
              sx={{ backgroundColor: 'white', width: '24px', height: '24px' }}
            />
            <Text sx={{ flexShrink: 0 }}>{user.username}</Text>
          </Flex>
        ) : (
          <IconBtn
            icon={colorMode === 'light' ? moon : sun}
            onClick={() =>
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
            }
          />
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
