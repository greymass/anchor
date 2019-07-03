import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalMessageContractBase } from './Base';

const mockProps = {
  children: {},
  t: jest.fn,
};

describe('GlobalMessageContractBase', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalMessageContractBase {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
