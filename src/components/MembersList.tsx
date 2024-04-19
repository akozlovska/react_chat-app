import React, { useEffect, useState } from 'react';
import { Badge, Flex, Grid, Text } from 'theme-ui';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getRoomUsers } from '../api/services/roomService';
import writeIcon from '../assets/write-icon.svg';
import Icon from './Icon';
import { Room } from '../types/Room';
import { User } from '../types/User';
import { useRoom } from '../context/RoomContext';
import { usePageError } from '../hooks/usePageError';
import { getErrorMessage } from '../utils/getErrorMessage';
import ErrorAlert from './ErrorAlert';
import { AnimatePresence } from 'framer-motion';

type Props = {
  room: Room;
};

const MembersList: React.FC<Props> = ({ room }) => {
  const [roomMembers, setRoomMembers] = useState<User[]>([]);
  const { user } = useUser();
  const { createDirect } = useRoom();
  const navigate = useNavigate();

  const [error, setError] = usePageError('');

  const handleCreate = async (username: string) => {
    if (user) {
      createDirect(username)
        .then((direct) => navigate(`/profile/directs/${direct?.id}`))
        .catch((e) => setError(getErrorMessage(e)));
    }
  };

  useEffect(() => {
    getRoomUsers(room.id)
      .then(setRoomMembers)
      .catch((e) => setError(getErrorMessage(e)));
  }, [room]);
  
  return (
    <>
      <AnimatePresence>
        {!!error && <ErrorAlert message={error} />}
      </AnimatePresence>
      <Grid
        as="ul"
        p={3}
        sx={{
          overflowX: 'auto',
          gap: '15px',
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(3, minmax(58px, 1fr))',
          gridAutoColumns: '250px',
        }}
      >
        {roomMembers.map((member) => (
          <Flex
            as="li"
            key={member.id}
            py={2}
            px={3}
            variant="cards.user"
            sx={{ justifyContent: 'space-between' }}
          >
            <Text sx={{ position: 'relative' }}>
              {member.username}
              {room?.adminId === member?.id && (
                <Badge
                  variant="primary"
                  sx={{ position: 'absolute', top: '-30%', left: '110%' }}
                >
                  admin
                </Badge>
              )}
            </Text>

            {member.username !== user?.username && (
              <Icon
                icon={writeIcon}
                onClick={() => handleCreate(member.username)}
              />
            )}
          </Flex>
        ))}
      </Grid>
    </>
  );
};

export default MembersList;
