import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormFieldRam from './Ram';

const mockProps = {
  icon: 'icon',
  label: 'multi token field',
  name: 'multi token field',
  readOnly: false,
};

describe('GlobalFormFieldRam', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldRam {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
