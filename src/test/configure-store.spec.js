import configureStore from '../Redux/configure-store';
import initialState from '../Redux/initialState';

describe('Testing configureStore', () => {
  it('+++ check store to return initialState', () => {
    expect(configureStore().getState()).toEqual(initialState);
  });
});
