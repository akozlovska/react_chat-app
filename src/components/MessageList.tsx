import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Flex } from 'theme-ui';
import { useChatMessages } from '../api/queries/messageQueries';
import MessageItem from './MessageItem';
import NoItemsFound from './NoItemsFound';

const MessageList = () => {
  const { roomId, directId } = useParams();
  const { data } = useChatMessages({ roomId, directId });
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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
  }, [data]);

  return (
    <>
      {data?.length ? (
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
          {data?.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </Flex>
      ) : (
        <NoItemsFound message="No messages yet" />
      )}
    </>
  );
};

export default MessageList;
