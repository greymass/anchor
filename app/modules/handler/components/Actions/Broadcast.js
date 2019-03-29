// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon } from 'semantic-ui-react';

class PromptActionBroadcast extends Component<Props> {
  render() {
    const {
      disabled,
      loading,
      onClick,
      t,
      wallet,
    } = this.props;
    return (
      <Button
        content={(
          <Header
            style={{ color: '#ececec' }}
            textAlign="left"
          >
            <Icon name="wifi" />
            <Header.Content>
              <Header.Subheader style={{ color: '#ececec', fontWeight: 'bold' }}>
                Broadcast Transaction
              </Header.Subheader>
              {wallet.account}@{wallet.authorization}
            </Header.Content>
          </Header>
        )}
        color="purple"
        disabled={disabled}
        floated="right"
        loading={loading}
        onClick={onClick}
      />
    );
  }
}

export default translate('global')(PromptActionBroadcast);
