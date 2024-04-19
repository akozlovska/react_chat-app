import { Message } from '../../types/Message';
import { client } from '../client';

export const getRoomMessages = (roomId: string) => {
  return client.get<never, Message[]>(`/rooms/${roomId}`);
}

export const getDirectMessages = (directId: string) => {
  return client.get<never, Message[]>(`/directs/${directId}`);
}