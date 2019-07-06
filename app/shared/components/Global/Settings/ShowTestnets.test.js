import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalSettingsResourceDisplayFormat from './ShowTestnets';

const mockProps = {
  defaultValue: 'defaultValue',
  name: 'showTestnets',
  selection: [],
  t: text => text,
};

describe('GlobalSettingsResourceDisplayFormat', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalSettingsResourceDisplayFormat {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
