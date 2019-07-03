import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalMessageContractBuyRamBytes } from './BuyRamBytes';

const mockProps = {
  data: {},
  t: jest.fn,
};

describe('GlobalMessageContractBuyRamBytes', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalMessageContractBuyRamBytes {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
