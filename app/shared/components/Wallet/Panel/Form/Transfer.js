// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import FormFieldAccount from '../../../Global/Form/Field/Account';
import FormFieldGeneric from '../../../Global/Form/Field/Generic';
import FormFieldMultiToken from '../../../Global/Form/Field/MultiToken';
import FormMessageError from '../../../Global/Form/Message/Error';
import WalletMessageContractTransfer from '../../../Global/Message/Contract/Transfer';

class WalletPanelFormTransfer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      from: props.settings.account,
      memo: '',
      quantity: '',
      symbol: 'EOS',
      to: '',
      waiting: false,
      waitingStarted: 0
    };
  }

  state = {};

  onChange = (e, { name, value }) => {
    const newState = { [name]: value };
    if (name === 'quantity') {
      const [, symbol] = value.split(' ');
      newState.symbol = symbol;
    }
    this.setState(newState);
  }

  onSubmit = () => {
    this.setState({
      confirming: true,
      waiting: true,
      waitingStarted: new Date()
    });
    const tick = setInterval(this.tick, 250);
    // Make the user wait 3 seconds before they can confirm
    setTimeout(() => {
      clearInterval(tick);
      this.setState({
        waiting: false
      });
    }, 3000);
  }

  tick = () => this.setState({ waiting: true });

  onCancel = (e) => {
    this.setState({
      confirming: false,
      waiting: false
    });
    e.preventDefault();
    return false;
  }

  onConfirm = (e) => {
    const {
      from,
      memo,
      quantity,
      symbol,
      to
    } = this.state;
    this.setState({ confirming: false }, () => {
      this.props.actions.transfer(from, to, quantity, memo, symbol);
    });
    e.preventDefault();
    return false;
  }

  render() {
    const {
      balances,
      onClose,
      settings,
      system,
      t
    } = this.props;
    const {
      confirming,
      from,
      memo,
      quantity,
      symbol,
      to,
      waiting,
      waitingStarted
    } = this.state;
    const balance = balances[settings.account];
    const contract = balances.__contracts[symbol];
    const asset = 'EOS';
    const error = system.TRANSFER_LAST_ERROR;
    const validTransfer = (quantity <= 0 || !to || !from);
    let errorMsg = JSON.stringify(error);
    if (error && error.error) {
      if (error.error.details[0]) {
        errorMsg = error.error.details[0].message;
      } else {
        errorMsg = t('error.error.name');
      }
    }
    if (error && error.message) {
      errorMsg = error.message;
    }
    const secondsElapsed = new Date() - waitingStarted;
    const secondsRemaining = parseInt((3000 - secondsElapsed) / 1000, 10) + 1;
    return (
      <Form
        loading={system.TRANSFER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {(confirming)
          ? (
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
                onClick={this.onCancel}
              >
                <Icon name="x" /> {t('cancel')}
              </Button>
            </Segment>
          )
          : (
            <Segment basic clearing>
              <FormFieldAccount
                disabled
                label={t('transfer_label_from')}
                name="from"
                onChange={this.onChange}
                value={settings.account}
              />
              <FormFieldAccount
                autoFocus
                label={t('transfer_label_to')}
                name="to"
                onChange={this.onChange}
                value={to}
              />
              <FormFieldMultiToken
                assets={Object.keys(balances[settings.account])}
                icon="x"
                label={t('transfer_label_token_and_quantity')}
                loading={false}
                maximum={balance[asset]}
                name="quantity"
                onChange={this.onChange}
                value={quantity}
              />
              <FormFieldGeneric
                icon="x"
                label={t('transfer_label_memo')}
                loading={false}
                name="memo"
                onChange={this.onChange}
                value={memo}
              />

              <FormMessageError
                error={error}
              />

              <Divider />
              <Button
                content={t('confirm')}
                disabled={validTransfer}
                floated="right"
                primary
              />
              <Button
                onClick={onClose}
              >
                <Icon name="x" /> {t('cancel')}
              </Button>
            </Segment>
          )
        }
      </Form>
    );
  }
}

export default translate('transfer')(WalletPanelFormTransfer);
