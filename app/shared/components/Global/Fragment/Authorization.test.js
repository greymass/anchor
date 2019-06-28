import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalFragmentAuthorization } from './Authorization';

const mockProps = {
  account: {},
  authorization: {},
  pubkey: 'EOSXXXX',
  t: jest.fn,
};

describe('GlobalFragmentAuthorization', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalFragmentAuthorization {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
