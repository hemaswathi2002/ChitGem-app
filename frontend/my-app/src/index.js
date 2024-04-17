import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import configureStore from './store/ConfigureStore';
import App from './App';

const store = configureStore();
store.subscribe(() => {
    console.log(store.getState());
});
console.log(store.getState()); // Corrected to invoke getState()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
