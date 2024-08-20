import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';
import { LoadingProvider } from './components/Loading';
import { font } from './components/ui/Variables';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { router } from './router';
import TokenService from './service/TokenService';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: ${font.titleColor};
    font-size: ${font.titleFontSize};
  }

  span, p, a, label {
    margin: 0;
    color: ${font.textColor};
    font-size: ${font.textFontSize};
  }
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = 1;
      try {
        const response = await TokenService.refreshToken();
        const accessToken = response.data;
        localStorage.setItem('access_token', accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('access_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (originalRequest._retry === 1) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

root.render(
  <React.StrictMode>
    <LoadingProvider>
      <GlobalStyle></GlobalStyle>
      <RouterProvider router={router} />
    </LoadingProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
