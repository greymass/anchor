import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalModalSettingsCustomTokensForm } from './Form';

const mockProps = {
  onSubmit: jest.fn,
  t: text => text,
  token: { issuer: 'teamgreymass' },
  values: { account: 'eosio', symbol: 'EOS'},
};

describe('GlobalModalSettingsCustomTokensForm', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalModalSettingsCustomTokensForm {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
