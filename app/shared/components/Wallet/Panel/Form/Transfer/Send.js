// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Header, Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import FormFieldAccount from '../../../../Global/Form/Field/Account';
import FormFieldGeneric from '../../../../Global/Form/Field/Generic';
import FormFieldMultiToken from '../../../../Global/Form/Field/MultiToken';
import FormMessageError from '../../../../Global/Form/Message/Error';
import WalletPanelFormTransferSendConfirming from './Send/Confirming';

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

  onConfirm = () => {
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

  onSendClick = (e) => {
    this.setState({
      sending: true
    });

    e.preventDefault();
    return false;
  }

  onReceiveClick = (e) => {
    this.setState({
      sending: false
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
      sending,
      to,
      waiting,
      waitingStarted
    } = this.state;

    const balance = balances[settings.account];
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

    return (
      <Form
        loading={system.TRANSFER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {(confirming)
          ? (
            <WalletPanelFormTransferSendConfirming
              balances={balances}
              from={from}
              memo={memo}
              onConfirm={this.onConfirm}
              quantity={quantity}
              symbol={symbol}
              to={to}
              waiting={waiting}
              waitingStarted={waitingStarted}
            />
          ) : (
            <Segment basic clearing>
              <GlobalFormFieldAccount
                disabled
                fluid
                label={t('transfer_label_from')}
                name="from"
                onChange={this.onChange}
                value={settings.account}
              />
              <GlobalFormFieldAccount
                autoFocus
                fluid
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
                error={errorMsg}
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
          )}
      </Form>
    );
  }
}

export default translate('transfer')(WalletPanelFormTransfer);
