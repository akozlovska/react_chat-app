import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import * as userService from '../services/userService';

export function useAuthorize() {
  const navigate = useNavigate();
  const { login } = useUser();
  const location = useLocation();

  return useMutation({
    mutationFn: (username: string) => userService.authorize(username),
    onSuccess: (user) => {
      login(user);
      if (location.pathname === '/') {
        navigate('/profile');
      }
    },
  });
}
