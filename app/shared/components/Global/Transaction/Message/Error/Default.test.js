import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionMessageErrorDefault } from './Default';

const mockProps = {
  error: 'error message',
  t: text => text,
};

describe('GlobalTransactionMessageErrorDefault', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionMessageErrorDefault {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
