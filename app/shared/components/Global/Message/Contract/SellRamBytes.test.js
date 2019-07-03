import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalMessageContractSellRamBytes } from './SellRamBytes';

const mockProps = {
  data: {},
  t: jest.fn,
};

describe('GlobalMessageContractSellRamBytes', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalMessageContractSellRamBytes {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
