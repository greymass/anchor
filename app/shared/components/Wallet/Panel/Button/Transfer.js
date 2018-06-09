// @flow
import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import FormMessageTransactionSuccess from '../../../Global/Form/Message/TransactionSuccess';
import WalletPanelFormTransfer from '../Form/Transfer';

type Props = {
  actions: {
    clearSystemState: () => void
  },
  balances: {},
  settings: {},
  system: {}
};

export default class WalletPanelButtonTransfer extends Component<Props> {
  props: Props;

  state = {
    open: false
  }

  onOpen = () => {
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
      balances,
      settings,
      system
    } = this.props;

    const {
      open
    } = this.state;

    const lastTransaction = system.TRANSFER_LAST_TRANSACTION;
    const hasTransaction = (lastTransaction && lastTransaction.transaction_id);

    return (
      <I18n ns="transfer">
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
                  content={t('transfer_button_cta')}
                  fluid
                  icon="exchange"
                  onClick={this.onOpen}
                />
              )}
              open={open}
              onClose={this.onClose}
              size="small"
            >
              <Header icon="exchange" content={t('transfer_modal_title')} />
              <Modal.Content>
                {(hasTransaction)
                  ? (
                    <FormMessageTransactionSuccess
                      onClose={this.onClose}
                      transaction={lastTransaction}
                    />
                  )
                  : (
                    <WalletPanelFormTransfer
                      actions={actions}
                      balances={balances}
                      onClose={this.onClose}
                      settings={settings}
                      system={system}
                    />
                  )
                }
              </Modal.Content>
            </Modal>
          )
        }
      </I18n>
    );
  }
}
