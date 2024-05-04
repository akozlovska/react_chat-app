import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import * as messageService from '../services/messageService';

type ChatMessagesData = {
  roomId?: string;
  directId?: string;
};

export function useChatMessages({ roomId, directId }: ChatMessagesData) {
  return useSuspenseQuery({
    queryKey: ['chatMessages', { roomId, directId }],
    queryFn: () => {
      if (roomId) {
        return messageService.getRoomMessages(roomId);
      } else if (directId) {
        return messageService.getDirectMessages(directId);
      } else {
        return Promise.reject(new Error('No room or direct provided'));
      }
    },
    staleTime: Infinity,
  });
}

type EditMessageData = {
  messageId: string;
  newText: string;
  roomId?: string;
  directId?: string;
};

export function useEditMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, newText }: EditMessageData) =>
      messageService.editMessage({ messageId, newText }),
    onSuccess: async (_, { roomId, directId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['chatMessages', { roomId, directId }],
      });
    },
  });
}

type DeleteMessageData = {
  messageId: string;
  roomId?: string;
  directId?: string;
};

export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId }: DeleteMessageData) =>
      messageService.deleteMessage(messageId),
    onSuccess: async (_, { roomId, directId }) => {
      await queryClient.invalidateQueries({
        queryKey: ['chatMessages', { roomId, directId }],
      });
    },
  });
}
