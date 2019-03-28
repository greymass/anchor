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

class RexInterfaceManageRex extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'buy'
  };
  componentDidMount() {
    const { actions } = this.props;

    actions.clearSystemState();
  }
  confirmTransaction = () => {
    // const { actions, settings } = this.props;
    // const { amountToBuy, amountToSell, transactionType } = this.state;
    //
    // if (transactionType === 'buy') {
    //   actions.buyRex({
    //     amount: amountToBuy,
    //     owner: settings.account
    //   });
    // } else {
    //   actions.sellRex({
    //     amount: amountToSell,
    //     owner: settings.account
    //   });
    // }
  };
  handleChange = ({ name, value, valid }) => {
    if (valid) {
      this.setState({ [name]: value });
    } else {
      this.setState({ error: 'Invalid Amount' });
    }

    const fundAmount = 100.00;
    if (['amountToSell', 'amountToBuy'].includes(name)) {
      const notEnoughBalance = fundAmount < value;

      if (notEnoughBalance) {
        this.setState({ error: 'insufficient_balance' });
      }
    }
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
      amountToBuy,
      amountToSell,
      confirming,
      error,
      transactionType
    } = this.state;

    const priceOfRex = 0.001;

    const dropdownOptions = ['buy', 'sell'].map((transactionType) => (
      {
        key: transactionType,
        text: t(`rex_interface_manage_rex_options_${transactionType}`),
        value: transactionType
      }
    ));

    let transaction;
    let contract;

    const actionName = transactionType === 'fund' ? 'BUY_REX' : 'SELL_REX';

    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }

    const saveDisabled = error || (!amountToBuy && !amountToSell);

    return (
      <Segment basic>
        {confirming && (
          <Modal
            centered={false}
            open
          >
            <Header icon="cubes" content={t('rex_interface_manage_rex_confirmation_modal_header')} />
            <Modal.Content>
              <GlobalTransactionHandler
                actionName={transactionType === 'buy' ? 'BUY_REX' : 'SELL_REX'}
                actions={actions}
                blockExplorers={blockExplorers}
                content={(
                  <React.Fragment>
                    {amountToBuy ? (
                      <p>
                        {t('rex_interface_manage_rex_confirmation_modal_buy_rex', {
                          amountToBuy,
                          rexAmount: (amountToBuy / priceOfRex),
                          chainSymbol: connection.chainSymbol
                        })}
                      </p>
                    ) : (
                      <p>
                        {t('rex_interface_manage_rex_confirmation_modal_sell_rex', {
                          amountToSell,
                          chainAmount: (amountToBuy * priceOfRex),
                          chainSymbol: connection.chainSymbol
                        })}
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
                  disabled={system.BUY_REX || system.SELL_REX}
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
          {t('rex_interface_manage_rex_message', { chainSymbol: connection.chainSymbol })}
        </Message>
        <Form>
          <Form.Group widths="equal">
            <label>
              <strong>{t('rex_interface_transaction_type_label')}</strong>
              <br />
              <Dropdown
                autoFocus
                defaultValue="buy"
                name="transactionType"
                onChange={(e) => this.handleChange({
                  name: 'transactionType',
                  value: e.target.value,
                  valid: true
                })}
                options={dropdownOptions}
                selection
                style={{ marginTop: '4px' }}
              />
            </label>

            {transactionType === 'buy' ? (
              <GlobalFormFieldToken
                connection={connection}
                defaultValue={amountToBuy || ''}
                label={t('rex_interface_manage_rex_buy', { chainSymbol: connection.chainSymbol })}
                name="amountToBuy"
                onChange={this.handleChange}
              />
            ) : (
              <GlobalFormFieldToken
                connection={connection}
                defaultValue={amountToSell || ''}
                label={t('rex_interface_manage_rex_sell', { chainSymbol: connection.chainSymbol })}
                name="amountToSell"
                onChange={this.handleChange}
              />
            )}
          </Form.Group>

          { amountToBuy && t('rex_interface_manage_rex_amount_in_rex', { cost: amountToBuy * priceOfRex }) }
          { amountToSell && t('rex_interface_manage_rex_amount_in_eos', { cost: amountToSell / priceOfRex }) }
          {error && (
            <GlobalFormMessageError error={error} />
          )}
          <Button
            content={transactionType === 'buy' ? t('rex_interface_manage_rex_buy_button') : t('rex_interface_manage_rex_sell_button')}
            disabled={saveDisabled}
            onClick={() => this.setState({ confirming: true })}
          />
        </Form>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceManageRex);
