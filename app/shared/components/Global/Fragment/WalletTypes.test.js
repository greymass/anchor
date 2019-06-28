import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalFragmentWalletTypes } from './WalletTypes';

const mockProps = {
  onChange: jest.fn,
  t: jest.fn,
};

describe('GlobalFragmentWalletTypes', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFragmentWalletTypes {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
