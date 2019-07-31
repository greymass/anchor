import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalMessageContractVoteProducer } from './VoteProducer';

const mockProps = {
  data: {},
  t: jest.fn,
};

describe('GlobalMessageVoteProducer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalMessageContractVoteProducer {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
