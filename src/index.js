
import React from 'react';
import ReactDOM from 'react-dom';

const title = 'Waddya mean boil the plate';

console.log('Howdy planet');

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();