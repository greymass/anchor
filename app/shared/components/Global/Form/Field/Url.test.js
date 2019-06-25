import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormFieldUrl from './Url';

const mockProps = {
  disabled: false,
  error: null,
  fluid: true,
  icon: 'icon',
  inline: true,
  label: 'multi token field',
  loading: false,
  name: 'multi token field',
  placeholder: 'string placeholder',
};

describe('GlobalFormFieldUrl', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldUrl {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
