// @flow
import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalFragmentBlockchain extends Component<Props> {
  render() {
    const {
      blockchain,
      t
    } = this.props;
    if (blockchain) {
      return (
        <Popup
          content={`Chain ID: ${blockchain.chainId}`}
          hoverable
          inverted
          trigger={(
            <span>
              {blockchain.name}
            </span>
          )}
        />
      );
    }
    return false;
  }
}

export default translate('global')(GlobalFragmentBlockchain);
