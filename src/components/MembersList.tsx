import React, { useEffect } from 'react';
import { Badge, Flex, Grid, Text } from 'theme-ui';
import { useUser } from '../context/UserContext';
import writeIcon from '../assets/write-icon.svg';
import { Room } from '../types/Room';
import { usePageError } from '../hooks/usePageError';
import ErrorAlert from './ErrorAlert';
import { AnimatePresence } from 'framer-motion';
import { useCreateDirect } from '../api/queries/directQueries';
import { useRoomUsers } from '../api/queries/roomQueries';
import IconBtn from './IconBtn';

type Props = {
  room: Room;
};

const MembersList: React.FC<Props> = ({ room }) => {
  const { user } = useUser();
  const [error, setError] = usePageError();
  const roomUsersQuery = useRoomUsers(room.id);
  const createDirectMutation = useCreateDirect();

  const openDirect = async (anotherUserId: string) => {
    if (user) {
      createDirectMutation.mutate({ userId: user.id, anotherUserId });
    }
  };

  useEffect(() => {
    if (createDirectMutation.error) {
      setError(createDirectMutation.error);
    }
  }, [createDirectMutation.error]);

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
        {roomUsersQuery.data?.map((member) => (
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
              <IconBtn icon={writeIcon} onClick={() => openDirect(member.id)} />
            )}
          </Flex>
        ))}
      </Grid>
    </>
  );
};

export default MembersList;
