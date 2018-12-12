import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';

it('renders without crashing', () => {
  const mockStore = configureStore();
  const initialState = {
    players: {
      player1: {
        name: ''
      },
      player2: {
        name: ''
      }
    }
  };
  let store = mockStore(initialState);
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
