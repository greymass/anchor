import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionMessageUnsignedSign } from './Sign';

const mockProps = {
  onClose: () => null,
  t: text => text,
  transaction: {
    transaction: {
      signatures: [],
      transaction: {
        actions: []
      }
    }
  },
};

describe('GlobalTransactionMessageUnsignedSign', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionMessageUnsignedSign {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

