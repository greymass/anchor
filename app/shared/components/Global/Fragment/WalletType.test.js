import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalFragmentWalletType } from './WalletType';

const mockProps = {
  mode: 'hot',
  t: jest.fn,
};

describe('GlobalFragmentWalletType', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFragmentWalletType {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
