import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import App from './App';
import WelcomePage from './pages/WelcomePage';
import PrivateRoutes from './components/PrivateRoutes';
import Loader from './components/Loader';
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CreateRoomPage = lazy(() => import('./pages/CreateRoomPage'));
const AllRoomsPage = lazy(() => import('./pages/AllRoomsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const RoomInfoPage = lazy(() => import('./pages/RoomInfoPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
            element: (
              <Suspense fallback={<Loader />}>
                <ProfilePage />
              </Suspense>
            ),
            children: [
              {
                path: 'directs',
                children: [
                  {
                    path: ':directId',
                    element: (
                      <Suspense fallback={<Loader />}>
                        <ChatPage />
                      </Suspense>
                    ),
                  },
                ],
              },
              {
                path: 'rooms',
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<Loader />}>
                        <AllRoomsPage />
                      </Suspense>
                    ),
                  },
                  {
                    path: 'create',
                    element: (
                      <Suspense fallback={<Loader />}>
                        <CreateRoomPage />
                      </Suspense>
                    ),
                  },
                  {
                    path: ':roomId',
                    children: [
                      {
                        index: true,
                        element: (
                          <Suspense fallback={<Loader />}>
                            <ChatPage />
                          </Suspense>
                        ),
                      },
                      {
                        path: 'info',
                        element: (
                          <Suspense fallback={<Loader />}>
                            <RoomInfoPage />
                          </Suspense>
                        ),
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
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>,
);
