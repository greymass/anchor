import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalSettingsLanguage } from './Language';

const mockProps = {
  name: 'transfer filter',
  selection: [],
  setLanguage: jest.fn,
  t: text => text,
};

describe('GlobalSettingsLanguage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalSettingsLanguage {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
