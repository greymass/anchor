import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalFragmentBlockchain } from './Blockchain';

const mockProps = {
  blockchain: {},
  t: jest.fn,
};

describe('GlobalFragmentBlockchain', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFragmentBlockchain {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
