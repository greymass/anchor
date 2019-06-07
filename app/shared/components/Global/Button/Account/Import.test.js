import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalButtonAccountImport } from './Import';

const mockProps = {
  settings: {},
  t: () => null,
};

describe('GlobalButtonAccountImport', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalButtonAccountImport {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
