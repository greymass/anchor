import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalFragmentWallet } from './Wallet';

const mockProps = {
  account: {},
  authorization: {},
  mode: 'hot',
  pubkey: 'EOSXXX',
};

describe('GlobalFragmentWallet', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFragmentWallet {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
