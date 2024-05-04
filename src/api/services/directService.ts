import { Direct } from '../../types/Direct';
import { client } from '../client';

type CreateDirectData = {
  userId: string;
  anotherUserId: string;
};

export const create = ({ userId, anotherUserId }: CreateDirectData) => {
  return client.post<never, Direct>('/directs', { userId, anotherUserId });
};

export const remove = (directId: string) => {
  return client.delete(`/directs/${directId}`);
};

export const getUserDirects = (userId: string) => {
  return client.get<never, Direct[]>(`/directs/user/${userId}`);
};
