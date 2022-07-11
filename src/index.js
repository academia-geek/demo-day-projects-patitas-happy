import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './Redux/store/store'
import "./Styles/Style.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>

);

