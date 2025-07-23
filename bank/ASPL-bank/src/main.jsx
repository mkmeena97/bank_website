import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './auth/keycloak';
import ThemeContextProvider from "./context/ThemeContext";

const eventLogger = (event, error) => {
  console.log("Keycloak event:", event, error);
};

const tokenLogger = (tokens) => {
  console.log("Keycloak tokens:", tokens);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: 'login-required', checkLoginIframe: false }}
      onEvent={eventLogger}
      onTokens={tokenLogger}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ReactKeycloakProvider>
  </ThemeContextProvider>
);
