import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormFieldMultiToken from './MultiToken';

const mockProps = {
  balances: { teamgreymass: { EOS: '10.0000 EOS' } },
  connection: {},
  label: 'multi token field',
  name: 'multi token field',
  settings: { account: 'teamgreymass' },
  value: '10.0000 EOS',
};

describe('GlobalFormFieldMultiToken', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldMultiToken {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
