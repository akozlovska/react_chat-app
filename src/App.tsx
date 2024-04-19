/** @jsxImportSource theme-ui */
import React from 'react';
import { ThemeUIProvider } from 'theme-ui';
import { Outlet } from 'react-router-dom';
import theme from './utils/theme';
import './App.scss';
import NavBar from './components/NavBar';

function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <div className="App">
        <header>
          <NavBar />
        </header>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </ThemeUIProvider>
  );
}

export default App;
