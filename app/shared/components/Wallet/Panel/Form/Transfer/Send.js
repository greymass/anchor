// @flow
import React, { Component } from 'react';
import { Button, Divider, Form, Message, Icon, Segment, Table } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import { findIndex, isObject } from 'lodash';
import { get } from 'dot-prop-immutable';
import debounce from 'lodash/debounce';
import { Asset } from '@greymass/eosio';

import { createHttpHandler } from '../../../../../utils/http/handler';
import FormFieldMultiToken from '../../../../Global/Form/Field/MultiToken';
import FormMessageError from '../../../../Global/Form/Message/Error';
import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldKeyPublic from '../../../../Global/Form/Field/Key/Public';
import GlobalFormFieldMemo from '../../../../Global/Form/Field/Memo';
import WalletPanelFormTransferSendConfirming from './Send/Confirming';

const initialState = {
  confirming: false,
  fioFee: false,
  formError: false,
  formId: false,
  memo: '',
  memoValid: true,
  quantity: '',
  quantitySet: false,
  submitDisabled: true,
  to: '',
  toValid: true,
  waiting: false,
  waitingStarted: 0
};

class WalletPanelFormTransferSend extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, initialState, {
      asset: props.connection.chainSymbol || 'EOS',
      from: props.settings.account,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      balances,
      connection,
      system,
      wallet
    } = nextProps;
    const { TRANSFER_SET_ASSET_DATA } = system;
    if (this.state.from !== nextProps.settings.account) {
      this.setState({ from: nextProps.settings.account });
    }
    if (
      connection.chainSymbol === 'FIO'
      && (
        this.props.connection.chainSymbol !== 'FIO'
        || this.state.fioFee === false
      )
    ) {
      this.setState({ fioFee: 'loading' }, () => {
        this.loadFIOFee();
      });
    }
    if (TRANSFER_SET_ASSET_DATA) {
      const { amount, asset } = TRANSFER_SET_ASSET_DATA;
      const assetContract = balances.__contracts[asset.toUpperCase()];
      let precision;
      if (assetContract) {
        ({ precision } = assetContract);
      }
      let precisionValue = connection.tokenPrecision;
      if (precision) {
        if (isObject(precision)) {
          precisionValue = precision[asset.toUpperCase()];
        }
        if (precision > 0) {
          precisionValue = precision;
        }
      }
      const quantity = `${amount.toFixed(precisionValue)} ${asset}`;
      if (
        this.state.asset !== TRANSFER_SET_ASSET_DATA.asset
        || this.state.quantity !== quantity
      ) {
        this.setState({
          asset: TRANSFER_SET_ASSET_DATA.asset,
          quantity,
          quantitySet: Date.now(),
        }, () => {
          this.onChange(null, {
            name: 'quantity',
            value: quantity,
            valid: true,
          });
        });
      }
    }
  }

  onConfirm = () => {
    const {
      from,
      memo,
      quantity,
      asset,
      to
    } = this.state;
    this.setState({ confirming: false }, () => {
      this.props.actions.transfer(from, to, quantity, memo, asset);
    });
  };

  onSubmit = () => {
    this.setState({
      confirming: true,
      waiting: true,
      waitingStarted: new Date()
    });
    this.interval = setInterval(this.tick, 250);
    if (this.props.isConfirming) {
      this.props.isConfirming(true);
    }
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

  onCancel = (e) => {
    this.setState(Object.assign({}, initialState, {
      formId: new Date()
    }));
    if (this.props.onClose) {
      this.props.onClose();
    }
    if (this.props.isConfirming) {
      this.props.isConfirming(false);
    }
    e.preventDefault();
    return false;
  };

  getContractHash = debounce((value) => {
    const { actions } = this.props;

    actions.getContractHash(value);
  }, 400);

  onChange = (e, { name, value, valid }) => {
    this.props.actions.clearSystemState();
    if (name === 'to') {
      const {
        settings
      } = this.props;
      const {
        contacts
      } = settings;

      const position = findIndex(contacts, { accountName: value });

      if (position > -1) {
        this.onChange(e, { name: 'memo', value: contacts[position].defaultMemo || '', valid: true });
      }

      this.getContractHash(value);
    }

    const newState = { [name]: value };
    if (name === 'quantity') {
      const [, asset] = value.split(' ');
      newState.asset = asset;
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
  };

  onError = (error) => {
    let formError;

    if (error !== true) {
      formError = error;
    }

    this.setState({
      formError,
      submitDisabled: true
    });
  };

  onBack = () => {
    if (this.props.isConfirming) {
      this.props.isConfirming(false);
    }
    this.setState({
      confirming: false
    });
  };

  errorInForm = () => {
    const {
      memo,
      memoValid,
      quantity,
      to,
      toValid
    } = this.state;

    const {
      app,
      settings
    } = this.props;

    if (!to || to === '') {
      return true;
    }

    if (!quantity || quantity === '') {
      return true;
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
    const exchangeAccounts = get(app, 'constants.exchanges') || [];
    if (exchangeAccounts.includes(to) && (!memo || memo.length === 0)) {
      return 'transferring_to_exchange_without_memo';
    }

    return false;
  };

  fillMax = () => {
    const {
      balances,
      connection,
      settings,
    } = this.props;
    const {
      asset,
      fioFee,
    } = this.state;
    const balance = balances[settings.account];
    const { precision } = balances.__contracts[asset.toUpperCase()];
    let precisionValue = connection.tokenPrecision;
    if (precision) {
      if (isObject(precision)) {
        precisionValue = precision[asset.toUpperCase()];
      }
      if (precision > 0) {
        precisionValue = precision;
      }
    }
    const quantity = Asset.from(balance[asset], `${precisionValue},${asset}`);
    if (fioFee) {
      quantity.value -= fioFee / 1000000000;
    }
    this.setState({
      quantity: String(quantity),
      quantitySet: Date.now(),
    }, () => {
      this.onChange(null, {
        name: 'quantity',
        value: String(quantity),
        valid: true,
      });
    });
  }

  loadFIOFee = async () => {
    const { connection, wallet } = this.props;
    const { httpClient } = await createHttpHandler(connection);
    const fees = await httpClient.post(`${connection.httpEndpoint}/v1/chain/get_fee`, {
      end_point: 'transfer_tokens_pub_key',
      fio_address: wallet.address,
    });
    const { fee } = fees.data;
    this.setState({ fioFee: fee });
  }

  render() {
    const {
      app,
      balances,
      connection,
      settings,
      system,
      t
    } = this.props;
    const {
      asset,
      confirming,
      fioFee,
      formError,
      formId,
      from,
      memo,
      quantity,
      quantitySet,
      submitDisabled,
      to,
      waiting,
      waitingStarted
    } = this.state;

    const balance = balances[settings.account];
    const assetContract = balances.__contracts[asset.toUpperCase()];
    let precision = connection.tokenPrecision;
    if (assetContract && assetContract.precision && assetContract.precision[asset]) {
      precision = assetContract.precision[asset];
    }

    const quantityValue = quantity ? parseFloat(quantity.split(' ')[0]) : 0;

    if (!balance) return false;

    let exchangeWarning;

    const exchangeAccounts = get(app, 'constants.exchanges') || [];

    if (memo && memo !== '' && exchangeAccounts && exchangeAccounts[connection.chainId]) {
      exchangeAccounts[connection.chainId].forEach((exchangeAccount) => {
        if (memo.match(`.*?${exchangeAccount}.*?`)) {
          exchangeWarning = (
            <Message warning>
              {`${t('transfer_send_exchange_in_memo_one')} ${exchangeAccount} ${t('transfer_send_exchange_in_memo_two')}`}
            </Message>
          );
        }
      });
    }

    const shouldDisplayTransferingToContractMessage =
      to &&
      system.ACCOUNT_HAS_CONTRACT_LAST_ACCOUNT === to &&
      system.ACCOUNT_HAS_CONTRACT_LAST_CONTRACT_HASH &&
      system.ACCOUNT_HAS_CONTRACT_LAST_CONTRACT_HASH !== '0000000000000000000000000000000000000000000000000000000000000000';

    const hasWarnings = exchangeWarning || shouldDisplayTransferingToContractMessage;

    return (
      <Form
        key={formId}
        loading={system.TRANSFER === 'PENDING'}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
        warning={hasWarnings}
      >
        {(confirming)
          ? (
            <WalletPanelFormTransferSendConfirming
              asset={asset}
              balances={balances}
              from={from}
              memo={memo}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              quantity={quantity}
              to={to}
              waiting={waiting}
              waitingStarted={waitingStarted}
            />
          ) : (
            <Segment basic clearing>
              {(connection.keyPrefix === 'FIO')
                ? (
                  <GlobalFormFieldKeyPublic
                    app={app}
                    autoFocus
                    connection={connection}
                    contacts={settings.contacts}
                    enableContacts
                    enableExchanges
                    chainId={connection.chainId}
                    fluid
                    label={t('transfer_label_to_pubkey')}
                    name="to"
                    onChange={this.onChange}
                    value={to}
                  />
                )
                : (
                  <GlobalFormFieldAccount
                    app={app}
                    autoFocus
                    contacts={settings.contacts}
                    enableContacts={false}
                    enableExchanges={false}
                    chainId={connection.chainId}
                    fluid
                    label={t('transfer_label_to')}
                    name="to"
                    onChange={this.onChange}
                    value={to}
                  />
                )
              }
              {(shouldDisplayTransferingToContractMessage) && (
                <Message
                  content={t('transfer_destination_account_is_contract')}
                  icon="warning sign"
                  warning
                />
              )}
              <FormFieldMultiToken
                balances={balances}
                connection={connection}
                icon="x"
                label={(
                  <span>
                    <span style={{ float: 'right' }}>
                      <a
                        onClick={this.fillMax}
                        style={{ cursor: 'pointer' }}
                      >
                        {String(Asset.from(balance[asset], `${precision},${asset}`))}
                      </a>
                    </span>
                    {t('transfer_label_token_and_quantity')}
                  </span>
                )}
                key={quantitySet}
                loading={false}
                maximum={balance[asset]}
                name="quantity"
                onChange={this.onChange}
                settings={settings}
                value={quantity}
              />
              {(connection.keyPrefix === 'FIO')
                ? (
                  <Table size="small">
                    <Table.Row>
                      <Table.Cell textAlign="right">Tokens to Send</Table.Cell>
                      <Table.Cell>{quantity || '0'}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign="right">Transaction Fee</Table.Cell>
                      <Table.Cell>{fioFee / 1000000000} FIO</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign="right">Total</Table.Cell>
                      <Table.Cell>
                        {(quantityValue + (fioFee / 1000000000)).toFixed(9)} FIO
                      </Table.Cell>
                    </Table.Row>
                  </Table>
                )
                : false
              }
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

              <Segment basic>
                <Button
                  content={t('confirm')}
                  disabled={submitDisabled}
                  floated="right"
                  primary
                />
                <Button
                  onClick={this.onCancel}
                >
                  <Icon name="undo" /> {t('reset')}
                </Button>

              </Segment>
            </Segment>
          )}
      </Form>
    );
  }
}

export default withTranslation('transfer')(WalletPanelFormTransferSend);
