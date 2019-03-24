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

const invalidErrorMessage = {
  rentCpu: 'cpu_amoun_invalid',
  rentNet: 'net_amount_invalid',
};

class RexInterfaceFund extends PureComponent<Props> {
  state = {
    confirming: false
  };
  confirmTransaction = () => {
    // confirm transaction
  };
  handleChange = ({ name, value, valid }) => {
    if (valid) {
      this.setState({ [name]: value });
    } else {
      this.setState({ error: invalidErrorMessage[name] });
    }

    const balanceAmount = 100.00;
    const costFor30days = 0.1;

    if (['amountToSell', 'amountToBuy'].includes(name)) {
      const notEnoughBalance = balanceAmount < value * costFor30days;

      if (notEnoughBalance) {
        this.setState({ error: 'not_enough_balance' });
      }
    }
  };
  render() {
    const {
      connection,
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

    const dropdownOptions = ['sell', 'buy'].map((transactionType) => (
      {
        key: transactionType,
        text: transactionType,
        value: transactionType
      }
    ));

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
              {resourceType === 'cpu' ? (
                <h2>
                  {t('rex_interface_rent_confirmation_modal_rent_cpu', { resourceAmount, cost })}
                </h2>
              ) : (
                <h2>
                  {t('rex_interface_rent_confirmation_modal_rent_net', { resourceAmount, cost })}
                </h2>
              )}
              <Button
                content={t('rex_interface_fund_confirmation_modal_button')}
                onClick={this.confirmTransaction}
              />
            </Modal.Content>
          </Modal>
        )}
        <Message
          warning
        >
          {t('rex_interface_fund_message')}
        </Message>
        <Form>

          <label>
            <strong>{t('rex_interface_rent_resources_amount_label')}</strong>
            <br />
            <Dropdown
              autoFocus
              defaultValue="rent_cpu"
              name="transactionType"
              onChange={({ name, value }) => this.handleChange({ name, value, valid: true })}
              options={dropdownOptions}
              search
              selection
            />
          </label>
          <br />
          <br />
          <GlobalFormFieldToken
            connection={connection}
            defaultValue={resourceAmount || ''}
            label={t('rex_interface_rent_resources_amount_label', { chainSymbol: connection.chainSymbol })}
            name="resourceAmount"
            onChange={this.handleChange}
          />
          { resourceAmount && t('rex_interface_rent_confirmation_modal_rent_net', { cost: resourceAmount * costFor30days, type: transactionType }) }
          {error && (
            <GlobalFormMessageError error={error} />
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
