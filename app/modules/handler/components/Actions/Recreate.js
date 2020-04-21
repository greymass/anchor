// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
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
              {t('handler_recreate_header')}
              <Header.Subheader style={{ color: '#ececec', fontWeight: 'bold' }}>
                {t('handler_action_recreate_subheader')}
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

export default withTranslation('global')(PromptActionBroadcast);
