import React from 'react';
import ReactDOM from 'react-dom';
import './_globals.scss';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './Redux/Store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
