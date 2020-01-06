// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import { find } from 'lodash';
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

class RexLendSavings extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'deposit'
  };
  componentDidMount() {
    const { actions, settings } = this.props;

    actions.clearSystemState();

    actions.getTableByBounds('eosio', 'eosio', 'rexbal', settings.account, settings.account);
  }
  confirmTransaction = () => {
    const { actions } = this.props;
    const {
      amountToAddToSavings,
      amountToRemoveFromSavings,
      transactionType
    } = this.state;

    if (transactionType === 'deposit') {
      actions.mvtosavings(amountToAddToSavings);
    } else {
      actions.mvfrsavings(amountToRemoveFromSavings);
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
        this.setState({ amountToAddToSavings: null, amountToRemoveFromSavings: null });
      }

      const { tables, settings } = this.props;

      const escapedAccountName = settings.account.replace('.', '\\.');

      const rexBalance = get(tables, `eosio.eosio.rexbal.${escapedAccountName}.rows.0.rex_balance`, '0.0000 REX');
      const rexMaturities = get(tables, `eosio.eosio.rexbal.${escapedAccountName}.rows.0.rex_maturities`, []);
      const rexInSavings = this.getSavingsValue() / 10000;

      let notEnoughBalance = false;
      let notEnoughBalanceInSavings = false;

      if (name === 'amountToAddToSavings') {
        notEnoughBalance =
          Number((rexBalance || '').split(' ')[0]) <
          Number(value.split(' ')[0]);
      } else if (name === 'amountToRemoveFromSavings') {
        notEnoughBalanceInSavings =
          Number(rexInSavings) <
          Number(value.split(' ')[0]);
      }

      if (notEnoughBalance) {
        this.setState({ error: 'insufficient_balance' });
      }
      if (notEnoughBalanceInSavings) {
        this.setState({ error: 'insufficient_balance_savings' });
      }
    });
  };
  onClose = () => {
    this.setState({
      confirming: false,
      amountToAddToSavings: undefined,
      amountToRemoveFromSavings: undefined,
    });
  };
  getSavingsValue = () => {
    const { settings, tables } = this.props;
    const escapedAccountName = settings.account.replace('.', '\\.');
    const matured = get(tables, `eosio.eosio.rexbal.${escapedAccountName}.rows.0.rex_maturities`, []);
    // Find savings value
    let savings = find(matured, {
      key: '2106-02-07T06:28:15'
    })
    // Check legacy fields
    if (!savings) {
      savings = find(matured, {
        first: '2106-02-07T06:28:15'
      })
    }
    // If none, return 0
    if (!savings) {
      savings = {
        value: 0
      }
    }
    return savings.value || savings.second
  }
  render() {
    const {
      actions,
      blockExplorers,
      connection,
      settings,
      system,
      tables,
      t
    } = this.props;
    const {
      amountToAddToSavings,
      amountToRemoveFromSavings,
      confirming,
      error,
      transactionType,
    } = this.state;

    const dropdownOptions = ['deposit', 'withdraw']
      .map((type) => (
        {
          key: type,
          text: t(`rex_interface_savings_options_${type}`, { chainSymbol: connection.chainSymbol }),
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
      (!amountToAddToSavings && transactionType === 'deposit') ||
      (!amountToRemoveFromSavings && transactionType === 'withdraw');

    if (!tables.eosio || !tables.eosio.eosio) return false;

    const escapedAccountName = settings.account.replace('.', '\\.');
    const maturedRex = fetchMaturedBalance(tables, escapedAccountName);

    const rexBalance = get(tables, `eosio.eosio.rexbal.${escapedAccountName}.rows.0.rex_balance`, '0.0000 REX');
    const rexMaturities = get(tables, `eosio.eosio.rexbal.${escapedAccountName}.rows.0.rex_maturities`, []);

    const rexInSavings = this.getSavingsValue() / 10000;

    const confirmationPage = confirming ? (
      <GlobalTransactionModal
        actionName={
          transactionType === 'deposit' ? 'MVTOSAVINGSREX' : 'MVFRSAVINGSREX'
        }
        actions={actions}
        blockExplorers={blockExplorers}
        content={(
          <React.Fragment>
            { transactionType === 'deposit' ? (
              <p>
                {t('rex_interface_savings_confirmation_modal_deposit', {
                  amountToAddToSavings,
                })}
              </p>
            ) : (
              <p>
                {t('rex_interface_savings_confirmation_modal_withdraw', {
                  amountToRemoveFromSavings,
                })}
              </p>
            )}
            <Container>
              <Button
                color="green"
                content={t('common:confirm')}
                disabled={system.MVTOSAVINGSREX || system.MVFRSAVINGSREX}
                floated="right"
                onClick={this.confirmTransaction}
                textAlign="right"
              />
              <Button
                content={t('common:cancel')}
                onClick={() => this.setState({
                  amountToAddToSavings: undefined,
                  amountToRemoveFromSavings: undefined,
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

    return (
      <React.Fragment>
        <Header>
          {t('rex_interface_savings_header')}
          <Header.Subheader>
            {t('rex_interface_savings_subheader')}
          </Header.Subheader>
        </Header>
        {confirming ? confirmationPage : (
          <React.Fragment>
            <Divider />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Header
                    content="REX Balances"
                  />
                  <Table definition fluid textAlign="right">
                    <Table.Row>
                      <Table.Cell width={12}>{t('rex_interface_table_rex_balance')}</Table.Cell>
                      <Table.Cell>{Number(parseFloat(rexBalance) || 0).toFixed(4)}&nbsp;REX</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={12}>{t('rex_interface_table_matured_rex_balance')}</Table.Cell>
                      <Table.Cell>{Number(parseFloat(maturedRex) || 0).toFixed(4)}&nbsp;REX</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={12}>{t('rex_interface_table_rex_in_savings')}</Table.Cell>
                      <Table.Cell>{Number(parseFloat(rexInSavings) || 0).toFixed(4)}&nbsp;REX</Table.Cell>
                    </Table.Row>
                  </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <Header
              content={t('rex_interface_savings_header')}
            />
            <Form as={Segment} secondary>
              <Form.Group widths="equal">
                <label>
                  <strong style={labelStyle}>
                    {t('rex_interface_savings_deposit_or_withdraw_label')}
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

                {transactionType === 'deposit' ? (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="amountToAddToSavings"
                    label={t('rex_interface_savings_rex_deposit', { chainSymbol: connection.chainSymbol })}
                    name="amountToAddToSavings"
                    onChange={this.handleChange}
                    symbol="REX"
                  />
                ) : (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="amountToRemoveFromSavings"
                    label={t('rex_interface_savings_rex_withdraw', { chainSymbol: connection.chainSymbol })}
                    name="amountToRemoveFromSavings"
                    onChange={this.handleChange}
                    symbol="REX"
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
                content={transactionType === 'deposit' ? t('rex_interface_savings_options_deposit') : t('rex_interface_savings_options_withdraw')}
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

export default translate('rex')(RexLendSavings);
