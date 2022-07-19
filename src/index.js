import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import allReducers from './reducers';


let store = serviceWorker.createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
 document.getElementById('root'));
serviceWorker.unregister();
