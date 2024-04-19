/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoom } from '../../context/RoomContext';
import NoItemsFound from '../NoItemsFound';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Box, Flex, Text } from 'theme-ui';
import Icon from '../Icon';
import { slideUpAnimation } from '../../utils/animations';
import icon from '../../assets/info-icon.svg';
import { Room } from '../../types/Room';
import { usePageError } from '../../hooks/usePageError';
import { getErrorMessage } from '../../utils/getErrorMessage';
import ErrorAlert from '../ErrorAlert';

type RoomProps = {
  room: Room;
};

const UserRoom: React.FC<RoomProps> = ({ room }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const showInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate(`/profile/rooms/${room.id}/info`);
  };

  return (
    <Box
      variant={roomId === room.id ? 'cards.userRoomActive' : 'cards.userRoom'}
    >
      <NavLink
        to={`/profile/rooms/${room.id}`}
        sx={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
      >
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>{room.name}</Text>
          <Icon icon={icon} onClick={showInfo} />
        </Flex>
      </NavLink>
    </Box>
  );
};

const UserRoomsList = () => {
  const { userRooms, getUserRooms } = useRoom();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [error, setError] = usePageError('');

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    getUserRooms().catch((e) => setError(getErrorMessage(e)));
  }, []);

  return (
    <>
      <AnimatePresence>
        {!!error && <ErrorAlert message={error} />}
      </AnimatePresence>
      <Flex
        as="ul"
        p={0}
        sx={{ listStyle: 'none', flexDirection: 'column', gap: '15px' }}
      >
        <AnimatePresence>
          {userRooms.length ? (
            <>
              {userRooms.map((room, index) => (
                <motion.li
                  variants={slideUpAnimation}
                  initial="hidden"
                  animate={isInitialRender ? 'staggeredVisible' : 'visible'}
                  exit="exit"
                  custom={index}
                  key={room.id}
                >
                  <UserRoom room={room} />
                </motion.li>
              ))}
            </>
          ) : (
            <motion.div
              variants={slideUpAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              key="noRoomsFound"
            >
              <NoItemsFound message="You have no rooms yet" />
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default UserRoomsList;
