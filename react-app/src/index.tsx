import React from 'react';
import { createRoot } from 'react-dom/client';
import { FlagProvider } from '@unleash/proxy-client-react';
import App from './App';
import './styles.css';

const config = {
  url: 'http://localhost:4242/api/frontend/', // Unleash Proxy URL
  clientKey: 'default:development.425146ad323e3e24749bdd575a9db070107f56a40796ba6879729276',
  appName: 'unleash-onboarding-react',
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <FlagProvider config={config}>
      <App />
    </FlagProvider>
  </React.StrictMode>
);

