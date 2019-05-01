// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Message,
  Segment,
  Header,
  Modal,
} from 'semantic-ui-react';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormMessageError from '../../Global/Form/Message/Error';
import GlobalTransactionHandler from '../../Global/Transaction/Handler';
import { get } from "dot-prop-immutable";

const invalidErrorMessage = {
  resourceAmount: 'invalid_amount'
};

class RexInterfaceFund extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'cpu'
  };
  componentDidMount() {
    const { actions } = this.props;

    actions.clearSystemState();
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

      const rexFundBalance = get(tables, `eosio.eosio.rexfund.${settings.account}.rows.0.balance`, '0.0000 EOS');

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
  render() {
    const {
      actions,
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

    const costFor30days = 0.1;

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
    const displaySuccessMessage = !saveDisabled;
    const cost = resourceAmount && (resourceAmount.split(' ')[0] * costFor30days).toFixed(4);
    console.log({tables})
    const rexFundBalance = get(tables, `eosio.eosio.rexfund.${settings.account}.rows.0.balance`, '0.0000 EOS');
    console.log({rexFundBalance})
    const confirmationPage = confirming ? (
      <React.Fragment>
        <Header icon="cubes" content={t('rex_interface_rent_resources_confirmation_modal_header')} />
        <GlobalTransactionHandler
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
                        amount: resourceAmount,
                        chainSymbol: connection.chainSymbol,
                        cost
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
                        amount: resourceAmount,
                        chainSymbol: connection.chainSymbol,
                        cost
                      }
                    )
                  }
                </p>
              )}
            </React.Fragment>
          )}
          contract={contract}
          onClose={this.onClose}
          onSubmit={this.onSubmit}
          settings={settings}
          system={system}
          transaction={transaction}
        />
        <Container>
          <Button
            content={t('common:close')}
            onClick={() => this.setState({ confirming: false })}
            textAlign="left"
          />
          <Button
            color="green"
            content={t('common:confirm')}
            disabled={system.RENT_CPU || system.RENT_NET}
            onClick={this.confirmTransaction}
            textAlign="right"
          />
        </Container>
      </React.Fragment>
    ) : '';
    return (
      <Segment basic>
        {confirming ? confirmationPage : (
          <React.Fragment>
            <Message
              warning
            >
              {t('rex_interface_rent_message', { chainSymbol: connection.chainSymbol })}
            </Message>
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
            <Form
              success={displaySuccessMessage}
            >
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
                  defaultValue={resourceAmount || ''}
                  label={t('rex_interface_rent_resources_amount_label', { chainSymbol: connection.chainSymbol })}
                  name="resourceAmount"
                  onChange={this.handleChange}
                />
              </Form.Group>
              { displaySuccessMessage && transactionType === 'cpu' && (
                <Message key="cpu" success>
                  {
                    t(
                      'rex_interface_rent_confirmation_modal_rent_cpu',
                      {
                        amount: resourceAmount,
                        chainSymbol: connection.chainSymbol,
                        cost
                      }
                    )
                  }
                </Message>
              )}
              { displaySuccessMessage && transactionType === 'net' && (
                <Message key="net" success>
                  {
                    t(
                      'rex_interface_rent_confirmation_modal_rent_net',
                      {
                        amount: resourceAmount,
                        chainSymbol: connection.chainSymbol,
                        cost
                      }
                    )
                  }
                </Message>
              )}
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
              />
            </Form>
          </React.Fragment>
        )}

      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceFund);
