import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalSettingsFilterSpamTransfers } from './FilterSpamTransfers';

const mockProps = {
  defaultValue: 'default',
  name: 'transfer filter',
  selection: [],
  t: text => text,
};

describe('GlobalSettingsFilterSpamTransfers', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalSettingsFilterSpamTransfers {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
