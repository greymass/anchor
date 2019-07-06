import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionMessageHardwareLedger } from './Ledger';

const mockProps = {
  t: text => text,
};

describe('GlobalTransactionMessageHardwareLedger', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionMessageHardwareLedger {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
