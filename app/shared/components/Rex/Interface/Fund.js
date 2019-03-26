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
  defundingAmount: 'defunding_amount_invalid',
  fundingAmount: 'funding_amount_invalid',
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
    const notEnoughBalance = balanceAmount < value;

    if (notEnoughBalance) {
      this.setState({ error: 'not_enough_balance' });
    }
  };
  render() {
    const {
      connection,
      t
    } = this.props;
    const {
      confirming,
      defundingAmount,
      error,
      fundingAmount,
      transactionType
    } = this.state;

    const fundDisabled = error || !fundingAmount || !defundingAmount;

    const dropdownOptions = ['fund', 'defund'].map((transactionType) => (
      {
        key: transactionType,
        text: transactionType,
        value: transactionType
      }
    ));

    return (
      <Segment basic>
        {confirming && (
          <Modal
            centered={false}
            open
          >
            {fundingAmount ? (
              <React.Fragment>
                <Header icon="cubes" content={t('rex_interface_fund_confirmation_modal_header_funding', { fundingType: (fundingAmount ? 'funding' : 'defunding') })} />
                <Modal.Content>
                  <h2>
                    {t('rex_interface_fund_confirmation_modal_funding', { chainSymbol: connection.chainSymbol })}
                  </h2>
                </Modal.Content>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Header icon="cubes" content={t('rex_interface_fund_confirmation_modal_header_funding', { fundingType: (fundingAmount ? 'funding' : 'defunding') })} />
                <Modal.Content>
                  <h2>
                    {t('rex_interface_fund_confirmation_modal_defunding', { chainSymbol: connection.chainSymbol  })}
                  </h2>
                </Modal.Content>
              </React.Fragment>
            )}
            <Button
              content={t('common:confirm')}
              onClick={this.confirmTransaction}
            />
          </Modal>
        )}
        <Message
          warning
        >
          {t('rex_interface_fund_message', { chainSymbol: connection.chainSymbol })}
        </Message>
        <Form>
          <label>
            <strong>{t('rex_interface_transaction_type_label')}</strong>
            <br />
            <Dropdown
              autoFocus
              defaultValue="fund"
              name="transactionType"
              onChange={(e) => this.handleChange({
                name: 'transactionType',
                value: e.target.value,
                valid: true
              })}
              options={dropdownOptions}
              search
              selection
            />
          </label>
          {transactionType === 'fund' ? (
            <GlobalFormFieldToken
              connection={connection}
              defaultValue={fundingAmount || ''}
              key="fundingAmount"
              label={t('rex_interface_fund_label_fund', { chainSymbol: connection.chainSymbol })}
              name="fundingAmount"
              onChange={this.handleChange}
            />
          ) : (
            <GlobalFormFieldToken
              connection={connection}
              defaultValue={defundingAmount || ''}
              key="defundingAmount"
              label={t('rex_interface_fund_label_defund', { chainSymbol: connection.chainSymbol })}
              name="defundingAmount"
              onChange={this.handleChange}
            />
          )}

          {error && (
            <GlobalFormMessageError error={error} />
          )}
          <Button
            onClick={() => this.setState({ confirming: true })}
            content={transactionType === 'fund' ? t('rex_interface_fund_button') : t('rex_interface_defund_button')}
            disabled={fundDisabled}
          />
        </Form>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceFund);
