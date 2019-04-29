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

      const fundAmount = 100.00;
      if (['amountToSell', 'amountToBuy'].includes(name)) {
        const notEnoughBalance = fundAmount < value;

        if (notEnoughBalance) {
          this.setState({ error: 'insufficient_balance' });
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

    const actionName = transactionType === 'buy' ? 'BUY_REX' : 'SELL_REX';

    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }

    const saveDisabled = error ||
      (!amountToBuy && transactionType === 'buy') ||
      (!amountToSell && transactionType === 'sell');
    const displaySuccessMessage = !saveDisabled;

    return (
      <Segment basic>
        {confirming && (
          <Modal
            open
            size="small"
          >
            <Header icon="cubes" content={t('rex_interface_manage_rex_confirmation_modal_header')} />
            <Modal.Content>
              <GlobalTransactionHandler
                actionName={transactionType === 'buy' ? 'BUY_REX' : 'SELL_REX'}
                actions={actions}
                blockExplorers={blockExplorers}
                content={(
                  <React.Fragment>
                    { transactionType === 'buy' ? (
                      <p>
                        {t('rex_interface_manage_rex_confirmation_modal_buy_rex', {
                          amountToBuy,
                          rexAmount: (amountToBuy.split(' ')[0] / priceOfRex)
                        })}
                      </p>
                    ) : (
                      <p>
                        {t('rex_interface_manage_rex_confirmation_modal_sell_rex', {
                          amountToSell,
                          rexAmount: (amountToSell.split(' ')[0] / priceOfRex)
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
                style={{ marginTop: '4px' }}
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
            ) : (
              <GlobalFormFieldToken
                connection={connection}
                key="amountToSell"
                label={t('rex_interface_manage_rex_sell', { chainSymbol: connection.chainSymbol })}
                name="amountToSell"
                onChange={this.handleChange}
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
