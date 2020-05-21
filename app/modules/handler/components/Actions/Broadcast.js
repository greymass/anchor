// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Header, Icon, Label } from 'semantic-ui-react';

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
        animated="fade"
        as="div"
        disabled={disabled}
        floated="right"
        labelPosition="left"
        onClick={onClick}
      >
        <Label
          as="a"
          basic
          pointing="right"
        >
          <Header textAlign="left">
            <Header.Content>
              <Header.Subheader style={{ fontWeight: 'bold' }}>
                {t('handler_action_broadcast_header')}
              </Header.Subheader>
              {wallet.account}@{wallet.authorization}
            </Header.Content>
          </Header>
        </Label>
        <Button
          color="purple"
          icon
          loading={loading}
          style={{ position: 'relative' }}
        >
          <Button.Content hidden style={{ marginTop: '-0.75em' }}>
            <Icon
              name="cloud upload"
              size="large"
              style={{ marginRight: 0 }}
            />
          </Button.Content>
          <Button.Content visible style={{ margin: '0 1em' }}>
            <Icon
              name="cloud"
              size="large"
              style={{ marginRight: 0 }}
            />
          </Button.Content>
        </Button>
      </Button>
    );
  }
}

export default withTranslation('handler')(PromptActionBroadcast);
