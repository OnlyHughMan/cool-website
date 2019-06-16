import React, { Component } from 'react';
import '../styles/App.css';

import Scene from './Scene';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className='title'>
          <h1 className='head-title-first-name'>HUGH VIDLER</h1>
          <h1 className='side-title'>UNTITLED</h1>
        </div>
        <Scene className='three-canvas'/>
      </div>
    );
  }
}

export default App;
