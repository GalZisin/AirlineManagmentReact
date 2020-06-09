import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from './store'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

let storeInstance = Store();

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));