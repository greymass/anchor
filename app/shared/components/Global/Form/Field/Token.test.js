import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormFieldToken from './Token';

const mockProps = {
  icon: 'icon',
  label: 'multi token field',
  loading: false,
  name: 'multi token field',
  placeholder: 'string placeholder',
};

describe('GlobalFormFieldToken', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldToken {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
