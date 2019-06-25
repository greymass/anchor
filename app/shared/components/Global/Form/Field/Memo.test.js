import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormFieldMemo from './Memo';

const mockProps = {
  label: 'testing account field',
  loading: false,
  name: 'account_field',
};

describe('GlobalFormFieldMemo', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormFieldMemo {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
