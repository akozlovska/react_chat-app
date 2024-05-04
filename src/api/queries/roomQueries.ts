import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as roomService from '../services/roomService';
import { useUser } from '../../context/UserContext';

export function useUserRooms() {
  const { user } = useUser();
  return useSuspenseQuery({
    queryKey: ['userRooms', { userId: user?.id }],
    queryFn: () => {
      if (user) {
        return roomService.getUserRooms(user.id);
      } else {
        return null;
      }
    },
  });
}

export function useAvailableRooms() {
  const { user } = useUser();

  return useSuspenseQuery({
    queryKey: ['availableRooms', { userId: user?.id }],
    queryFn: () => {
      if (user) {
        return roomService.getAvailableRooms(user.id);
      } else {
        return null;
      }
    },
  });
}

type CreateRoomData = {
  name: string;
  userId: string;
};

export function useCreateRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, userId }: CreateRoomData) =>
      roomService.create({ name, userId }),
    onSuccess: async (newRoom, { userId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['userRooms', { userId }],
      });
      navigate(`/profile/rooms/${newRoom.id}`);
    },
  });
}

export function useDeleteRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (roomId: string) => roomService.remove(roomId),
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({
          queryKey: ['userRooms', { userId: user.id }],
        });
        navigate('/profile/rooms');
      }
    },
  });
}

type EditRoomData = {
  name: string;
  roomId: string;
};

export function useEditRoom() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, roomId }: EditRoomData) =>
      roomService.rename({ name, roomId }),
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({
          queryKey: ['userRooms', { userId: user.id }],
        });
      }
    },
  });
}

type LeaveOrJoinRoomData = {
  userId: string;
  roomId: string;
};

export function useLeaveRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, roomId }: LeaveOrJoinRoomData) =>
      roomService.leave({ userId, roomId }),
    onSuccess: async (_, { userId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['userRooms', { userId }] }),
        queryClient.invalidateQueries({
          queryKey: ['availableRooms', { userId }],
        }),
      ]);
      navigate('/profile/rooms');
    },
  });
}

export function useJoinRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, roomId }: LeaveOrJoinRoomData) =>
      roomService.join({ userId, roomId }),
    onSuccess: async (_, { userId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['userRooms', { userId }] }),
        queryClient.invalidateQueries({
          queryKey: ['availableRooms', { userId }],
        }),
      ]);
      navigate('/profile/rooms');
    },
  });
}

export function useRoomUsers(roomId: string) {
  return useSuspenseQuery({
    queryKey: ['roomUsers', { roomId }],
    queryFn: () => roomService.getRoomUsers(roomId),
  });
}
