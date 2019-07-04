import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GlobalModalExplorerLink from './ExplorerLink';

const mockProps = {
  t: text => text,
  blockExplorers: {
    'bloks.io': {
      txid: 'https://bloks.io/tx/{txid}',
      account: 'https://bloks.io/accounts/{account}',
    }
  },
  content: 'Click Here',
  linkData: 'teamgreymass',
  linkType: 'account',
  settings: { blockExplorer: 'bloks.io' }
};

describe('GlobalModalExplorerLink', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GlobalModalExplorerLink {...mockProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
