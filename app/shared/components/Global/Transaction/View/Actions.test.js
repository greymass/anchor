import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionViewActions } from './Actions';

const mockProps = {
  actions: {},
  t: text => text,
};

describe('GlobalTransactionViewActions', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionViewActions {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

