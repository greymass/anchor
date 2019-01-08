// @flow
import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalFragmentAuthorization extends Component<Props> {
  render() {
    const {
      account,
      authorization,
      pubkey,
      t
    } = this.props;
    let element = (
      <span>
        {account}
      </span>
    );
    if (authorization) {
      element = (
        <span>
          <span>
            {account}
          </span>
          <span style={{ opacity: 0.4 }}>
            @{authorization}
          </span>
        </span>
      );
    }
    if (pubkey) {
      return (
        <Popup
          content={pubkey}
          header={t('public_key')}
          hoverable
          inverted
          trigger={element}
        />
      );
    }
    return element;
  }
}

export default translate('global')(GlobalFragmentAuthorization);
