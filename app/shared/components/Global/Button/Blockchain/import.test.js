import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalButtonBlockchainImport } from './Import';

const mockProps = {
  connection: {},
  settings: {},
  t: () => null,
};

describe('GlobalButtonBlockchainImport', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalButtonBlockchainImport {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
