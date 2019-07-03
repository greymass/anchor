import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalMessageAppUpgradeModal } from './Modal';

const mockProps = {
  actions: {},
  constants: {},
  name: 'Modal Name',
  version: 1,
};

describe('GlobalFragmentWalletTypes', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalMessageAppUpgradeModal {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
