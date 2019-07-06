import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalSettingsIdleTimeout } from './IdleTimeout';

const mockProps = {
  defaultValue: 'default',
  name: 'transfer filter',
  selection: [],
  t: text => text,
};

describe('GlobalSettingsIdleTimeout', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalSettingsIdleTimeout {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
