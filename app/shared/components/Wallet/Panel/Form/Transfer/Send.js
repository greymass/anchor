// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Header, Icon, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../../../Global/Form/Field/Generic';
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
      validQuantityFormat: true,
      waiting: false,
      waitingStarted: 0
    };
  }

  state = {};

  onChange = (e, { name, value, valid }) => {
    const newState = { [name]: value };
    if (name === 'quantity') {
      const [, symbol] = value.split(' ');
      newState.symbol = symbol;
    }

    newState[`${name}Valid`] = valid;

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

  onError = (error) => {
    let errorMessage;

    if (error !== true) {
      errorMessage = error;
    }

    this.setState({
      submitDisabled: true,
      formError: errorMessage
    });
  }

  errorsInForm = () => {
    const {
      quantity,
      quantityValid,
      toValid,
      memo,
      to,
      quantity
    } = this.state;

    if (!quantityValid) {
      return 'invalid_amount';
    }

    if (!toValid) {
      return 'invalid_account_name';
    }

    if (!memoValid) {
      return 'invalid_memo';
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
      from,
      memo,
      quantity,
      symbol,
      to,
      waiting,
      waitingStarted
    } = this.state;

    const balance = balances[settings.account];
    const asset = 'EOS';

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
              <Header>
                {`${t('transfer_header_available_one')} ${balance[asset]} ${t('transfer_header_available_one')}`}
              </Header>
              <GlobalFormFieldGeneric
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

export default translate('transfer')(WalletPanelFormTransfer);
