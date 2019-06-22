import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalDataBytes from './Bytes';

const mockProps = {
  bytes: 1000,
};

describe('GlobalDataBytes', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalDataBytes {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
