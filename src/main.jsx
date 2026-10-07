import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { VaultProvider } from './context/VaultContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VaultProvider>
      <App />
    </VaultProvider>
  </React.StrictMode>
);
