import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionViewFull } from './Full';

const mockProps = {
  t: text => text,
  transaction: {},
};

describe('GlobalTransactionViewFull', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionViewFull {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

