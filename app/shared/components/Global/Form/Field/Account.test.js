import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalFormFieldAccount } from './Account';

const mockProps = {
  bytes: 1000,
  app: {},
  contacts: [{ accountName: 'teamgreymass' }],
  enableContacts: true,
  enableExchanges: true,
  showErrorOnInput: true,
  icon: 'warning',
  label: 'testing account field',
  name: 'account_field',
  t: () => null,
  width: 10,
};

describe('GlobalFormFieldAccount', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldAccount {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
