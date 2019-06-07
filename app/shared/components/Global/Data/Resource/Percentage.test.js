import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalDataResourcePercentage from './Percentage';

const mockProps = {
  color: 'green',
  displayResourcesAvailableSetting: false,
  percentageUsed: 90,
  size: 'large',
  style: { margin: 10 },
  t: () => null,
};

describe('GlobalDataResourcePercentage', () => {
  it('renders correctly', () => {
    const wrapper =
      shallow(<GlobalDataResourcePercentage {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('displays resources available when setting enabled', () => {
    const wrapper = shallow(<GlobalDataResourcePercentage
      {...{ ...mockProps, displayResourcesAvailableSetting: true }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Progress').props().percent).toBe(10);
  });
});
