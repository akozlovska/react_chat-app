import { Message } from '../../types/Message';
import { client } from '../client';

type EditMessageData = {
  messageId: string;
  newText: string;
};

export const getRoomMessages = (roomId: string) => {
  return client.get<never, Message[]>(`/messages/room/${roomId}`);
};

export const getDirectMessages = (directId: string) => {
  return client.get<never, Message[]>(`/messages/direct/${directId}`);
};

export const editMessage = ({ messageId, newText }: EditMessageData) => {
  return client.patch<never, Message>(`/messages/${messageId}`, { newText });
};

export const deleteMessage = (messageId: string) => {
  return client.delete(`/messages/${messageId}`);
};
