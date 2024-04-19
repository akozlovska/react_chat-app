import React, { useContext, useMemo, useState } from 'react';
import * as userService from '../api/services/userService';
import { User } from '../types/User';

type UserContextType = {
  isAuthorized: boolean;
  user: User | null;
  authorize: (username: string) => Promise<void>;
  logout: () => void;
};

const UserContext = React.createContext({} as UserContextType);

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthorized = useMemo(() => !!user, [user]);

  const authorize = async (username: string) => {
    const isLoggedIn = localStorage.getItem('chat-username');
    if (isLoggedIn) {
      const user = await userService.authorize(isLoggedIn);
      setUser(user);
    } else {
    const user = await userService.authorize(username);
    setUser(user);
    localStorage.setItem('chat-username', user.username);
    }
  };

  const logout = () => {
    localStorage.removeItem('chat-username');
    setUser(null);
  };

  const value = {
    user,
    isAuthorized,
    authorize,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
