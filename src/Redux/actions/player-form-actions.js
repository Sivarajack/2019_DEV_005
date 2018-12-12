import { ADD_PLAYER_NAME, TOGGLE_SCORE_BOARD } from '../../Constants';

export function addPlayerName(payload) {
  return {
    type: ADD_PLAYER_NAME,
    payload
  };
}

export function toggleScoreBoard() {
  return {
    type: TOGGLE_SCORE_BOARD
  };
}

