import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionMessageSuccess } from './Success';

const mockProps = {
  blockExplorers: {},
  hideClose: false,
  onClose: () => null,
  settings: {},
  t: text => text,
  transaction: {},
  transactions: [],
};

describe('GlobalTransactionMessageSuccess', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionMessageSuccess {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

