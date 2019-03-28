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

const invalidErrorMessage = {
  resourceAmount: 'amount_invalid'
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
    // const { actions, settings } = this.props;
    // const { resourceAmount, transactionType } = this.state;
    //
    // if (transactionType === 'cpu') {
    //   actions.rentCpu({
    //     amount: resourceAmount,
    //     owner: settings.account
    //   });
    // } else {
    //   actions.rentNet({
    //     amount: resourceAmount,
    //     owner: settings.account
    //   });
    // }
  };
  handleChange = (e, { name, value, valid }) => {
    console.log({e})
    console.log({ name })

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
    });
  };
  render() {
    const {
      actions,
      blockExplorers,
      connection,
      settings,
      system,
      t
    } = this.props;
    const {
      confirming,
      error,
      resourceAmount,
      resourceType,
      transactionType
    } = this.state;

    const costFor30days = 0.1;

    const dropdownOptions = ['cpu', 'net'].map((transactionType) => (
      {
        key: transactionType,
        text: transactionType,
        value: transactionType
      }
    ));

    let transaction;
    let contract;

    const actionName = transactionType === 'cpu' ? 'RENT_CPU' : 'RENT_NET';

    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }

    const saveDisabled = error || !resourceAmount;

    return (
      <Segment basic>
        {confirming && (
          <Modal
            centered={false}
            open
          >
            <Header icon="cubes" content={t('rex_interface_fund_confirmation_modal_header')} />
            <Modal.Content>
              <GlobalTransactionHandler
                actionName={transactionType === 'buy' ? 'BUY_REX' : 'SELL_REX'}
                actions={actions}
                blockExplorers={blockExplorers}
                content={(
                  <React.Fragment>
                    {resourceType === 'cpu' ? (
                      <p>
                        {t('rex_interface_rent_confirmation_modal_rent_cpu', { resourceAmount, cost: (resourceAmount * costFor30days) })}
                      </p>
                    ) : (
                      <p>
                        {t('rex_interface_rent_confirmation_modal_rent_net', { resourceAmount, cost: (resourceAmount * costFor30days) })}
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
            </Modal.Content>
            <Modal.Actions>
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
            </Modal.Actions>
          </Modal>
        )}
        <Message
          warning
        >
          {t('rex_interface_fund_message')}
        </Message>
        <Form>
          <Form.Group widths="equal">
            <label>
              <strong>{t('rex_interface_transaction_type_label')}</strong>
              <br />
              <Dropdown
                autoFocus
                defaultValue="cpu"
                name="transactionType"
                onChange={(e) => this.handleChange(
                  e,
                  {
                    name: 'transactionType',
                    value: e.target.value,
                    valid: true
                  }
                )}
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
          { resourceAmount &&
            t(
              'rex_interface_rent_confirmation_modal_rent_net',
              {
                amount: resourceAmount,
                chainSymbol: connection.chainSymbol,
                cost: resourceAmount * costFor30days,
                type: transactionType
              }
            )
          }
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
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceFund);
