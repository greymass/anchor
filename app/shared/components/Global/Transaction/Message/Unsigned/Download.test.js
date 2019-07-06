import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionMessageUnsignedDownload } from './Download';

const mockProps = {
  onClose: () => null,
  t: text => text,
  transaction: {},
};

describe('GlobalTransactionMessageUnsignedDownload', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionMessageUnsignedDownload {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
