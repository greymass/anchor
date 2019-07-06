import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionMessageError } from './Error';

const mockProps = {
  error: 'error message',
  onClose: () => null,
  style: { margin: '10px' },
  t: text => text,
  transaction: {},
};

describe('GlobalTransactionMessageError', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionMessageError {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

