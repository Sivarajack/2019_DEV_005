import { combineReducers } from 'redux';
import {players, showScoreBoard} from './player-form-reducer';

export default combineReducers({ players, showScoreBoard });
