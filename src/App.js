import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AppHeader from './components/AppHeader/AppHeader';
import PlayerForm from './components/PlayerForm/PlayerForm';

class App extends Component {
  render() {
    return (
      <div id="App" className="App container-fluid">
      <AppHeader />
      <PlayerForm />
      </div>
    );
  }
}

export default App;
