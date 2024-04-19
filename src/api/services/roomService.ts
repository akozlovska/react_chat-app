import { Room } from '../../types/Room';
import { User } from '../../types/User';
import { client } from '../client';

type JoinRoomData = {
  userId: string;
  roomId: string;
};

type CreateRoomData = {
  userId: string;
  name: string;
};

type RenameRoomData = {
  name: string;
  roomId: string;
};

export const getUserRooms = (userId: string) => {
  return client.get<never, Room[]>(`/rooms/user/${userId}`);
};

export const getAvailableRooms = (userId: string) => {
  return client.get<never, Room[]>(`/rooms/user/${userId}/available`);
};

export const create = ({ name, userId }: CreateRoomData) => {
  return client.post<never, Room>('/rooms', { name, userId });
};

export const rename = ({ name, roomId }: RenameRoomData) => {
  return client.patch<never, Room>(`/rooms/${roomId}`, { name });
};

export const remove = (roomId: string) => {
  return client.delete(`/rooms/${roomId}`);
};

export const join = ({ userId, roomId }: JoinRoomData) => {
  return client.patch<never, Room>(`/rooms/${roomId}/join`, { userId });
};

export const leave = ({ userId, roomId }: JoinRoomData) => {
  return client.patch(`/rooms/${roomId}/leave`, { userId });
};

export const getRoomUsers = (roomId: string) => {
  return client.get<never, User[]>(`rooms/${roomId}/users`);
};
