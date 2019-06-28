import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalFragmentChainLogo } from './ChainLogo';

const mockProps = {
  avatar: {},
  className: 'className',
  chainId: 'chainId',
  name: 'chain logo name',
  noPopup: true,
  size: 3,
  style: { marginTop: 10 },
  t: jest.fn,
};

describe('GlobalFragmentChainLogo', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFragmentChainLogo {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
