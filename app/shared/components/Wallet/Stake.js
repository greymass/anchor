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
  system: {}
};

export default class Stake extends Component<Props> {
  props: Props;

  state = {
    open: false
  }

  onOpen = () => {
    const {resetStakeForm} = this.props.actions;

    resetStakeForm();

    this.setState({ open: true });
  }

  onClose = () => this.setState({ open: false });

  render() {
    const {
      actions,
      accounts,
      balances,
      keys,
      settings,
      validate,
      wallet,
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
              trigger={(
                <Button
                  color="blue"
                  content={t('stake_form')}
                  fluid
                  icon="money"
                  onClick={this.onOpen}
                />
              )}
              open={open}
              size="tiny"
            >
              <Header icon="money" content={t('stake_modal_title')} />
              <Modal.Content>
                <StakeForm
                  account={accounts[settings.account]}
                  key="StakeForm"
                  settings={settings}
                  actions={actions}
                  validate={validate}
                  balance={balances[settings.account]}
                  system={system}
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={this.onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
              </Modal.Actions>
            </Modal>
          )
        }
      </I18n>
    );
  }
}
