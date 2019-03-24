// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Dropdown,
  Form,
  Message,
  Segment,
  Header,
  Modal,
} from 'semantic-ui-react';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormMessageError from '../../Global/Form/Message/Error';

class RexInterfaceManageRex extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'buy'
  };
  confirmTransaction = () => {
    // confirm transactions
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
      connection,
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

    const dropdownOptions = ['sell', 'buy'].map((transactionType) => (
      {
        key: transactionType,
        text: transactionType,
        value: transactionType
      }
    ));

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
              {amountToBuy ? (
                <h2>
                  {t('rex_interface_manage_rex_confirmation_modal_buy_rex', {
                    amountToBuy,
                    rexAmount: (amountToBuy / priceOfRex),
                    chainSymbol: connection.chainSymbol
                  })}
                </h2>
              ) : (
                <h2>
                  {t('rex_interface_manage_rex_confirmation_modal_sell_rex', {
                    amountToSell,
                    chainAmount: (amountToBuy * priceOfRex),
                    chainSymbol: connection.chainSymbol
                  })}
                </h2>
              )}
              <Button
                content={t('common:confirm')}
                onClick={this.confirmTransaction}
              />
            </Modal.Content>
          </Modal>
        )}
        <Message
          warning
        >
          {t('rex_interface_manage_rex_message', { chainSymbo: connection.chainSymbol })}
        </Message>
        <Form>
          <label>
            <strong>{t('rex_interface_manage_rex_amount_label')}</strong>
            <br />
            <Dropdown
              autoFocus
              defaultValue="amountToBuy"
              name="transactionType"
              onChange={({ name, value }) => this.handleChange({ name, value, valid: true })}
              options={dropdownOptions}
              search
              selection
            />
          </label>
          <br />
          <br />

          {transactionType ? (
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

          { amountToBuy && t('rex_interface_manage_rex_amount_in_rex', { cost: amountToBuy * priceOfRex }) }
          { amountToSell && t('rex_interface_manage_rex_amount_in_eos', { cost: amountToSell / priceOfRex }) }
          {error && (
            <GlobalFormMessageError error={error} />
          )}
          <Button
            content={t('rex_interface_manage_rex_button')}
            disabled={saveDisabled}
            onClick={() => this.setState({ confirming: true })}
          />
        </Form>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceManageRex);
