
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

const title = 'Waddya mean boil the plate';

console.log('Howdy planet');

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

module.hot.accept();