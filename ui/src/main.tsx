import './globals.js';
import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-mono/400.css';
import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import * as pino from 'pino';
import App from './App.js';
import { ZkEscrowProvider } from './web3/ZkEscrowContext.js';

setNetworkId('preprod');

export const logger = pino.pino({ level: import.meta.env.VITE_LOGGING_LEVEL || 'info' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ZkEscrowProvider logger={logger}>
      <App />
    </ZkEscrowProvider>
  </React.StrictMode>,
);
