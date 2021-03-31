import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import callClient from './callClient';

callClient<void>('getFocus');

ReactDOM.render(<App />, document.getElementById('main'));
