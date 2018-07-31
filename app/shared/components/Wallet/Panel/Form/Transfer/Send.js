// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Header, Message, Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import FormFieldMultiToken from '../../../../Global/Form/Field/MultiToken';
import FormMessageError from '../../../../Global/Form/Message/Error';
import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldMemo from '../../../../Global/Form/Field/Memo';
import WalletPanelFormTransferSendConfirming from './Send/Confirming';

const exchangeAccounts = ['bitfinexdep1', 'binancecleos', 'krakenkraken'];

class WalletPanelFormTransferSend extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      formError: false,
      from: props.settings.account,
      memo: '',
      memoValid: true,
      quantity: '',
      quantityValid: true,
      symbol: 'EOS',
      to: '',
      toValid: true,
      waiting: false,
      waitingStarted: 0
    };
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

  onChange = (e, { name, value, valid }) => {
    const newState = { [name]: value };
    if (name === 'quantity') {
      const [, symbol] = value.split(' ');
      newState.symbol = symbol;
    }

    newState[`${name}Valid`] = valid;

    newState.submitDisabled = false;
    newState.formError = false;

    this.setState(newState, () => {
      const error = this.errorInForm();

      if (error) {
        this.onError(error);
      }
    });
  }

  onError = (error) => {
    this.setState({
      submitDisabled: true,
      formError: error
    });
  }

  errorInForm = () => {
    const {
      memo,
      memoValid,
      quantityValid,
      to,
      toValid
    } = this.state;

    const {
      settings
    } = this.props;

    if (!quantityValid) {
      return 'invalid_amount';
    }

    if (!toValid) {
      return 'invalid_accountName';
    }

    if (!memoValid) {
      return 'invalid_memo';
    }

    if (to === settings.account) {
      return 'cannot_transfer_to_self';
    }

    if (exchangeAccounts.includes(to) && (!memo || memo.length === 0)) {
      return 'transferring_to_exchange_without_memo';
    }

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
      formError,
      from,
      memo,
      quantity,
      submitDisabled,
      symbol,
      to,
      waiting,
      waitingStarted
    } = this.state;

    const balance = balances[settings.account];
    const asset = 'EOS';

    let exchangeWarning;

    exchangeAccounts.forEach((exchangeAccount) => {
      if (memo.match(`.*?${exchangeAccount}.*?`)) {
        exchangeWarning = (
          <Message warning>
            {`${t('transfer_send_exchange_in_memo_one')} ${exchangeAccount} ${t('transfer_send_exchange_in_memo_two')}`}
          </Message>
        );
      }
    });

    const hasWarnings = exchangeWarning;

    return (
      <Form
        loading={system.TRANSFER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
        warning={hasWarnings}
      >
        {(confirming)
          ? (
            <WalletPanelFormTransferSendConfirming
              balances={balances}
              from={from}
              memo={memo}
              onClose={onClose}
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
                autoFocus
                fluid
                label={t('transfer_label_to')}
                name="to"
                onChange={this.onChange}
                value={to}
              />
              <FormFieldMultiToken
                balances={balances}
                icon="x"
                label={t('transfer_label_token_and_quantity')}
                loading={false}
                maximum={balance[asset]}
                name="quantity"
                onChange={this.onChange}
                onAssetChange={this.onAssetChange}
                settings={settings}
                value={quantity}
              />
              <p>
                {`${balance[asset].toFixed(4)} EOS ${t('transfer_header_available')}`}
              </p>
              <GlobalFormFieldMemo
                icon="x"
                label={t('transfer_label_memo')}
                loading={false}
                name="memo"
                onChange={this.onChange}
                value={memo}
              />

              <FormMessageError
                error={formError}
              />

              { exchangeWarning }

              <Divider />
              <Button
                content={t('confirm')}
                disabled={submitDisabled}
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

export default translate('transfer')(WalletPanelFormTransferSend);
