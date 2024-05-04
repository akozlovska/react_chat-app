/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoItemsFound from '../NoItemsFound';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Box, Flex, Text } from 'theme-ui';
import { slideUpAnimation } from '../../utils/animations';
import icon from '../../assets/info-icon.svg';
import { Room } from '../../types/Room';
import { useUserRooms } from '../../api/queries/roomQueries';
import IconBtn from '../IconBtn';

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
          <IconBtn icon={icon} onClick={showInfo} />
        </Flex>
      </NavLink>
    </Box>
  );
};

const UserRoomsList = () => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { data } = useUserRooms();

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  return (
    <Flex
      as="ul"
      p={0}
      sx={{ listStyle: 'none', flexDirection: 'column', gap: '15px' }}
    >
      {data?.length ? (
        <AnimatePresence>
          {data.map((room, index) => (
            <motion.li
              variants={slideUpAnimation}
              initial="hidden"
              animate={isInitialRender ? 'staggeredVisible' : 'visible'}
              exit="exit"
              custom={index}
              key={room.id}
              layout
            >
              <UserRoom room={room} />
            </motion.li>
          ))}
        </AnimatePresence>
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
    </Flex>
  );
};

export default UserRoomsList;
