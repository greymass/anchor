import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalTransactionViewAction from './Action';

const mockProps = {
  action: {},
};

describe('GlobalTransactionViewAction', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionViewAction {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

