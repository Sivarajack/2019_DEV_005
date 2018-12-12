import { ADD_PLAYER_NAME, TOGGLE_SCORE_BOARD } from '../Constants';
import initialState from '../Redux/initialState';
import { toggleScoreBoard } from '../Redux/actions/player-form-actions';
import { players, showScoreBoard } from '../Redux/reducers/player-form-reducer';

describe('Player-Form reducer', () => {
  it('+++ check player reducer return expected result', () => {
    const payload = { id: 'player1', value: 'john' };
    expect(
      players(initialState.players, { type: ADD_PLAYER_NAME, payload })
    ).toEqual({
      player1: {
        name: 'john'
      },
      player2: {
        name: ''
      }
    });
  });
  it('+++ check showScoreBoard reducer return expected result ', () => {
    const payload = toggleScoreBoard();
    expect(showScoreBoard(initialState.showScoreBoard, payload)).toEqual({
      showScoreBoard: true
    });
  });
});
