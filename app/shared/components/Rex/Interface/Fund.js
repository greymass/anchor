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

class RexInterfaceFund extends PureComponent<Props> {
  confirmTransaction = () => {
    // confirm transaction
  };
  render() {
    const {
      connection,
      t
    } = this.props;
    const {
      confirming,
      defundingAmount
      fundingAmount,
    } = this.state;

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
            label={t('rex_interface_fund_label', { chainSymbol: connection.chainSymbol })}
            name="bid"
            onChange={({ value}) => this.setState({ fundingAmount: value })}
          />
          <GlobalFormFieldToken
            connection={connection}
            defaultValue={defundingAmount || ''}
            label={t('rex_interface_defund_label', { chainSymbol: connection.chainSymbol })}
            name="bid"
            onChange={({ value}) => this.setState({ defundingAmount: value })}
          />
          <Button
            onClick={() => this.setState({ confirming: true })}
          />
        </Form>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceFund);
