import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

//import { GlobalModalAccountImport } from './Import';

const mockProps = {
  onClose: jest.fn,
  settings: { walletMode: 'hot' },
  t: jest.fn,
};

describe.skip('GlobalModalAccountImport', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<GlobalModalAccountImport {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
