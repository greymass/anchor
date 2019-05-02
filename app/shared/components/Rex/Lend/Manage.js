// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Message,
  Header,
} from 'semantic-ui-react';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormMessageError from '../../Global/Form/Message/Error';
import GlobalTransactionModal from '../../Global/Transaction/Modal';
import WalletStatusStaked from '../../Wallet/Status/Staked';
import EOSAccount from '../../../utils/EOS/Account';
import { unstaketorex } from '../../../actions/system/rexi';

class RexLendManage extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'buy'
  };
  componentDidMount() {
    const { actions, settings } = this.props;

    actions.clearSystemState();

    actions.getTableByBounds('eosio', 'eosio', 'rexbal', settings.account, settings.account);
    actions.getTableByBounds('eosio', 'eosio', 'rexfund', settings.account, settings.account);
  }
  confirmTransaction = () => {
    const { actions } = this.props;
    const {
      amountToBuy,
      amountToSell,
      amountToBuyFromCpu,
      amountToBuyFromNet,
      transactionType
    } = this.state;

    if (transactionType === 'buy') {
      actions.buyrex(amountToBuy);
    } else if (transactionType === 'sell') {
      actions.sellrex(amountToSell);
    } else if (transactionType === 'buy_from_cpu_staked') {
      actions.unstaketorex(amountToBuyFromCpu, 'cpu');
    } else {
      actions.unstaketorex(amountToBuyFromNet, 'net');
    }
  };
  handleChange = (e, { name, value, valid }) => {
    this.setState({ error: null }, () => {
      if (valid) {
        this.setState({ [name]: value });
      } else {
        return this.setState({ error: 'invalid_amount' });
      }

      if (name === 'transactionType') {
        this.setState({ amountToBuy: null, amountToSell: null });
      }

      const { accounts, tables, settings } = this.props;

      const maturedRex = get(tables, `eosio.eosio.rexbal.${settings.account}.rows.0.matured_rex`, '0.0000 REX');
      const fundedBalance = get(tables, `eosio.eosio.rexfund.${settings.account}.rows.0.balance`, '0.0000 EOS');

      let notEnoughBalanceMatured = false;
      let notEnoughBalance = false;

      if (name === 'amountToBuy') {
        notEnoughBalance =
          Number((fundedBalance || '').split(' ')[0]) <
          Number(value.split(' ')[0]);
      } else if (name === 'amountToSell') {
        notEnoughBalanceMatured =
          Number((maturedRex || '').split(' ')[0]) <
          Number(value.split(' ')[0]);
      } else if (name === 'amountToBuyFromCpu') {
        const cpuWeight = get(accounts, `${settings.account}.self_delegated_bandwidth.cpu_weight`);
        notEnoughBalance = Number(cpuWeight.split(' ')[0]) < Number(value.split(' ')[0]);
      } else if (name === 'amountToBuyFromNet') {
        const netWeight = get(accounts, `${settings.account}.self_delegated_bandwidth.net_weight`);
        notEnoughBalance = Number(netWeight.split(' ')[0]) < Number(value.split(' ')[0]);
      }

      if (notEnoughBalanceMatured) {
        this.setState({ error: 'insufficient_balance_matured' });
      }
      if (notEnoughBalance) {
        this.setState({ error: 'insufficient_balance' });
      }
    });
  };
  onClose = () => {
    this.setState({
      confirming: false,
      amountToBuy: undefined,
      amountToSell: undefined,
    });
  };
  render() {
    const {
      accounts,
      actions,
      balance,
      blockExplorers,
      connection,
      settings,
      system,
      tables,
      t
    } = this.props;
    const {
      amountToBuy,
      amountToBuyFromCpu,
      amountToBuyFromNet,
      amountToSell,
      confirming,
      error,
      transactionType,
    } = this.state;

    const priceOfRex = 0.001;

    const dropdownOptions = ['buy', 'sell', 'buy_from_cpu_staked', 'buy_from_net_staked']
      .map((type) => (
        {
          key: type,
          text: t(`rex_interface_manage_rex_options_${type}`),
          value: type
        }
      ));

    let transaction;
    let contract;

    const actionName = transactionType === 'buy' ? 'BUYREX' : 'SELLREX';

    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }

    const saveDisabled = error ||
      (!amountToBuy && transactionType === 'buy') ||
      (!amountToSell && transactionType === 'sell') ||
      (!amountToBuyFromCpu && transactionType === 'buy_from_cpu_staked') ||
      (!amountToBuyFromNet && transactionType === 'buy_from_net_staked');
    const displaySuccessMessage = !saveDisabled;

    if (!tables.eosio || !tables.eosio.eosio) return false;

    const maturedRex = get(tables, `eosio.eosio.rexbal.${settings.account}.rows.0.matured_rex`, '0.0000 REX');
    const rexBalance = get(tables, `eosio.eosio.rexbal.${settings.account}.rows.0.rex_balance`, '0.0000 REX');
    const fundedBalance = get(tables, `eosio.eosio.rexfund.${settings.account}.rows.0.balance`, '0.0000 EOS');

    const showStakedInterface = ['buy_from_cpu_staked', 'buy_from_net_staked'].includes(transactionType);

    const confirmationPage = confirming ? (
      <GlobalTransactionModal
        actionName={
          transactionType === 'buy' ?
            'BUYREX' : transactionType === 'sell' ?
            'SELLREX' : 'UNSTAKETOREX'
        }
        actions={actions}
        blockExplorers={blockExplorers}
        content={(
          <React.Fragment>
            { transactionType === 'buy' ? (
              <p>
                {t('rex_interface_manage_rex_confirmation_modal_buy_rex', {
                  amountToBuy,
                })}
              </p>
            ) : transactionType === 'sell' ? (
              <p>
                {t('rex_interface_manage_rex_confirmation_modal_sell_rex', {
                  amountToSell,
                })}
              </p>
            ) : transactionType === 'buyRexFromCpu' ? (
              <p>
                {t('rex_interface_manage_rex_confirmation_modal_buy_from_cpu', {
                  amountToBuyFromCpu,
                })}
              </p>
            ) : (
              <p>
                {t('rex_interface_manage_rex_confirmation_modal_buy_from_net', {
                  amountToBuyFromNet,
                })}
              </p>
            )}
            <Container>
              <Button
                color="green"
                content={t('common:confirm')}
                disabled={system.BUY_REX || system.SELL_REX}
                floated="right"
                onClick={this.confirmTransaction}
                textAlign="right"
              />
              <Button
                content={t('common:cancel')}
                onClick={() => this.setState({
                  amountToBuy: undefined,
                  amountToSell: undefined,
                  confirming: false,
                })}
                textAlign="left"
              />
            </Container>
          </React.Fragment>
        )}
        contract={contract}
        onClose={this.onClose}
        onSubmit={this.onSubmit}
        open
        settings={settings}
        system={system}
        title={t('rex_interface_manage_rex_confirmation_modal_header')}
        transaction={transaction}
      />
    ) : false;

    const account = accounts[settings.account] || {};

    const delegations = tables &&
      tables.eosio &&
      tables.eosio[settings.account] &&
      tables.eosio[settings.account].delband &&
      tables.eosio[settings.account].delband.rows;
    const eosAccount = new EOSAccount(account, balance, delegations, connection.chainSymbol);

    return (
      <React.Fragment>
        <Header>
          {t('rex_interface_manage_rex_header', { chainSymbol: connection.chainSymbol })}
          <Header.Subheader>
            {t('rex_interface_manage_rex_subheader', { chainSymbol: connection.chainSymbol })}
          </Header.Subheader>
        </Header>
        {confirming ? confirmationPage : (
          <React.Fragment>
            <Message>
              <p>
                {
                  t(
                    'rex_interface_rent_funding_balance',
                    {
                      fundedBalance: Number(parseFloat(fundedBalance) || 0).toFixed(4),
                      chainSymbol: connection.chainSymbol
                    }
                  )
                }
              </p>
              <p>
                {t('rex_interface_rent_rex_balance', { rexBalance: Number(parseFloat(rexBalance) || 0).toFixed(4) })}
              </p>
              <p>
                {t('rex_interface_rent_rex_balance_mature', { rexBalance: Number(parseFloat(maturedRex) || 0).toFixed(4) })}
              </p>
            </Message>
            <Form success={displaySuccessMessage}>
              <Form.Group widths="equal">
                <label>
                  <strong>{t('rex_interface_transaction_type_label')}</strong>
                  <br />
                  <Dropdown
                    autoFocus
                    defaultValue="buy"
                    name="transactionType"
                    onChange={(e, props) => this.handleChange(e, { ...props, valid: true })}
                    options={dropdownOptions}
                    selection
                    style={{ marginTop: '4px', width: 200 }}
                  />
                </label>

                {transactionType === 'buy' ? (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="amountToBuy"
                    label={t('rex_interface_manage_rex_buy', { chainSymbol: connection.chainSymbol })}
                    name="amountToBuy"
                    onChange={this.handleChange}
                  />
                ) : (transactionType === 'sell') ? (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="amountToSell"
                    label={t('rex_interface_manage_rex_sell', { chainSymbol: connection.chainSymbol })}
                    name="amountToSell"
                    onChange={this.handleChange}
                    symbol="REX"
                  />
                ) : (transactionType === 'buy_from_cpu_staked') ? (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="amountToBuyFromCpu"
                    label={t('rex_interface_manage_rex_buy_from_cpu_staked', { chainSymbol: connection.chainSymbol })}
                    name="amountToBuyFromCpu"
                    onChange={this.handleChange}
                    symbol="EOS"
                  />
                ) : (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="amountToBuyFromNet"
                    label={t('rex_interface_manage_rex_buy_from_net_staked', { chainSymbol: connection.chainSymbol })}
                    name="amountToBuyFromNet"
                    onChange={this.handleChange}
                    symbol="EOS"
                  />
                )}
              </Form.Group>
              { displaySuccessMessage && transactionType === 'buy' && amountToBuy && (
                <Message success>
                  {t(
                    'rex_interface_manage_rex_amount_to_buy',
                    {
                      amount: amountToBuy,
                      rexAmount: amountToBuy.split(' ')[0] / priceOfRex
                    }
                  )}
                </Message>
              )}
              { displaySuccessMessage && transactionType === 'sell' && amountToSell && (
                <Message success>
                  {t(
                    'rex_interface_manage_rex_amount_to_sell',
                    {
                      amount: amountToSell,
                      rexAmount: amountToSell.split(' ')[0] / priceOfRex
                    }
                  )}
                </Message>
              )}
              {error && (
                <GlobalFormMessageError
                  error={error}
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                />
              )}
              <Button
                content={transactionType === 'sell' ? t('rex_interface_manage_rex_sell_button') : t('rex_interface_manage_rex_buy_button')}
                disabled={saveDisabled}
                primary
                onClick={() => this.setState({ confirming: true })}
              />
            </Form>
            { showStakedInterface && (
              <React.Fragment>
                <Header>{t('rex_interface_manage_rex_current_staked')}</Header>
                <WalletStatusStaked
                  account={account}
                  eosAccount={eosAccount}
                  settings={settings}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default translate('rex')(RexLendManage);
