/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoom } from '../../context/RoomContext';
import NoItemsFound from '../NoItemsFound';
import { Box, Flex, Text } from 'theme-ui';
import { slideUpAnimation } from '../../utils/animations';
import { NavLink, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Direct } from '../../types/Direct';
import ErrorAlert from '../ErrorAlert';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { usePageError } from '../../hooks/usePageError';

type DirectProps = {
  direct: Direct;
};

const UserDirect: React.FC<DirectProps> = ({ direct }) => {
  const { directId } = useParams();
  const { user } = useUser();
  const directName =
    direct.user1 === user?.username ? direct.user2 : direct.user1;

  return (
    <Box
      py={2}
      variant={
        directId === direct.id ? 'cards.userRoomActive' : 'cards.userRoom'
      }
    >
      <NavLink
        to={`/profile/directs/${direct.id}`}
        sx={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
      >
        <Flex>
          <Text>{directName}</Text>
        </Flex>
      </NavLink>
    </Box>
  );
};

const DirectsList = () => {
  const { directs, getDirects } = useRoom();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [error, setError] = usePageError('');

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    getDirects().catch((e) => setError(getErrorMessage(e)));
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
          {directs.length ? (
            <>
              {directs.map((direct, index) => (
                <motion.li
                  variants={slideUpAnimation}
                  initial="hidden"
                  animate={isInitialRender ? 'staggeredVisible' : 'visible'}
                  exit="exit"
                  custom={index}
                  key={direct.id}
                >
                  <UserDirect direct={direct} />
                </motion.li>
              ))}
            </>
          ) : (
            <motion.div
              variants={slideUpAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              key="noDirectsFound"
            >
              <NoItemsFound message="You have no direct chats yet" />
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default DirectsList;
