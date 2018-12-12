import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import AppHeader from './components/AppHeader/AppHeader';
import PlayerForm from './components/PlayerForm/PlayerForm';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

export const App = props => {
  const { showScoreBoard } = props;
  return (
    <div id="App" className="App container-fluid">
      <AppHeader />
      <PlayerForm />
      {showScoreBoard ? <ScoreBoard /> : ''}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    showScoreBoard: state.showScoreBoard
  };
};

export default connect(mapStateToProps)(App);
