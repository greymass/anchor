import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionMessageErrorAuthorization } from './Authorization';

const mockProps = {
  error: 'error message',
  t: text => text,
};

describe('GlobalTransactionMessageErrorAuthorization', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionMessageErrorAuthorization {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
