import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppHeader from '../components/AppHeader/AppHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('Header Component', () => {
  let wrapper = Enzyme.shallow(<AppHeader />);
  it('Renders Application Heading', () => {
    expect(wrapper.find('h2').text()).toEqual('Tennis Kata');
  });
});