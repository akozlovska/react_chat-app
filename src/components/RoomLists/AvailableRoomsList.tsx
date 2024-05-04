/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoItemsFound from '../NoItemsFound';
import { Button, Card, Flex, Text } from 'theme-ui';
import { slideUpAnimation } from '../../utils/animations';
import AnimatedSlideLeft from '../AnimatedSlideLeft';
import { Room } from '../../types/Room';
import ErrorAlert from '../ErrorAlert';
import { usePageError } from '../../hooks/usePageError';
import { useAvailableRooms, useJoinRoom } from '../../api/queries/roomQueries';
import { useUser } from '../../context/UserContext';

type RoomProps = {
  room: Room;
};

const AvailableRoom: React.FC<RoomProps> = ({ room }) => {
  const [pageError, setPageError] = usePageError();

  const { user } = useUser();
  const { mutate, error, isPending } = useJoinRoom();

  const join = async (roomId: string) => {
    if (user) {
      mutate({ roomId, userId: user.id });
    }
  };

  useEffect(() => {
    if (error) {
      setPageError(error);
    }
  }, [error]);

  return (
    <>
      <Card variant="cards.room">
        <Flex
          px={3}
          py={2}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text>{room.name}</Text>
          <Button disabled={isPending} onClick={() => join(room.id)}>
            Join
          </Button>
        </Flex>
      </Card>
      <AnimatePresence>
        {!!pageError && <ErrorAlert message={pageError} />}
      </AnimatePresence>
    </>
  );
};

const AvailableRoomsList = () => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { data } = useAvailableRooms();

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
            >
              <AvailableRoom room={room} />
            </motion.li>
          ))}
        </AnimatePresence>
      ) : (
        <AnimatedSlideLeft key="1" order={2}>
          <NoItemsFound message="No rooms for you to join yet" />
        </AnimatedSlideLeft>
      )}
    </Flex>
  );
};

export default AvailableRoomsList;
