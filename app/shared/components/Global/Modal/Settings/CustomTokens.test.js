import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalModalSettingsCustomTokens } from './CustomTokens';

const mockProps = {
  account: 'teamgreymass',
  loading: false,
  settings: { customTokens: [] },
  symbol: 'EOS',
  token: { EOS: { issuer: 'teamgreymass' } },
  t: text => text,
};

describe('GlobalModalSettingsCustomTokens', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalModalSettingsCustomTokens {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
