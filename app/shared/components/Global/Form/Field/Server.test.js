import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormFieldServer from './Server';

const mockProps = {
  fluid: true,
  icon: 'icon',
  label: 'multi token field',
  name: 'multi token field',
};

describe('GlobalFormFieldServer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldServer {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
