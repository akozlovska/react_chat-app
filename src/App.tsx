/** @jsxImportSource theme-ui */
import React, { useEffect } from 'react';
import { ThemeUIProvider } from 'theme-ui';
import theme from './utils/theme';
import './App.scss';
import NavBar from './components/NavBar';
import { useAuthorize } from './api/queries/userQueries';
import AnimatedRootOutlet from './components/AnimatedRootOutlet';
import { ErrorBoundary } from 'react-error-boundary';
import OutletErrorFallback from './components/OutletErrorFallback';
import Loader from './components/Loader';

function App() {
  const { mutate, isPending } = useAuthorize();

  useEffect(() => {
    const cachedUsername = localStorage.getItem('chat-username');
    if (cachedUsername) {
      mutate(cachedUsername);
    }
  }, []);

  return (
    <ThemeUIProvider theme={theme}>
      <div className="App">
        <header>
          <NavBar />
        </header>
        <main className="main">
          {isPending ? (
            <Loader />
          ) : (
            <ErrorBoundary fallback={<OutletErrorFallback />}>
              <AnimatedRootOutlet />
            </ErrorBoundary>
          )}
        </main>
      </div>
    </ThemeUIProvider>
  );
}

export default App;
