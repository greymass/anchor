import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalTransactionViewDetail } from './Overview';

const mockProps = {
  t: text => text,
  transaction: {
    data: {
      transaction: {
        transaction: {
          actions: []
        }
      }
    }
  },
};

describe('GlobalTransactionViewOverview', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalTransactionViewDetail {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

