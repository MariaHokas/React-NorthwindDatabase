import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
// import Navigaatio from './Navigaatio';
// import Footer from './Footer';
import App from './App';

ReactDOM.render((<App/>), document.getElementById('root'));

serviceWorker.unregister();
