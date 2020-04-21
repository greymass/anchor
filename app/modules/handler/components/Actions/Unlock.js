// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Label, Header, Icon } from 'semantic-ui-react';
import GlobalButtonElevate from '../../../../shared/containers/Global/Button/Elevate';

class PromptActionUnlock extends Component<Props> {
  render() {
    const {
      disabled,
      loading,
      onClick,
      t,
      wallet,
    } = this.props;
    return (
      <GlobalButtonElevate
        onSuccess={(password) => onClick(password)}
        trigger={(
          <Button
            animated="fade"
            as="div"
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
                    {t('handler_unlock_header')}
                  </Header.Subheader>
                  {wallet.account}@{wallet.authorization}
                </Header.Content>
              </Header>
            </Label>
            <Button
              color="blue"
              loading={loading}
              icon
              style={{ position: 'relative' }}
            >
              <Button.Content hidden style={{ marginTop: '-0.75em' }}>
                <Icon
                  name="unlock"
                  size="large"
                  style={{ marginRight: 0 }}
                />
              </Button.Content>
              <Button.Content visible style={{ margin: '0 1em' }}>
                <Icon
                  name="lock"
                  size="large"
                  style={{ marginRight: 0 }}
                />
              </Button.Content>
            </Button>
          </Button>
        )}
        wallet={wallet}
      />
    );
  }
}

export default withTranslation('global')(PromptActionUnlock);
