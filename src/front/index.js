import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { ThemeProvider } from 'styled-components';
import App from './App';

const theme = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  background: 'var(--background)',
  text: 'var(--text)',
};

// Get the root DOM element
const rootElement = document.getElementById('root');

// Check if the root element exists
if (rootElement) {
  // Create a root using the new createRoot API
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found. Please ensure there is an element with id="root" in your HTML.');
}
