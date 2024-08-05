import React from 'react';
import './assets/scss/custom.scss';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { JWTProvider } from './contexts/jwtContext';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <JWTProvider>
        <App />
      </JWTProvider>
    </Provider>
  </React.StrictMode>
);
