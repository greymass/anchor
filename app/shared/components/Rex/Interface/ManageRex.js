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
import { Dropdown } from './RentResources';

class RexInterfaceManageRex extends PureComponent<Props> {
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
      eosAmount,
      rexAmount,
      transactionType
    } = this.state;

    const priceOfRex = 0.001;

    return (
      <Segment basic>
        {confirming && (
          <Modal
            centered={false}
            open
          >
            <Header icon="cubes" content={t('rex_interface_manage_rex_confirmation_modal_header')} />
            <Modal.Content>
              {eosAmount ? (
                <h2>
                  {t('rex_interface_manage_rex_confirmation_modal_buy_rex', { eosAmount })}
                </h2>
              ) : (
                <h2>
                  {t('rex_interface_manage_rex_confirmation_modal_sell_rex', { rexAmount })}
                </h2>
              )}
              <Button
                content={t('rex_interface_manage_rex_confirmation_modal_button')}
                onClick={this.confirmTransaction}
              />
            </Modal.Content>
          </Modal>
        )}
        <Message
          warning
        >
          {t('rex_interface_manage_rex_message')}
        </Message>
        <Form>
          <Dropdown
            label={t('rex_interface_rent_resources_amount_label')}
            onChange={({ value}) => this.setState({ transactionType: value })}
            options={['sell', 'buy']}
          />

          {transactionType ? (
            <GlobalFormFieldToken
              connection={connection}
              defaultValue={eosAmount || ''}
              label={t('rex_interface_manage_rex_buy', { chainSymbol: connection.chainSymbol })}
              name="bid"
              onChange={({ value}) => this.setState({ eosAmount: value })}
            />
          ) : (
            <GlobalFormFieldToken
              connection={connection}
              defaultValue={rexAmount || ''}
              label={t('rex_interface_manage_rex_sell', { chainSymbol: connection.chainSymbol })}
              name="bid"
              onChange={({ value}) => this.setState({ rexAmount: value })}
            />
          )}

          { eosAmount && t('rex_interface_manage_rex_amount_in_rex', { cost: eosAmount * priceOfRex }) }
          { eosAmount && t('rex_interface_manage_rex_amount_in_eos', { cost: rexAmount / priceOfRex }) }
          <Button
            onClick={() => this.setState({ confirming: true })}
          />
        </Form>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceManageRex);
