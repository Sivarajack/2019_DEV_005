import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlayerForm from '../components/PlayerForm/PlayerForm';

Enzyme.configure({ adapter: new Adapter() });

describe('PlayerForm Component', () => {
  let wrapper;
  const mockLoginfn1 = jest.fn();
  let players = {
    player1: {
      name: ''
    },
    player2: {
      name: ''
    }
  };
  beforeEach(() => {
    wrapper = Enzyme.mount(
      <PlayerForm addPlayerName={mockLoginfn1} players={players} />
    );
  });

  it('Number of input boxes', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('Name input function call', () => {
    const spy = jest.spyOn(PlayerForm.prototype, 'handleNameChange');
    const spy1 = jest.spyOn(PlayerForm.prototype, 'handleSubmit');

    Enzyme.shallow(
      <PlayerForm addPlayerName={mockLoginfn1} players={players} />
    )
      .find('#player1')
      .simulate('change', { target: { value: 'foo' } });
    Enzyme.shallow(
      <PlayerForm addPlayerName={mockLoginfn1} players={players} />
    )
      .find('#player2')
      .simulate('change', { target: { value: 'foo' } });
    Enzyme.shallow(
      <PlayerForm
        addPlayerName={mockLoginfn1}
        toggleScoreBoard={() => {}}
        players={players}
      />
    )
      .find('#playerForm')
      .simulate('submit', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy1).toHaveBeenCalledTimes(1);
  });
});
