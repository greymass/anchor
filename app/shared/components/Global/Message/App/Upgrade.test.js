import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalMessageAppUpgrade } from './Upgrade';

const mockProps = {
  actions: {},
  constants: { version: 1, versioninfo: { 1: 'constant' } },
  t: jest.fn,
};

describe('GlobalMessageAppUpgrade', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalMessageAppUpgrade {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
