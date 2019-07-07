import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalTransactionHandler from './Handler';

const mockProps = {
  actionName: 'claimrewards',
  actions: {},
  blockExplorers: {},
  content: <React.Fragment />,
  contract: {},
  hideClose: false,
  onClose: () => null,
  onSubmit: () => null,
  settings: {},
  system: {},
  t: text => text,
  transaction: {},
};

describe('GlobalTransactionHandler', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionHandler {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

