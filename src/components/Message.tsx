import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { Box, Flex, Text } from 'theme-ui';
import { useUser } from '../context/UserContext';
import { Message } from '../types/Message';
import { messageAnimation } from '../utils/animations';
import { formatDate } from '../utils/formatDate';

type Props = {
  message: Message;
};

const MessageItem: React.FC<Props> = ({ message }) => {
  const { user } = useUser();
  const align = message.author === user?.username ? 'end' : 'start';
  return (
    <AnimatePresence>
      <motion.div
        key={message.id}
        variants={messageAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Flex
          sx={{
            flexDirection: 'column',
            textAlign: align,
          }}
        >
          <Text px={2} sx={{ fontWeight: 'bold' }}>
            {message.author}
          </Text>
          <Box
            px={3}
            py={2}
            variant={
              message.author === user?.username
                ? 'messages.own'
                : 'messages.other'
            }
            sx={{ alignSelf: align }}
          >
            <Text>{message.text}</Text>
          </Box>
          <Text px={3} sx={{ fontSize: 1 }}>
            {formatDate(message.createdAt)}
          </Text>
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageItem;
