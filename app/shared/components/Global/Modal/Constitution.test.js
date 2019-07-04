import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ModalConstitution } from './Constitution';

const mockProps = {
  t: text => text,
};

describe('ModalConstitution', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ModalConstitution {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
