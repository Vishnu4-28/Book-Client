import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
// import LoadingSpinner from './components/common/LoadingSpinner';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <LoadingSpinner/> */}
      <App />
    </Provider>
  </React.StrictMode>
); 