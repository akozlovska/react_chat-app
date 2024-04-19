import React, { useContext, useState } from 'react';
import * as directService from '../api/services/directService';
import * as roomService from '../api/services/roomService';
import { Room } from '../types/Room';
import { Direct } from '../types/Direct';
import { useUser } from './UserContext';

type RoomContextType = {
  userRooms: Room[];
  allRooms: Room[];
  getAvailableRooms: () => Promise<void>;
  getUserRooms: () => Promise<void>;
  createRoom: (name: string) => Promise<Room>;
  renameRoom: (name: string, roomId: string) => Promise<void>;
  deleteRoom: (roomId: string) => Promise<void>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: (roomId: string) => Promise<void>;
  directs: Direct[];
  getDirects: () => Promise<void>;
  createDirect: (username: string) => Promise<Direct | void>;
};

const RoomContext = React.createContext({} as RoomContextType);

type Props = {
  children: React.ReactNode;
};

export const RoomProvider: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [directs, setDirects] = useState<Direct[]>([]);

  const getAvailableRooms = async () => {
    const rooms = await roomService.getAvailableRooms(user!.id);
    setAllRooms(rooms);
  };

  const getUserRooms = async () => {
    const rooms = await roomService.getUserRooms(user!.id);
    setUserRooms(rooms);
  };

  const joinRoom = async (roomId: string) => {
    await roomService.join({ userId: user!.id, roomId });
    const roomToJoin = allRooms.find((room) => room.id === roomId)!;
    setUserRooms((curr) => [...curr, roomToJoin]);
    setAllRooms((curr) => curr.filter((room) => room.id !== roomId));
  };

  const leaveRoom = async (roomId: string) => {
    const roomToLeave = userRooms.find((room) => room.id === roomId)!;
    await roomService.leave({ userId: user!.id, roomId });
    setUserRooms((curr) => curr.filter((room) => room.id !== roomId));
    setAllRooms((curr) => [...curr, roomToLeave]);
  };

  const createRoom = async (name: string) => {
    const newRoom = await roomService.create({ name, userId: user!.id });
    setUserRooms((curr) => [...curr, newRoom]);
    return newRoom;
  };

  const renameRoom = async (name: string, roomId: string) => {
    const updatedRoom = await roomService.rename({ name, roomId });
    setUserRooms((curr) => {
      const updatedUserRooms = [...curr];
      const index = updatedUserRooms.findIndex(
        (room) => room.id === updatedRoom.id,
      );
      updatedUserRooms.splice(index, 1, updatedRoom);
      return updatedUserRooms;
    });
  };

  const deleteRoom = async (roomId: string) => {
    await roomService.remove(roomId);
    setUserRooms((curr) => curr.filter((room) => room.id !== roomId));
  };

  const getDirects = async () => {
    if (user) {
      const directs = await directService.getUserDirects(user.id);
      setDirects(directs);
    }
  };

  const createDirect = async (username: string) => {
    if (user) {
      const existingDirect = directs.find(
        (direct) => direct.user1 === username || direct.user2 === username,
      );
      if (existingDirect) {
        return existingDirect;
      }

      const newDirect = await directService.create({
        userId: user.id,
        anotherUser: username,
      });
      setDirects((curr) => [...curr, newDirect]);
      return newDirect;
    }
  };

  const value = {
    userRooms,
    allRooms,
    getAvailableRooms,
    getUserRooms,
    createRoom,
    renameRoom,
    deleteRoom,
    joinRoom,
    leaveRoom,
    directs,
    getDirects,
    createDirect,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = () => useContext(RoomContext);
