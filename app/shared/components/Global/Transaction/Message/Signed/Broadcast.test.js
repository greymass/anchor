import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionMessageSignedBroadcast } from './Broadcast';

const mockProps = {
  onClose: () => null,
  t: text => text,
  transaction: {},
};

describe('GlobalTransactionMessageSignedBroadcast', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionMessageSignedBroadcast {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
