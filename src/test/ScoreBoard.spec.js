import React from 'react';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import ConnectedScoreBoard, {
  ScoreBoard
} from '../components/ScoreBoard/ScoreBoard';
// import { addPlayerName } from '../Redux/actions/player-form-actions';

Enzyme.configure({ adapter: new Adapter() });
describe('Testing PlayerForm component with store store', () => {
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
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = Enzyme.render(
      <Provider store={store}>
        <ConnectedScoreBoard />
      </Provider>
    );
  });
  it('+++ check Prop matches with initialState', () => {
    expect(container.prop('players')).toEqual(initialState.player);
  });
});

describe('PlayerForm Component', () => {
  let wrapper;
  const players = {
    player1: {
      name: ''
    },
    player2: {
      name: ''
    }
  };
  beforeEach(() => {
    wrapper = Enzyme.mount(<ScoreBoard players={players} />);
  });

  it('+++ check toss button click and updates message', () => {
    const spy = jest.spyOn(ScoreBoard.prototype, 'handleToss');
    let wrapper = Enzyme.shallow(<ScoreBoard players={players} />);
    wrapper
      .find('#tossButton')

      .simulate('click');
    expect(wrapper.state().message).toContain('serves');
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('+++ check play button click', () => {
    const spy = jest.spyOn(ScoreBoard.prototype, 'handlePlay');
    Enzyme.shallow(<ScoreBoard players={players} />)
      .setState({ toss: true })
      .find('#playButton')
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
 
  it('+++ check score update on play button click', () => {
    const spy = jest.spyOn(ScoreBoard.prototype, 'handlePlay');
    let wrapper = Enzyme.shallow(<ScoreBoard players={players} />);
    wrapper
      .setState({ toss: true })
      .find('#playButton')
      .simulate('click');
    expect(
      wrapper.state().player1Points === 1 || wrapper.state().player2Points === 1
    ).toBeTruthy();
  });
  it('+++ check handleServe() operation for dues condition', () => {
    const wrapper = Enzyme.shallow(<ScoreBoard players={players} />);
    wrapper.setState({ toss: true, player1Points: 3, player2Points: 3 });
    const instance = wrapper.instance();
    instance.handleScoreIncrement();
    expect(wrapper.state('dues')).toBe(true);
  });
  it('+++ check handleServe() operation for Advantage condition', () => {
    const wrapper = Enzyme.shallow(<ScoreBoard players={players} />);
    wrapper.setState({ toss: true, player1Points: 3, player2Points: 4 });
    const instance = wrapper.instance();
    instance.handleScoreIncrement();

    expect(wrapper.state('advantage')).toBe('player2');
  });
  it('+++ check gamePointCalculator function to update State', () => {
    const wrapper = Enzyme.shallow(<ScoreBoard players={players} />);
    wrapper.setState({ toss: true });
    const instance = wrapper.instance();
    instance.gamePointCaculator('player1');

    expect(wrapper.state('1')).toEqual({ player1: 1, player2: 0 });
  });
  it('+++ check setPointCalculator function to update State', () => {
    const wrapper = Enzyme.shallow(<ScoreBoard players={players} />);
    wrapper.setState({ toss: true, 1: { player1: 0, player2: 4 } });
    const instance = wrapper.instance();
    instance.setPointCaculator();

    expect(wrapper.state('player2Set')).toBe(1);
  });
  it('+++ check matchSetCalculator function to update State', () => {
    const wrapper = Enzyme.shallow(<ScoreBoard players={players} />);
    wrapper.setState({ toss: true, player2Set: 1 });
    const instance = wrapper.instance();
    instance.matchSetCalculator('player2Set', 'player2');

    expect(wrapper.state('player2Set')).toBe(2);
    expect(wrapper.state('stopPlay')).toBe(true);
  });
});