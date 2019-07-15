import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalSettingsLanguage } from './Language';

const mockProps = {
  name: 'transfer filter',
  selection: false,
  setLanguage: 'en-USapp/shared/components/Global/Settings/FilterSpamTransfers.test.js',
  t: text => text,
};

describe('GlobalSettingsLanguage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalSettingsLanguage {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
