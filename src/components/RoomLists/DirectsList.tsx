/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoItemsFound from '../NoItemsFound';
import { Box, Close, Flex, Text } from 'theme-ui';
import { slideUpAnimation } from '../../utils/animations';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Direct } from '../../types/Direct';
import {
  useDeleteDirect,
  useUserDirects,
} from '../../api/queries/directQueries';

type DirectProps = {
  direct: Direct;
};

const UserDirect: React.FC<DirectProps> = ({ direct }) => {
  const { directId } = useParams();
  const { user } = useUser();
  const directName =
    direct.user1 === user?.username ? direct.user2 : direct.user1;

  const navigate = useNavigate();
  const { mutateAsync } = useDeleteDirect();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutateAsync(direct.id).then(() => {
      if (directId === direct.id) {
        navigate('/profile');
      }
    });
  };

  return (
    <Box
      variant={
        directId === direct.id ? 'cards.userRoomActive' : 'cards.userRoom'
      }
    >
      <NavLink
        to={`/profile/directs/${direct.id}`}
        sx={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
      >
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>{directName}</Text>
          <Close
            sx={{
              width: '42px',
              height: '42px',
              cursor: 'pointer',
              color: 'gray',
            }}
            onClick={handleDelete}
          />
        </Flex>
      </NavLink>
    </Box>
  );
};

const DirectsList = () => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { data } = useUserDirects();

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
          {data.map((direct, index) => (
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
        </AnimatePresence>
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
    </Flex>
  );
};

export default DirectsList;
