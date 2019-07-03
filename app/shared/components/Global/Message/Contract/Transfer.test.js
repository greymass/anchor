import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalMessageContractTransfer } from './Transfer';

const mockProps = {
  data: {},
  t: jest.fn,
};

describe('WalletMessageContractTransfer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalMessageContractTransfer {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
