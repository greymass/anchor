import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalFragmentWalletType } from './WalletType';

const mockProps = {
  children: <React.Fragment />,
  content: <React.Fragment />,
  mode: 'hot',
  t: text => text,
};

describe('GlobalFragmentWalletType', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFragmentWalletType {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
