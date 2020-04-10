// @flow
import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Message,
  Segment,
  Header,
} from 'semantic-ui-react';

import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormMessageError from '../../Global/Form/Message/Error';
import GlobalTransactionModal from '../../Global/Transaction/Modal';
import WalletStatusResources from '../../Wallet/Status/Resources';

import EOSAccount from '../../../utils/EOS/Account';

const invalidErrorMessage = {
  resourceAmount: 'invalid_amount'
};

class RexInterfaceFund extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'cpu'
  };
  componentDidMount() {
    const { actions, settings } = this.props;

    actions.clearSystemState();

    actions.getTableByBounds('eosio', 'eosio', 'rexbal', settings.account, settings.account);
    actions.getTableByBounds('eosio', 'eosio', 'rexfund', settings.account, settings.account);
  }
  confirmTransaction = () => {
    const { actions } = this.props;
    const { resourceAmount, transactionType } = this.state;

    if (transactionType === 'cpu') {
      actions.rentcpu(resourceAmount);
    } else {
      actions.rentnet(resourceAmount);
    }
  };
  handleChange = (e, { name, value, valid }) => {
    this.setState({ error: null }, () => {
      if (valid) {
        this.setState({ [name]: value });
      } else {
        return this.setState({ error: invalidErrorMessage[name] });
      }

      const fundAmount = 100.00;
      const costFor30days = 0.1;

      if (['resourceAmount'].includes(name)) {
        const notEnoughBalance = fundAmount < value * costFor30days;

        if (notEnoughBalance) {
          this.setState({ error: 'not_enough_balance' });
        }
      }

      const { settings, tables } = this.props;

      const escapedAccountName = settings.account.replace('.', '\\.');

      const rexFundBalance = get(tables, `eosio.eosio.rexfund.${escapedAccountName}.rows.0.balance`, '0.0000 EOS');

      let notEnoughBalance = false;

      if (name === 'resourceAmount') {
        notEnoughBalance =
          Number((rexFundBalance || '').split(' ')[0]) <
          Number(value.split(' ')[0]);
      }

      if (notEnoughBalance) {
        this.setState({ error: 'insufficient_balance' });
      }
    });
  };
  onClose = () => {
    this.setState({
      confirming: false,
      resourceAmount: undefined,
      transactionType: 'cpu',
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
      t,
      tables
    } = this.props;
    const {
      confirming,
      error,
      resourceAmount,
      transactionType
    } = this.state;

    const dropdownOptions = ['cpu', 'net'].map((type) => (
      {
        key: type,
        text: type,
        value: type
      }
    ));

    let transaction;
    let contract;

    const actionName = transactionType === 'cpu' ? 'RENTCPUREX' : 'RENTNETREX';

    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }

    const saveDisabled = error || !resourceAmount;

    const escapedAccountName = settings.account.replace('.', '\\.');

    const rexFundBalance = get(tables, `eosio.eosio.rexfund.${escapedAccountName}.rows.0.balance`, '0.0000 EOS');
    const confirmationPage = confirming ? (
      <Segment basic loading={system.RENTCPUREX === 'PENDING' || system.RENTNETREX === 'PENDING'}>
        <GlobalTransactionModal
          actionName={transactionType === 'cpu' ? 'RENTCPUREX' : 'RENTNETREX'}
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <React.Fragment>
              {transactionType === 'cpu' ? (
                <p>
                  {
                    t(
                      'rex_interface_rent_confirmation_modal_rent_cpu',
                      {
                        chainSymbol: connection.chainSymbol,
                        cost: resourceAmount,
                      }
                    )
                  }
                </p>
              ) : (
                <p>
                  {
                    t(
                      'rex_interface_rent_confirmation_modal_rent_net',
                      {
                        chainSymbol: connection.chainSymbol,
                        cost: resourceAmount,
                      }
                    )
                  }
                </p>
              )}
              <Container>
                <Button
                  content={t('common:cancel')}
                  onClick={() => this.setState({ confirming: false })}
                  textAlign="left"
                />
                <Button
                  color="green"
                  content={t('common:confirm')}
                  disabled={system.RENTCPUREX || system.RENTNETREX}
                  floated="right"
                  onClick={this.confirmTransaction}
                  textAlign="right"
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
          title={t('rex_interface_rent_resources_confirmation_modal_header')}
          transaction={transaction}
        />
      </Segment>
    ) : '';

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
          {t('rex_interface_lease_resources_header', { chainSymbol: connection.chainSymbol })}
          <Header.Subheader>
            {t('rex_interface_lease_resources_subheader', { chainSymbol: connection.chainSymbol })}
          </Header.Subheader>
        </Header>
        {confirming ? confirmationPage : (
          <React.Fragment>
            <WalletStatusResources
              disableRam
              displayResourcesAvailableSetting={settings.displayResourcesAvailable}
              eosAccount={eosAccount}
            />
            <Form>
              <Form.Group widths="equal">
                <label>
                  <strong>{t('rex_interface_transaction_type_label')}</strong>
                  <br />
                  <Dropdown
                    autoFocus
                    defaultValue="cpu"
                    name="transactionType"
                    onChange={(e, props) => this.handleChange(e, { ...props, valid: true })}
                    options={dropdownOptions}
                    selection
                    style={{ marginTop: '4px' }}
                  />
                </label>
                <GlobalFormFieldToken
                  connection={connection}
                  label={t('rex_interface_rent_resources_amount_label', { chainSymbol: connection.chainSymbol })}
                  name="resourceAmount"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Message
                content={
                  t(
                    'rex_interface_rent_funding_balance',
                    {
                      fundedBalance: rexFundBalance,
                    }
                  )
                }
              />
              {error && (
                <GlobalFormMessageError
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                  error={error}
                />
              )}
              <Button
                content={t('rex_interface_rent_resources_button')}
                disabled={saveDisabled}
                onClick={() => this.setState({ confirming: true })}
                primary
              />
            </Form>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withTranslation('rex')(RexInterfaceFund);
