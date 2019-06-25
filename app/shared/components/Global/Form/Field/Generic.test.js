import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormFieldGeneric from './Generic';

const mockProps = {
  icon: 'warning',
  label: 'testing account field',
  name: 'account_field',
};

describe('GlobalFormFieldGeneric', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldGeneric {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
