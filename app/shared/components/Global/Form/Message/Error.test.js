import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalFormMessageError from './Error';

const mockProps = {
  chainSymbol: 'EOS',
  error: 'there is an error!',
  onClose: () => null,
  style: { marginTop: 10 },
  t: () => null,
};

describe('GlobalFormMessageError', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFormMessageError {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
