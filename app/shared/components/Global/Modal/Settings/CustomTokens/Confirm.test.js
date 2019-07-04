import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalModalSettingsCustomTokensConfirm } from './Confirm';

const mockProps = {
  t: jest.fn,
  onSubmit: jest.fn,
  token: { issuer: 'teamgreymass' }
};

describe('GlobalModalSettingsCustomTokensConfirm', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalModalSettingsCustomTokensConfirm {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
