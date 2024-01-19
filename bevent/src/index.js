import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {CeloProvider} from '@celo/react-celo'
import '@celo/react-celo/lib/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CeloProvider
      dapp={{
        name: 'zivent',
        description: 'Event planner',
        url: 'http://localhost:3000',

      }}
      theme={{
        primary: '#6366f1',
        secondary: '#eef2ff',
        text: '#ffffff',
        textSecondary: '#ffffff',
        textTertiary: '#64748b',
        muted: '#e2e8f0',
        background: '#000000',
        error: '#ef4444',
      }}
      connectModal = {{
        title: <span>Zivent: Connect Your Wallet</span>,
        searchable: true,
      }}>
        <App />
      </CeloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
