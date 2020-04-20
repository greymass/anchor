// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Header, Icon, Label } from 'semantic-ui-react';

import DangerLink from '../../../../shared/containers/Global/DangerLink';

class PromptActionCallback extends Component<Props> {
  render() {
    const {
      disabled,
      loading,
      prompt,
      settings,
      t,
      wallet,
    } = this.props;
    return (
      <DangerLink
        content={(
          <Button
            animated="fade"
            as="a"
            disabled={disabled}
            floated="right"
            labelPosition="left"
          >
            <Label
              as="a"
              basic
              pointing="right"
            >
              <Header textAlign="left">
                <Header.Content>
                  <Header.Subheader style={{ fontWeight: 'bold' }}>
                    {t('handler_callback_header')}
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
        )}
        link={prompt.callbackURL}
        settings={settings}
      />
    );
  }
}

export default withTranslation('global')(PromptActionCallback);
