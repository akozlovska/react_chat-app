import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import * as directService from '../services/directService';

export function useUserDirects() {
  const { user } = useUser();

  return useSuspenseQuery({
    queryKey: ['userDirects', { userId: user?.id }],
    queryFn: () => {
      if (user) {
        return directService.getUserDirects(user.id);
      } else {
        return null;
      }
    },
  });
}

type CreateDirectData = {
  userId: string;
  anotherUserId: string;
};

export function useCreateDirect() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, anotherUserId }: CreateDirectData) =>
      directService.create({ userId, anotherUserId }),
    onSuccess: async (newDirect, { userId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['userDirects', { userId }],
      });
      navigate(`/profile/directs/${newDirect?.id}`);
    },
  });
}

export function useDeleteDirect() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (directId: string) => directService.remove(directId),
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({
          queryKey: ['userDirects', { userId: user.id }],
        });
      }
    },
  });
}
