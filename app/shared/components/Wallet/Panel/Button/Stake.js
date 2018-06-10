// @flow
import React, { Component } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import StakeForm from '../Form/Stake';

type Props = {
  actions: {
    clearSystemState: () => void
  },
  accounts: {},
  balances: {},
  settings: {},
  validate: {},
  system: {}
};

export default class WalletPanelButtonStake extends Component<Props> {
  props: Props;

  state = {
    open: false
  }

  onOpen = () => {
    const { actions } = this.props;
    const { resetStakeForm } = actions;

    resetStakeForm();

    this.setState({ open: true });
  }

  onClose = () => {
    this.setState({ open: false }, () => {
      this.props.actions.clearSystemState();
    });
  }

  render() {
    const {
      actions,
      accounts,
      balances,
      settings,
      validate,
      system
    } = this.props;

    const {
      open
    } = this.state;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Modal
              centered={false}
              closeIcon={true}
              closeOnDimmerClick={false}
              closeOnDocumentClick={false}
              trigger={(
                <Button
                  color="blue"
                  content={t('stake_button_cta')}
                  fluid
                  icon="microchip"
                  onClick={this.onOpen}
                />
              )}
              open={open}
              onClose={this.onClose}
              size="small"
            >
              <Header icon="microchip" content={t('stake_modal_title')} />
              <Modal.Content>
                <StakeForm
                  account={accounts[settings.account]}
                  key="StakeForm"
                  settings={settings}
                  actions={actions}
                  onClose={this.onClose}
                  validate={validate}
                  balance={balances[settings.account]}
                  system={system}
                />
              </Modal.Content>
            </Modal>
          )
        }
      </I18n>
    );
  }
}
