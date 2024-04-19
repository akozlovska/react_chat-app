import { Direct } from '../../types/Direct';
import { client } from '../client';

type CreateDirectData = {
  userId: string;
  anotherUser: string;
};

export const create = ({ userId, anotherUser }: CreateDirectData) => {
  return client.post<never, Direct>('/directs', { userId, anotherUser });
};

export const getUserDirects = (userId: string) => {
  return client.get<never, Direct[]>(`/directs/user/${userId}`);
};
