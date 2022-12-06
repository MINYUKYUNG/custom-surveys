import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode> // 개발 단계에서 react-beautiful-dnd 의 콜백 ref 사용을 위해 임시 off
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
