import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ScrollToTop />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

