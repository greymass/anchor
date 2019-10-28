// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormMessageError from '../../Global/Form/Message/Error';
import GlobalTransactionModal from '../../Global/Transaction/Modal';

import fetchMaturedBalance from '../utils/fetchMaturedBalance';

const labelStyle = {
  color: 'black',
  lineWeight: 'light',
  fontSize: 13,
  marginBottom: 4
};

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

      const escapedAccountName = settings.account.replace('.', '\\.');

      const maturedRex = fetchMaturedBalance(tables, escapedAccountName);
      const fundedBalance = get(tables, `eosio.eosio.rexfund.${escapedAccountName}.rows.0.balance`, '0.0000 EOS');

      let notEnoughBalanceMatured = false;
      let notEnoughBalance = false;

      if (name === 'amountToBuy') {
        notEnoughBalance =
          Number((fundedBalance || '').split(' ')[0]) <
          Number(value.split(' ')[0]);
      } else if (name === 'amountToSell') {
        notEnoughBalanceMatured =
          Number((maturedRex || '').toString().split(' ')[0]) <
          Number(value.split(' ')[0]);
      } else if (name === 'amountToBuyFromCpu') {
        const cpuWeight = get(accounts, `${escapedAccountName}.self_delegated_bandwidth.cpu_weight`);
        notEnoughBalance = Number(cpuWeight.split(' ')[0]) < Number(value.split(' ')[0]);
      } else if (name === 'amountToBuyFromNet') {
        const netWeight = get(accounts, `${escapedAccountName}.self_delegated_bandwidth.net_weight`);
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

    const dropdownOptions = ['buy', 'sell', 'buy_from_cpu_staked', 'buy_from_net_staked']
      .map((type) => (
        {
          key: type,
          text: t(`rex_interface_manage_rex_options_${type}`, { chainSymbol: connection.chainSymbol }),
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

    if (!tables.eosio || !tables.eosio.eosio) return false;

    const escapedAccountName = settings.account.replace('.', '\\.');

    const maturedRex = fetchMaturedBalance(tables, escapedAccountName);

    const rexBalance = get(tables, `eosio.eosio.rexbal.${escapedAccountName}.rows.0.rex_balance`, '0.0000 REX');
    const fundedBalance = get(tables, `eosio.eosio.rexfund.${escapedAccountName}.rows.0.balance`, '0.0000 EOS');

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
            ) : transactionType === 'buy_from_cpu_staked' ? (
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
                disabled={system.BUYREX || system.SELLREX || system.UNSTAKETOREX}
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
    const stakedCPU = get(account, 'self_delegated_bandwidth.cpu_weight', 0);
    const stakedNET = get(account, 'self_delegated_bandwidth.net_weight', 0);

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
            <Divider />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Header
                    content="EOS Balances"
                  />
                  <Table definition size="small" textAlign="right">
                    <Table.Row>
                      <Table.Cell width={12}>Available EOS (in REX Smart Contract)</Table.Cell>
                      <Table.Cell>{Number(parseFloat(fundedBalance) || 0).toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={12}>Available Staked EOS (CPU)</Table.Cell>
                      <Table.Cell>{Number(parseFloat(stakedCPU) || 0).toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={12}>Available Staked EOS (NET)</Table.Cell>
                      <Table.Cell>{Number(parseFloat(stakedNET) || 0).toFixed(4)}</Table.Cell>
                    </Table.Row>
                  </Table>
                </Grid.Column>
                <Grid.Column>
                  <Header
                    content="REX Balances"
                  />
                  <Table definition size="small" textAlign="right">
                    <Table.Row>
                      <Table.Cell width={12}>REX Balance</Table.Cell>
                      <Table.Cell>{Number(parseFloat(rexBalance) || 0).toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={12}>Matured REX Balance</Table.Cell>
                      <Table.Cell>{(Number(parseFloat(maturedRex)) || 0).toFixed(4)}</Table.Cell>
                    </Table.Row>
                  </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <Header
              content="Exchange EOS/REX"
            />
            <Form as={Segment} secondary>
              <Form.Group widths="equal">
                <label>
                  <strong style={labelStyle}>
                    {t('rex_interface_transaction_type_label')}
                  </strong>
                  <br />
                  <Dropdown
                    autoFocus
                    defaultValue={transactionType}
                    name="transactionType"
                    onChange={(e, props) => this.handleChange(e, { ...props, valid: true })}
                    options={dropdownOptions}
                    selection
                    style={{ marginTop: '4px', width: 250 }}
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
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default translate('rex')(RexLendManage);
