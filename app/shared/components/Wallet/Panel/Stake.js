// @flow
import React, { Component } from 'react';
import { Grid, Transition, Modal, Button, Header, Icon } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import StakeStats from './Stake/Stats';
import StakeForm from './Stake/Form';

type Props = {
  actions: {},
  accounts: {},
  balances: {},
  settings: {},
  validate: {},
};

export default class Stake extends Component<Props> {
  props: Props;

  // onOpen = () => this.setState({ open: true });
  // onClose = () => this.setState({ open: false });

  render() {
    const {
      actions,
      accounts,
      balances,
      keys,
      settings,
      validate,
      wallet
    } = this.props;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Modal
              trigger={(
                <Button
                  color="blue"
                  content={t('stake_form')}
                  fluid
                  icon="money"
                />
              )}
              open={false}
              size="tiny"
            >
              <Header icon="stake" content={t('wallet_panel_wallet_unlock_modal_title')} />
              <Modal.Content>
                <StakeForm
                  account={accounts && accounts[settings.account]}
                  key="StakeForm"
                  settings={settings}
                  actions={actions}
                  validate={validate}
                  balance={balances && balances[settings.account]}
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={this.onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
                <Button
                  color="green"
                  content={t('wallet_panel_wallet_unlock')}
                  icon="money"
                  onClick={this.onSubmit}
                />
              </Modal.Actions>
            </Modal>
          )
        }
      </I18n>
    );
  }
}
