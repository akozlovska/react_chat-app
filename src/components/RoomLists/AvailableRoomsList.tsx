/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoom } from '../../context/RoomContext';
import NoItemsFound from '../NoItemsFound';
import { Button, Card, Flex, Text } from 'theme-ui';
import { slideUpAnimation } from '../../utils/animations';
import AnimatedSlideLeft from '../AnimatedSlideLeft';
import { Room } from '../../types/Room';
import ErrorAlert from '../ErrorAlert';
import { usePageError } from '../../hooks/usePageError';
import { getErrorMessage } from '../../utils/getErrorMessage';

type RoomProps = {
  room: Room;
};

const AvailableRoom: React.FC<RoomProps> = ({ room }) => {
  const { joinRoom } = useRoom();
  const [error, setError] = usePageError('');

  const join = async (roomId: string) => {
    joinRoom(roomId).catch((e) => setError(getErrorMessage(e)));
  };

  return (
    <>
      <Card variant="cards.room">
        <Flex
          px={3}
          py={2}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text>{room.name}</Text>
          <Button onClick={() => join(room.id)}>Join</Button>
        </Flex>
      </Card>
      <AnimatePresence>
        {!!error && <ErrorAlert message={error} />}
      </AnimatePresence>
    </>
  );
};

const AvailableRoomsList = () => {
  const { allRooms, getAvailableRooms } = useRoom();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [error, setError] = usePageError('');

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    getAvailableRooms().catch((e) => setError(getErrorMessage(e)));
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
          {allRooms.length ? (
            <>
              {allRooms.map((room, index) => (
                <motion.li
                  variants={slideUpAnimation}
                  initial="hidden"
                  animate={isInitialRender ? 'staggeredVisible' : 'visible'}
                  exit="exit"
                  custom={index}
                  key={room.id}
                >
                  <AvailableRoom room={room} />
                </motion.li>
              ))}
            </>
          ) : (
            <AnimatedSlideLeft key="1" order={2}>
              <NoItemsFound message="No rooms for you to join yet" />
            </AnimatedSlideLeft>
          )}
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default AvailableRoomsList;
