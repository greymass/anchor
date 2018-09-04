import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import BlockProducers from './Producers/BlockProducers';
import Proxies from './Producers/Proxies';

class Producers extends Component<Props> {
  render() {
    const {
      t
    } = this.props;

    return (
      <Tab panes={
          [
            { menuItem: t('producers_block_producers'), render: () => <Tab.Pane><BlockProducers {...this.props} /></Tab.Pane> },
            { menuItem: t('producers_proxies'), render: () => <Tab.Pane><Proxies {...this.props} /></Tab.Pane> }
          ]
        }
      />
    );
  }
}

export default translate('producers')(Producers);
