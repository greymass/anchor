import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionViewDetail } from './Detail';

const mockProps = {
  expired: false,
  signed: true,
  t: text => text,
  transaction: {},
};

describe('GlobalTransactionViewDetail', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionViewDetail {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

