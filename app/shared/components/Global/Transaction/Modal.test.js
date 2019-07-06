import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalTransactionHandler from './Handler';

const mockProps = {
  actionName: 'claimrewards',
  actions: {},
  blockExplorers: {},
  button: <React.Fragment />,
  content: <React.Fragment />,
  icon: 'warning',
  openModal: false,
  title: 'title',
  settings: {},
  size: 'small',
  system: {},
};

describe('GlobalTransactionHandler', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionHandler {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

