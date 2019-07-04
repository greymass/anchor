import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GlobalModalDangerLink } from './DangerLink';

const mockProps = {
  content: <React.Fragment />,
  link: 'https://link.com',
  settings: { skipLinkModal: true },
  t: text => text,
};

describe('GlobalModalDangerLink', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalModalDangerLink {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
