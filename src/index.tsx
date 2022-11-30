import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WagmiProvider } from './config/Wagmi';

// We import bootstrap here, but you can remove if you want
import "bootstrap/dist/css/bootstrap.css";
import './index.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiProvider>
      <App />
    </WagmiProvider>
  </React.StrictMode>
);