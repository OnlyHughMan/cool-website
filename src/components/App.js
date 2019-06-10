import React, { Component } from 'react';
import '../styles/App.css';

import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Scene from './Scene';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className='side-title'>HUGH VIDLER</h1>
        <Scene/>
      </div>
    );
  }
}

export default App;
