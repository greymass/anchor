// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
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
      fundingAmount
    } = this.state;

    const saveDisabled = fundingAmount && defundingAmount && !isEmpty(error);

    return (
      <Segment basic>
        {confirming && (
          <Modal
            centered={false}
            open
          >
            <Header icon="cubes" content={t('rex_interface_fund_confirmation_modal_header')} />
            <Modal.Content>
              {fundingAmount ? (
                <h2>
                  {t('rex_interface_fund_confirmation_modal_funding', { fundingAmount })}
                </h2>
              ) : (
                <h2>
                  {t('rex_interface_fund_confirmation_modal_defunding', { defundingAmount })}
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
          <GlobalFormFieldToken
            connection={connection}
            defaultValue={fundingAmount || ''}
            key="fundingAmount"
            label={t('rex_interface_fund_label_fund', { chainSymbol: connection.chainSymbol })}
            name="bid"
            onChange={this.handleChange}
          />
          <GlobalFormFieldToken
            connection={connection}
            defaultValue={defundingAmount || ''}
            key="defundingAmount"
            label={t('rex_interface_fund_label_defund', { chainSymbol: connection.chainSymbol })}
            name="bid"
            onChange={({ value}) => this.setState({ defundingAmount: value })}
          />
          {error && (
            <GlobalFormMessageError error={error} />
          )}
          <Button
            onClick={() => this.setState({ confirming: true })}
            content={t('rex_interface_fund_button')}
            disabled={saveDisabled}
          />
        </Form>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceFund);
