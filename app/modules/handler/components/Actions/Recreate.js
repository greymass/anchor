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
    } = this.props;
    return (
      <Button
        content={(
          <Header
            style={{ color: '#ececec' }}
            textAlign="left"
          >
            <Icon name="redo" />
            <Header.Content>
              Recreate
              <Header.Subheader style={{ color: '#ececec', fontWeight: 'bold' }}>
                Transaction
              </Header.Subheader>
            </Header.Content>
          </Header>
        )}
        color="orange"
        disabled={disabled}
        floated="right"
        loading={loading}
        onClick={onClick}
      />
    );
  }
}

export default translate('global')(PromptActionBroadcast);
