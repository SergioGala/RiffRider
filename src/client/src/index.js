import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const theme = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  background: 'var(--background)',
  text: 'var(--text)',
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);