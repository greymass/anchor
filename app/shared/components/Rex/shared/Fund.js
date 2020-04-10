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

const invalidErrorMessage = {
  defundingAmount: 'defunding_amount_invalid',
  fundingAmount: 'funding_amount_invalid',
};

class RexInterfaceFund extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'fund'
  };
  componentDidMount() {
    const { actions, settings } = this.props;

    actions.clearSystemState();


    actions.getTable('eosio', settings.account, 'rexfund');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.system.DEPOSITREX === 'SUCCESS' && this.props.system.DEPOSITREX === 'PENDING') {
      this.setState({
        defundingAmount: undefined,
        fundingAmount: undefined,
      });
    }
    if (nextProps.system.WITHDRAWREX === 'SUCCESS' && this.props.system.WITHDRAWREX === 'PENDING') {
      this.setState({
        defundingAmount: undefined,
        fundingAmount: undefined,
      });
    }
  }
  confirmTransaction = () => {
    const { actions } = this.props;
    const { defundingAmount, fundingAmount, transactionType } = this.state;

    if (transactionType === 'fund') {
      actions.depositrex(fundingAmount);
    } else {
      actions.withdrawrex(defundingAmount);
    }
  };
  handleChange = ({ name, value, valid }) => {
    this.setState({ error: null }, () => {
      if (valid) {
        this.setState({ [name]: value });
      } else {
        return this.setState({ error: invalidErrorMessage[name] });
      }

      const {
        balance,
        connection,
        settings,
        tables
      } = this.props;

      const { transactionType } = this.state;

      if (transactionType === 'fund') {
        const balanceAmount = balance[connection.chainSymbol];

        if (balanceAmount < Number(value.split(' ')[0])) {
          this.setState({ error: 'insufficient_balance' });
        }
      } else {
        const escapedAccountName = settings.account.replace('.', '\\.');

        const rexFundBalance =
          get(tables, `eosio.eosio.rexfund.${escapedAccountName}.rows.0.balance`, '0.0000 EOS');

        if (Number((rexFundBalance || '').split(' ')[0]) < Number(value.split(' ')[0])) {
          this.setState({ error: 'insufficient_balance_matured' });
        }
      }
    });
  };
  render() {
    const {
      actions,
      balance,
      blockExplorers,
      connection,
      settings,
      system,
      t,
      tables,
    } = this.props;
    const {
      confirming,
      defundingAmount,
      error,
      fundingAmount,
      transactionType
    } = this.state;

    if (!balance) return false;

    const fundDisabled = error ||
      (!fundingAmount && transactionType === 'fund') ||
      (!defundingAmount && transactionType === 'defund');
    const dropdownOptions = ['fund', 'defund'].map((type) => (
      {
        key: type,
        text: t(`rex_interface_fund_options_${type}`),
        value: type
      }
    ));
    let transaction;
    let contract;

    const actionName = transactionType === 'fund' ? 'DEPOSITREX' : 'WITHDRAWREX';

    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }

    const escapedAccountName = settings.account.replace('.', '\\.');

    const rexFundBalance = get(tables, `eosio.eosio.rexfund.${escapedAccountName}.rows.0.balance`, '0.0000 EOS');

    const confirmationPage = confirming ? (
      <Segment loading={system.DEPOSITREX === 'PENDING' || system.WITHDRAWREX === 'PENDING'}>
        <GlobalTransactionModal
          actionName={transactionType === 'fund' ? 'DEPOSITREX' : 'WITHDRAWREX'}
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <React.Fragment>
              {transactionType === 'fund' ? (
                <p>
                  {t('rex_interface_fund_confirmation_modal_funding', { amount: fundingAmount })}
                </p>
              ) : (
                <p>
                  {t('rex_interface_fund_confirmation_modal_defunding', { amount: defundingAmount })}
                </p>
              )}
              <Container style={{ marginTop: 10 }}>
                <Button
                  content={t('common:close')}
                  onClick={() => this.setState({ confirming: false })}
                  textAlign="left"
                />
                <Button
                  color="green"
                  content={t('common:confirm')}
                  disabled={system.DEPOSITREX || system.WITHDRAWREX}
                  floated="right"
                  onClick={this.confirmTransaction}
                  textAlign="right"
                />
              </Container>
            </React.Fragment>
          )}
          contract={contract}
          open
          onClose={() => this.setState({ confirming: false })}
          onSubmit={this.onSubmit}
          settings={settings}
          system={system}
          title={(transactionType === 'fund')
            ? t('rex_interface_fund_confirmation_modal_header_funding')
            : t('rex_interface_fund_confirmation_modal_header_defunding')
          }
          transaction={transaction}
        />
      </Segment>
    ) : '';

    return (
      <React.Fragment>
        <Header
          content={t('rex_interface_fund_header')}
          subheader={t('rex_interface_fund_subheader', { chainSymbol: connection.chainSymbol })}
        />
        {confirming ? confirmationPage : (
          <React.Fragment>
            <Message
              warning
            >
              {t('rex_interface_fund_warning_message', { chainSymbol: connection.chainSymbol })}
            </Message>
            <Message
              content={(
                <React.Fragment>
                  <p>
                    {t(
                      'rex_interface_fund_balance',
                      {
                        balance: balance[connection.chainSymbol],
                        chainSymbol: connection.chainSymbol
                      }
                    )}
                  </p>
                  <p>
                    {t(
                      'rex_interface_fund_withdraw_balance',
                      {
                        balance: rexFundBalance,
                        chainSymbol: ''
                      }
                    )}
                  </p>
                </React.Fragment>
              )}
            />
            <Form>
              <Form.Group widths="equal">
                <label>
                  <strong>{t('rex_interface_transaction_type_label')}</strong>
                  <br />
                  <Dropdown
                    autoFocus
                    defaultValue={transactionType}
                    name="transactionType"
                    onChange={(e, props) => this.handleChange({ ...props, valid: true })}
                    options={dropdownOptions}
                    selection
                    style={{ marginTop: '4px' }}
                  />
                </label>
                {transactionType === 'fund' ? (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="fundingAmount"
                    label={t('rex_interface_fund_label_fund', { chainSymbol: connection.chainSymbol })}
                    name="fundingAmount"
                    onChange={(e, props) => this.handleChange(props)}
                  />
                ) : (
                  <GlobalFormFieldToken
                    connection={connection}
                    defaultValue={defundingAmount || ''}
                    key="defundingAmount"
                    label={t('rex_interface_fund_label_defund', { chainSymbol: connection.chainSymbol })}
                    name="defundingAmount"
                    onChange={(e, props) => this.handleChange(props)}
                  />
                )}
              </Form.Group>

              {error && (
                <GlobalFormMessageError
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                  error={error}
                />
              )}
              <Button
                onClick={() => this.setState({ confirming: true })}
                content={transactionType === 'fund' ? t('rex_interface_fund_button') : t('rex_interface_defund_button')}
                disabled={fundDisabled}
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
