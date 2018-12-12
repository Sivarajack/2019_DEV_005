import { ADD_PLAYER_NAME } from '../../Constants';
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


