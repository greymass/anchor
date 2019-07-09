// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
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
import FormMessageError from '../../../../Global/Form/Message/Error';
import EOSContract from '../../../../../utils/EOS/Contract';
import WalletPanelFormWithdrawConfirming from './Confirming';

class WalletPanelFormWithdraw extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      asset: 'BTS',
      confirming: false,
      feeBitshares: 0.4547,
      formError: false,
      from: props.settings.account,
      quantity: ' BTS',
      to: '',
      waiting: false,
      waitingStarted: 0,
      storeName: 'beos.gateway',
      isValidAccount: false,
      submitDisabled: true,
      apiUrl: 'https://gateway.beos.world/api/v2',
      assetAccountObjects: {
        BTS: {
          memoCoinType: 'bts',
          walletName: 'BitShares'
        }
      }
    };
  }

  componentWillMount() {

    let apiUrl = this.state.apiUrl;
    let assetAccountObjects = {};

    let coinTypesPromisecheck = fetch(apiUrl + '/coins', {
      method: 'get',
      headers: new Headers({Accept: 'application/json'})
    }).then(response => response.json());
    let tradingPairsPromisecheck = fetch(apiUrl + '/trading-pairs', {
        method: 'get',
        headers: new Headers({Accept: 'application/json'})
    }).then(response => response.json());

    Promise.all([
      coinTypesPromisecheck,
      tradingPairsPromisecheck
    ])
      .then(json_responses => {
          let [
              coinTypes,
              tradingPairs
          ] = json_responses;

          coinTypes.forEach(element => {
            if (element.walletType === 'beos') {

              let coinType = null;
              let memoCoinType = null;
              let walletName = null;

              if (element.backingCoinType !== null) {
                coinType = element.backingCoinType;
              } else {
                coinType = element.coinType;
              }

              coinTypes.find(element => {
                if (element.coinType === coinType) {
                  walletName = element.walletName;
                }
              });

              tradingPairs.find(element => {
                if (element.inputCoinType === coinType) {
                  memoCoinType = element.outputCoinType;
                }
              });

              assetAccountObjects[element.walletSymbol] = {
                memoCoinType,
                walletName
              }
            }
          });
          this.setState({
            assetAccountObjects
          });
      });
  }

  onConfirm = () => {
    const { asset, assetAccountObjects, from, to, quantity, storeName } = this.state;
    this.setState({ confirming: false }, () => {
      if (assetAccountObjects[asset].walletName === 'BEOS') {
        const newMemo = `${assetAccountObjects[asset].memoCoinType}:${to}::`
        this.props.actions.transfer(from, 'beos.gateway', quantity, newMemo, asset);
      } else {
        this.props.actions.beoswithdraw(from, to, quantity, storeName);
      }
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
    const tick = setInterval(this.tick, 250);
    // Make the user wait 3 seconds before they can confirm
    setTimeout(() => {
      clearInterval(tick);
      this.setState({
        waiting: false
      });
    }, 3000);
  };

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
    const { assetAccountObjects, feeBitshares, quantity } = this.state;
    const { balances, settings: { account } } = this.props;
    const [valueFeeCompare, symbol] = quantity.split(' ');

    if (!value) {
      return;
    }

    if (assetAccountObjects[asset].walletName === 'BitShares') {
      let url = 'https://gateway.beos.world/api/v2';
      if (this.props.connection && (this.props.connection.chainId === 'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4')) {
        url = 'https://gateway.testnet.beos.world/api/v2';
      }
      const validationUrl = `${url}/wallets/bitshares2/address-validator?address=${value}`;
      try {
        const response = await fetch(validationUrl);
        const { isValid } = await response.json();
        if (isValid) {
          if (parseFloat(valueFeeCompare) > balances[account][asset]) {
            this.setState({ formError: 'insufficient_balance' });
          } else if ((assetAccountObjects[asset].walletName === 'BitShares') && (parseFloat(valueFeeCompare) <= feeBitshares)) {
            this.setState({ formError: 'bitshares_error' });
          } else {
            this.setState({ isValidAccount: true, formError: null });
          }
        } else {
          this.setState({
            isValidAccount: false,
            formError: 'invalid_withdraw_account'
          });
        }
      } catch (e) {
        this.setState({
          isValidAccount: false,
          formError: 'withdraw_account_validation_failed'
        });
        throw e;
      }
    } else if (assetAccountObjects[asset].walletName === 'EOS') {
      const { blockchains } = this.props;
      const nodeUrl = blockchains
        .filter(({ _id }) => _id === 'eos-mainnet')
        .map(({ node }) => node)[0];
      const url = `${nodeUrl}/v1/chain/get_account`;
      try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const { ok } = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ account_name: value }),
          headers
        });
        if (ok) {
          if (parseFloat(valueFeeCompare) > balances[account][asset]) {
            this.setState({ formError: 'insufficient_balance' });
          } else {
            this.setState({ isValidAccount: true, formError: null });
          }
        } else {
          this.setState({
            isValidAccount: false,
            formError: 'invalid_withdraw_account'
          });
        }
      } catch (e) {
        this.setState({
          isValidAccount: false,
          formError: 'withdraw_account_validation_failed'
        });
        throw e;
      }
    } else if (assetAccountObjects[asset].walletName === 'BEOS') {
      const url = 'https://gateway.beos.world/api/v2';
      const validation = `${url}/wallets/beos/address-validator?address=${value}`;
      try {
        const response = await fetch(validation);
        const { isValid } = await response.json();
        if (isValid) {
          if (parseFloat(valueFeeCompare) > balances[account][asset]) {
            this.setState({ formError: 'insufficient_balance' });
          } else {
            this.setState({ isValidAccount: true, formError: null });
          }
        } else {
          this.setState({
            isValidAccount: false,
            formError: 'invalid_withdraw_account'
          });
        }
      } catch (e) {
        this.setState({
          isValidAccount: false,
          formError: 'withdraw_account_validation_failed'
        });
        throw e;
      }
    } else {
      this.setState({ isValidAccount: true, formError: null });
    }
  }, 150);

  onChange = (e, { name, value, valid }) => {
    const { assetAccountObjects, asset, feeBitshares, formError, to } = this.state;
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
      } else if ((assetAccountObjects[asset].walletName === 'BitShares') && (parseFloat(value) <= feeBitshares)) {
        this.setState({ formError: 'bitshares_error' });
      } else {
        this.validateAccount(to, asset);
      }
    }

    this.setState(newState);
  };

  isSubmitDisabled = () => {
    const { assetAccountObjects, asset, feeBitshares, formError, isValidAccount, quantity, to } = this.state;
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
      !isValidAccount ||
      ((assetAccountObjects[asset].walletName === 'BitShares') && (parseFloat(value) <= feeBitshares))
      ? true
      : false;
  };

  render() {
    const {
      asset,
      confirming,
      from,
      isValidAccount,
      to,
      quantity,
      formError,
      submitDisabled,
      waiting,
      waitingStarted,
      assetAccountObjects
    } = this.state;

    const { balances, connection, settings, system, t, onClose } = this.props;

    const balance = balances[settings.account];

    let hasWarnings = null;

    return (
      <Form
        loading={system.BEOSWITHDRAW === 'PENDING'}
        onSubmit={this.onSubmit}
        warning={hasWarnings}
      >
        {confirming ? (
          <WalletPanelFormWithdrawConfirming
            asset={asset}
            balances={balances}
            to={to}
            withdrawAssetType={assetAccountObjects[asset].walletName}
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
              label={t('withdraw_label_to', {
                type: assetAccountObjects[asset].walletName
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
              label={t('withdraw_label_token_and_quantity')}
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
                {t('withdraw_header_available')}
              </p>
            )}
            <FormMessageError
              error={formError}
              chainSymbol={assetAccountObjects[asset].walletName}
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

export default translate('beos_withdraw')(WalletPanelFormWithdraw);
