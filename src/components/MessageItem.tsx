/** @jsxImportSource theme-ui */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Box, Button, Flex, Text } from 'theme-ui';
import { FormikProps } from 'formik';
import {
  useDeleteMessage,
  useEditMessage,
} from '../api/queries/messageQueries';
import { useUser } from '../context/UserContext';
import { Message } from '../types/Message';
import { messageAnimation } from '../utils/animations';
import { formatDate } from '../utils/formatDate';
import { usePageError } from '../hooks/usePageError';
import ErrorAlert from './ErrorAlert';
import EditMessageForm, { UpdatedMessageValues } from './EditMessageForm';

type Props = {
  message: Message;
};

const MessageItem: React.FC<Props> = ({ message }) => {
  const { roomId, directId } = useParams();
  const { user } = useUser();

  const [isEdit, setIsEdit] = useState(false);
  const [pageError, setPageError] = usePageError();

  const isOwn = message.author === user?.username;
  const align = isOwn ? 'end' : 'start';

  const editMessageMutation = useEditMessage();
  const deleteMessageMutation = useDeleteMessage();

  const handleEdit = useCallback(({ updatedMessage }: UpdatedMessageValues) => {
    editMessageMutation.mutate({
      messageId: message.id,
      newText: updatedMessage,
      roomId,
      directId,
    });
    setIsEdit(false);
  }, []);

  const handleDelete = () => {
    deleteMessageMutation.mutate({ messageId: message.id, roomId, directId });
  };

  const formRef = useRef<FormikProps<UpdatedMessageValues>>(null);
  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };

  useEffect(() => {
    if (editMessageMutation.error) {
      setPageError(editMessageMutation.error);
    }
  }, [editMessageMutation.error]);

  useEffect(() => {
    if (deleteMessageMutation.error) {
      setPageError(deleteMessageMutation.error);
    }
  }, [deleteMessageMutation.error]);

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

          {isEdit ? (
            <Box variant="messages.edit" sx={{ alignSelf: align }}>
              <EditMessageForm
                initialMessage={message.text}
                onSubmit={handleEdit}
                ref={formRef}
              />
            </Box>
          ) : (
            <>
              <Box
                variant={
                  message.author === user?.username
                    ? 'messages.own'
                    : 'messages.other'
                }
                sx={{ alignSelf: align, overflowWrap: 'break-word' }}
              >
                <Text>{message.text}</Text>
              </Box>
              <Text
                py={1}
                px={2}
                sx={{ alignSelf: align, fontSize: 1, color: 'gray' }}
              >
                {formatDate(message.createdAt)}
              </Text>
            </>
          )}
          {!!pageError && <ErrorAlert message={pageError} />}
          {isOwn && (
            <Flex sx={{ alignSelf: align, px: 2, gap: '20px' }}>
              {isEdit ? (
                <>
                  <Button
                    variant="sm"
                    type="submit"
                    disabled={editMessageMutation.isPending}
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                  <Button variant="sm" onClick={() => setIsEdit(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="sm" onClick={() => setIsEdit(true)}>
                    Edit
                  </Button>
                  <Button
                    variant="sm"
                    disabled={deleteMessageMutation.isPending}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageItem;
