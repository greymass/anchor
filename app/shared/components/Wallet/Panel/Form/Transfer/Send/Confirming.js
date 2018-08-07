// @flow
import React, { Component } from 'react';
import { Button, Divider, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import WalletMessageContractTransfer from '../../../../../Global/Message/Contract/Transfer';

class WalletPanelFormTransferSendConfirming extends Component<Props> {
  onConfirm = (e) => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
    e.preventDefault();
    return false;
  }

  render() {
    const {
      balances,
      from,
      memo,
      onBack,
      quantity,
      asset,
      to,
      t,
      waiting,
      waitingStarted
    } = this.props;

    const contract = balances.__contracts[asset.toUpperCase()].contract;

    const secondsElapsed = new Date() - waitingStarted;
    const secondsRemaining = parseInt((3000 - secondsElapsed) / 1000, 10) + 1;
    return (
      <Segment basic clearing vertical>
        <Header size="small">
          {t('transfer_confirming_title')}
          <Header.Subheader>
            {t('transfer_confirming_body')}
          </Header.Subheader>
        </Header>
        <Table compact definition striped>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>{t('transfer_label_from')}</Table.Cell>
              <Table.Cell>{from}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{t('transfer_label_to')}</Table.Cell>
              <Table.Cell>{to}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{t('transfer_label_quantity')}</Table.Cell>
              <Table.Cell>
                {quantity}
                {' '}
                ({contract})
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{t('transfer_label_memo')}</Table.Cell>
              <Table.Cell>{memo}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <WalletMessageContractTransfer
          data={{
            from,
            quantity,
            to,
            transaction: {
              delay: 60
            }
          }}
        />
        <Divider />
        <Button
          color="green"
          content={(waiting) ? `${t('confirm')} (${secondsRemaining})` : t('confirm')}
          disabled={waiting}
          floated="right"
          onClick={this.onConfirm}
        />
        <Button
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('back')}
        </Button>
      </Segment>
    );
  }
}

export default translate('transfer')(WalletPanelFormTransferSendConfirming);
