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

class RexInterfaceFund extends PureComponent<Props> {
  state = {
    confirming: false
  };
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
      resourceAmount,
      resourceType
    } = this.state;

    const costFor30days = 0.1;

    const dropdownOptions = ['sell', 'buy'].map((transactionType) => (
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
              defaultValue="sell"
              onChange={({ value }) => this.setState({ transactionType: value })}
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
            label={t('rex_interface_rent_resources_amount_label')}
            name="bid"
            onChange={({ value}) => this.setState({ resourceAmount: value })}
          />
          { resourceAmount && t('rex_interface_rent_confirmation_modal_rent_net', { cost: resourceAmount * costFor30days }) }
          <Button
            onClick={() => this.setState({ confirming: true })}
            content={t('rex_interface_rent_resources_button')}
          />
        </Form>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceFund);
