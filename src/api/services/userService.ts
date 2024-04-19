import { User } from '../../types/User';
import { client } from '../client';

export const authorize = (username: string) => {
  return client.post<never, User>('/authorize', { username });
};
