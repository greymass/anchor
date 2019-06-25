import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormFieldString from './String';

const mockProps = {
  disabled: false,
  fluid: true,
  icon: 'icon',
  label: 'multi token field',
  loading: false,
  name: 'multi token field',
  placeholder: 'string placeholder',
};

describe('GlobalFormFieldString', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldString {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
