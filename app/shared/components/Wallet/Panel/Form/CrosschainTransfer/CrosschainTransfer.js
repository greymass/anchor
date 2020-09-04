// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Form,
  Segment,
  Button,
  Divider,
  Icon,
  Message
} from 'semantic-ui-react';
import { debounce, findIndex, includes } from 'lodash';

import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import FormFieldMultiToken from '../../../../Global/Form/Field/MultiToken';
import GlobalFormFieldMemo from '../../../../Global/Form/Field/Memo';
import FormMessageError from '../../../../Global/Form/Message/Error';
import EOSContract from '../../../../../utils/EOS/Contract';
import WalletPanelCrosschainTransferConfirming from './Confirming';

class WalletPanelCrosschainTransfer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      asset: 'EOS',
      confirming: false,
      formError: false,
      from: props.settings.account,
      quantity: ' EOS',
      to: '',
      memo: '',
      destinationAsset: 'BEOS',
      waiting: false,
      waitingStarted: 0,
      storeName: 'gateway2beos',
      isValidAccount: false,
      apiUrl: 'https://gateway.beos.world/api/v2',
      submitDisabled: true,
      assetMemoCoinTypes: {}
    };
  }

  componentWillMount() {
    let apiUrl = this.state.apiUrl;
    let assetMemoCoinTypes = {};

    let coinTypesPromisecheck = fetch(apiUrl + '/coins', {
      method: 'get',
      headers: new Headers({Accept: 'application/json'})
    }).then(response => response.json());
    let tradingPairsPromisecheck = fetch(apiUrl + '/trading-pairs', {
        method: 'get',
        headers: new Headers({Accept: 'application/json'})
    }).then(response => response.json());

    Promise.all([coinTypesPromisecheck, tradingPairsPromisecheck]).then(
      json_responses => {
        let [coinTypes, tradingPairs] = json_responses;
        coinTypes.forEach(element => {
          if (element.walletType === 'eos') {
            let coinType = null;
            let memoCoinType = null;

            coinType = element.coinType;

            tradingPairs.find(element => {
              if (element.inputCoinType === coinType) {
                 memoCoinType = element.outputCoinType;
              }
            });

            assetMemoCoinTypes[element.walletSymbol] = memoCoinType;
          }
        });
        this.setState({
          assetMemoCoinTypes
        });
      }
    );
  }

  onConfirm = () => {
    const { from, to, quantity, storeName, asset, memo } = this.state;
    this.setState({ confirming: false }, () => {
      let newMemo = `pxeos:${to}:${memo}:`;
      if (this.state.assetMemoCoinTypes[asset]) {
        newMemo = `${this.state.assetMemoCoinTypes[asset]}:${to}:${memo}:`;
      }
      this.props.actions.transfer(from, 'gateway2beos', quantity, newMemo, asset);
      this.setState({
        to: '',
        quantity: ''
      })
    });
  };

  onSubmit = () => {
    this.setState({
      confirming: true,
      waiting: true,
      waitingStarted: new Date()
    });
    this.interval = setInterval(this.tick, 250);
    // Make the user wait 3 seconds before they can confirm
    setTimeout(() => {
      clearInterval(this.interval);
      this.setState({
        waiting: false
      });
    }, 3000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => this.setState({ waiting: true });

  onCancel = e => {
    this.setState({
      confirming: false,
      waiting: false
    });
    e.preventDefault();
    return false;
  };

  onBack = () => {
    this.setState({ confirming: false });
  };

  validateAccount = debounce(async (value, asset) => {
    this.setState({ formError: null });
    const { quantity } = this.state;
    const { balances, settings: { account } } = this.props;
    const [valueBalanceCompare, symbol] = quantity.split(' ');

    if (!value) {
      return;
    }

    const url = 'https://gateway.beos.world/api/v2';
    const validationUrl = `${url}/wallets/beos/address-validator?address=${value}`;
    try {
      const response = await fetch(validationUrl);
      const { isValid } = await response.json();
      if (isValid) {
        if (parseFloat(valueBalanceCompare) > balances[account][asset]) {
          this.setState({ formError: 'insufficient_balance' });
        } else {
          this.setState({ isValidAccount: true, formError: null });
        }
      } else {
        this.setState({
          isValidAccount: false,
          formError: 'account_does_not_exist'
        });
      }
    } catch (e) {
      this.setState({
        isValidAccount: false,
        formError: 'crosschain_transfer_account_validation_failed'
      });
      throw e;
    }
  }, 150);

  onChange = (e, { name, value, valid }) => {
    const { asset, formError, to } = this.state;
    const { balances, settings: { account } } = this.props;
    const newState = { [name]: value };

    if (name === 'to') {
      this.validateAccount(value, asset);
    }

    if (name === 'quantity') {
      const [quantity, asset] = value.split(' ');
      newState.asset = asset;
      if (parseFloat(value) > balances[account][asset]) {
        this.setState({ formError: 'insufficient_balance' });
      } else {
        this.validateAccount(to, asset);
      }
    }

    this.setState(newState);
  };

  isSubmitDisabled = () => {
    const {
      asset,
      formError,
      isValidAccount,
      quantity,
      to
    } = this.state;
    const { balances, settings: { account } } = this.props;
    const [value, symbol] = quantity.split(' ');
    const balance = balances[account];

    return !quantity ||
      !value ||
      !parseFloat(value) ||
      value > balance[symbol] ||
      !asset ||
      !to ||
      !!formError ||
      !isValidAccount
      ? true
      : false;
  };

  render() {
    const {
      asset,
      confirming,
      destinationAsset,
      from,
      isValidAccount,
      to,
      memo,
      quantity,
      formError,
      submitDisabled,
      waiting,
      waitingStarted
    } = this.state;
    const { balances, connection, settings, system, t, onClose } = this.props;

    const balance = balances[settings.account];

    let hasWarnings = null;

    return (
      <Form
        loading={system.TRANSFER === 'PENDING'}
        onSubmit={this.onSubmit}
        warning={hasWarnings}
      >
        {confirming ? (
          <WalletPanelCrosschainTransferConfirming
            asset={asset}
            balances={balances}
            to={to}
            memo={memo}
            from={from}
            onBack={this.onBack}
            onConfirm={this.onConfirm}
            quantity={quantity}
            waiting={waiting}
            waitingStarted={waitingStarted}
          />
        ) : (
          <Segment basic clearing>
            <GlobalFormFieldAccount
              autoFocus
              contacts={settings.contacts}
              fluid
              label={t('crosschain_transfer_label_to', {
                type: destinationAsset
              })}
              name="to"
              onChange={this.onChange}
              value={to}
              showErrorOnInput={!isValidAccount && to.length}
            />
            <FormFieldMultiToken
              balances={balances}
              connection={connection}
              icon="x"
              label={t('crosschain_transfer_label_token_and_quantity')}
              loading={false}
              maximum={balance[asset]}
              name="quantity"
              onChange={this.onChange}
              settings={settings}
              value={quantity}
            />
            {asset && (
              <p>
                {(balance[asset] && balance[asset].toFixed(4)) || '0.0000'}
                &nbsp;
                {asset}
                &nbsp;
                {t('crosschain_transfer_header_available')}
              </p>
            )}
            <GlobalFormFieldMemo
              icon="x"
              label={t('crosschain_transfer_label_memo')}
              loading={false}
              name="memo"
              onChange={this.onChange}
              value={memo}
            />
            <FormMessageError
              error={formError}
              chainSymbol={asset}
            />
            <Divider />
            <Button
              type="submit"
              content={t('confirm')}
              disabled={this.isSubmitDisabled()}
              floated="right"
              primary
            />
            <Button onClick={onClose}>
              <Icon name="x" /> {t('cancel')}
            </Button>
          </Segment>
        )}
      </Form>
    );
  }
}

export default withTranslation('crosschaintransfer')(WalletPanelCrosschainTransfer);
