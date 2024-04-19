/** @jsxImportSource theme-ui */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Flex, Heading, Label } from 'theme-ui';
import AnimatedLayout from '../components/AnimatedLayout';
import MessageItem from '../components/Message';
import { useUser } from '../context/UserContext';
import * as messageService from '../api/services/messageService';
import { Message } from '../types/Message';
import { usePageError } from '../hooks/usePageError';
import { getErrorMessage } from '../utils/getErrorMessage';
import ErrorAlert from '../components/ErrorAlert';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { AnimatePresence } from 'framer-motion';

type NewMessageValues = {
  message: string;
};

const messageFieldSchema = Yup.object().shape({
  message: Yup.string().trim().min(1).max(200).required(),
});

const newMessageSchema = Yup.object().shape(
  {
    text: Yup.string().trim().min(1).max(200).required(),
    author: Yup.string()
      .trim()
      .min(8)
      .max(16)
      .matches(/^[a-zA-Z0-9]+$/)
      .required(),
    roomId: Yup.string()
      .uuid()
      .when('directId', {
        is: undefined,
        then: (roomId) => roomId.required(),
      }),
    directId: Yup.string()
      .uuid()
      .when('roomId', {
        is: undefined,
        then: (directId) => directId.required(),
      }),
  },
  [['roomId', 'directId']],
);

const ChatPage = () => {
  const { roomId, directId } = useParams();
  const { user } = useUser();

  const [error, setError] = usePageError('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [ws, setWs] = useState<WebSocket | null>(null);

  const handleSubmit = async (
    values: NewMessageValues,
    formikHelpers: FormikHelpers<NewMessageValues>,
  ) => {
    const newMessage = {
      text: values.message,
      author: user?.username,
      roomId,
      directId,
    };

    newMessageSchema
      .validate(newMessage)
      .then((message) => {
        ws?.send(JSON.stringify(message));
        formikHelpers.resetForm();
      })
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    if (roomId) {
      messageService
        .getRoomMessages(roomId)
        .then(setChatMessages)
        .catch((e) => setError(getErrorMessage(e)));
    } else if (directId) {
      messageService
        .getDirectMessages(directId)
        .then(setChatMessages)
        .catch((e) => setError(getErrorMessage(e)));
    }
  }, [roomId, directId]);

  useEffect(() => {
    const updateScroll = () => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight - container.clientHeight;
      }
    };

    const timeout = setTimeout(updateScroll, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [chatMessages]);

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WS_URL as string);
    socket.onopen = () => {
      setWs(socket);
    };

    socket.onerror = () => {
      setError('Websocket connection error');
    };

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.error) {
        setError(newMessage.error);
      } else {
        setChatMessages((curr) => [...curr, newMessage]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <AnimatedLayout>
      <Flex
        sx={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <AnimatePresence>
          {!!error && <ErrorAlert message={error} />}
        </AnimatePresence>
        {chatMessages.length ? (
          <>
            <Flex
              ref={messagesContainerRef}
              pt={3}
              px={4}
              sx={{
                flexDirection: 'column',
                gap: '20px',
                overflowY: 'scroll',
                scrollBehavior: 'smooth',
              }}
            >
              {chatMessages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </Flex>
          </>
        ) : (
          <Heading m="auto">No messages yet</Heading>
        )}

        <Formik
          initialValues={{ message: '' }}
          validationSchema={messageFieldSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
        >
          {() => (
            <Form
              sx={{
                px: 4,
                py: 3,
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Label htmlFor="message" variant="labels.hidden">
                New message
              </Label>
              <Field
                name="message"
                id="message"
                placeholder="Enter new message"
                autoComplete="off"
                sx={{
                  borderRadius: '10px',
                  outlineColor: 'secondary',
                  display: 'block',
                  width: '100%',
                  p: 2,
                  appearance: 'none',
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  border: '1px solid',
                  color: 'inherit',
                  bg: 'transparent',
                }}
              />
              <Button type="submit" sx={{ flexShrink: 0 }}>
                Send
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </AnimatedLayout>
  );
};

export default ChatPage;
