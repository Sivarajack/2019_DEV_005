import { ADD_PLAYER_NAME, TOGGLE_SCORE_BOARD } from '../../Constants';
import initialState from '../initialState';

export function players(state = initialState.players, action) {
  switch (action.type) {
    case ADD_PLAYER_NAME:
      return Object.assign({}, state, {
        [action.payload.id]: {
          name: action.payload.value
        }
      });

    default:
      return state;
  }
}

export function showScoreBoard(state = initialState.showScoreBoard, action) {
  switch (action.type) {
    case TOGGLE_SCORE_BOARD:
      return Object.assign({}, { showScoreBoard: true });
    default:
      return state;
  }
}

