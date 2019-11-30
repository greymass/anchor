// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { times } from 'lodash';
import { Button, Grid, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';

import GlobalFormFieldKeyPrivate from '../Global/Form/Field/Key/Private';
import GlobalButtonElevate from '../../containers/Global/Button/Elevate';
import WalletPanelFormHash from '../Wallet/Panel/Form/Hash';

class ToolsKeyImport extends Component<Props> {
  state = {
    valid: false,
    value: false,
  }
  onChange = (e, { publicKey, valid, value }) => this.setState({ publicKey, valid, value })
  saveKeyPairs = (password) => {
    const { publicKey, value } = this.state;
    this.props.actions.importKeypairStorage(password, [[publicKey, value]]);
    if (this.props.onSave) {
      this.props.onSave();
    }
  }
  render() {
    const {
      actions,
      settings,
      t
    } = this.props;
    const {
      valid,
    } = this.state;

    if (!settings.walletHash) {
      return (
        <Segment style={{ margin: 0 }}>
          <Grid divided="vertically" padded="vertically" stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header size="large">
                  <Icon name="lock" />
                  <Header.Content>
                    {t('global_account_import_private_requires_hash_header_r2')}
                    <Header.Subheader>
                      {t('global_account_import_private_requires_hash_subheader_r2')}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column verticalAlign="middle" textAlign="center">
                <p>
                  <WalletPanelFormHash
                    actions={actions}
                  />
                </p>
                <p>
                  Ensure you keep a copy of both your password and your keys safely offline. This password cannot be recovered.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
    }
    return (
      <Segment attached="bottom">
        <Header>
          {t('welcome:welcome_key_coldwallet')}
          <Header.Subheader>
            Import a private key for use within this wallet.
          </Header.Subheader>
        </Header>
        <Segment basic padded textAlign="center">
          <GlobalFormFieldKeyPrivate
            onChange={this.onChange}
          />
          <GlobalButtonElevate
            onSuccess={(password) => this.saveKeyPairs(password)}
            trigger={(
              <Button
                centered
                color="purple"
                content={t('tools:tools_keys_key_generation_save_keys')}
                disabled={!valid}
                icon="save"
              />
            )}
          />
        </Segment>
      </Segment>
    );
  }
}

export default translate(['global', 'tools'])(ToolsKeyImport);
