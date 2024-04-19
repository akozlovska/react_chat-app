import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { RoomProvider } from './context/RoomContext';
import ProfilePage from './pages/ProfilePage';
import WelcomePage from './pages/WelcomePage';
import PrivateRoutes from './components/PrivateRoutes';
import CreateRoomPage from './pages/CreateRoomPage';
import AllRoomsPage from './pages/AllRoomsPage';
import ChatPage from './pages/ChatPage';
import RoomInfoPage from './pages/RoomInfoPage';
import NotFoundPage from './pages/NotFoundPage';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />,
            children: [
              {
                path: 'directs',
                children: [
                  {
                    path: ':directId',
                    element: <ChatPage />,
                  },
                ],
              },
              {
                path: 'rooms',
                children: [
                  {
                    index: true,
                    element: <AllRoomsPage />,
                  },
                  {
                    path: 'create',
                    element: <CreateRoomPage />,
                  },
                  {
                    path: ':roomId',
                    children: [
                      {
                        index: true,
                        element: <ChatPage />,
                      },
                      {
                        path: 'info',
                        element: <RoomInfoPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RoomProvider>
        <RouterProvider router={router} />
      </RoomProvider>
    </UserProvider>
  </React.StrictMode>,
);
