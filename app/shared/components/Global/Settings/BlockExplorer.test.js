import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import GlobalSettingsBlockExplorer from './BlockExplorer';

const mockProps = {
  actions: {
    setSetting: sinon.stub(),
  },
  blockExplorers: { 'Bloks IO': { url: 'bloks.io' } },
  name: 'Block Explorer',
};

describe('GlobalSettingsBlockExplorer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalSettingsBlockExplorer {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls setSetting is called when onchange is called', () => {
    const wrapper = mount(<GlobalSettingsBlockExplorer {...mockProps} />);

    wrapper.find('Dropdown').first().props().onChange(null, { value: 'Bloks IO' });
    expect(wrapper.props().actions.setSetting.calledWith('blockExplorer', 'Bloks IO')).toBeTruthy();
  });
});
