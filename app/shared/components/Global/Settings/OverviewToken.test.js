import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalSettingsOverviewToken from './OverviewToken';

const mockProps = {
  chainId: 'chainId',
  defaultValue: 'eosio:EOS',
  name: 'overviewTokenName',
  scrolling: true,
  tokens: [],
};

describe('GlobalSettingsOverviewToken', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalSettingsOverviewToken {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
