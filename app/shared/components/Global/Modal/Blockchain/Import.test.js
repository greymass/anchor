import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalModalBlockchainImport } from './Import';

const mockProps = {
  onClose: jest.fn,
  open: false,
  settings: { walletMode: 'hot' },
  t: text => text,
  trigger: true
};

describe('GlobalModalBlockchainImport', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalModalBlockchainImport {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
