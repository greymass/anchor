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
  defundingAmount: 'defunding_amount_invalid',
  fundingAmount: 'funding_amount_invalid',
};

class RexInterfaceFund extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'fund'
  };
  componentDidMount() {
    const { actions } = this.props;

    actions.clearSystemState();
  }
  confirmTransaction = () => {
    // const { actions, settings } = this.props;
    // const { defundingAmount, fundingAmount, transactionType } = this.state;
    //
    // if (transactionType === 'fund') {
    //   actions.fund({
    //     amount: fundingAmount,
    //     owner: settings.account
    //   });
    // } else {
    //   actions.defund({
    //     amount: defundingAmount,
    //     owner: settings.account
    //   });
    // }
  };
  handleChange = ({ name, value, valid }) => {
    this.setState({ error: null }, () => {
      if (valid) {
        this.setState({ [name]: value });
      } else {
        return this.setState({ error: invalidErrorMessage[name] });
      }

      const balanceAmount = 100.00; // Grab actual balance
      const notEnoughBalance = balanceAmount < value;

      if (notEnoughBalance) {
        this.setState({ error: 'not_enough_balance' });
      }
    });
  };
  render() {
    const {
      actions,
      balance,
      blockExplorers,
      connection,
      settings,
      system,
      t
    } = this.props;
    const {
      confirming,
      defundingAmount,
      error,
      fundingAmount,
      transactionType
    } = this.state;

    const fundDisabled = error ||
      (!fundingAmount && transactionType === 'fund') ||
      (!defundingAmount && transactionType === 'defund');
    const dropdownOptions = ['fund', 'defund'].map((transactionType) => (
      {
        key: transactionType,
        text: t(`rex_interface_fund_options_${transactionType}`),
        value: transactionType
      }
    ));
    let transaction;
    let contract;

    const actionName = transactionType === 'fund' ? 'REX_FUND' : 'REX_DEFUND';

    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }

    return (
      <Segment basic>
        {confirming && (
          <Modal
            open
            size="small"
          >
            <Header
              icon="cubes"
              content={
                transactionType === 'fund' ?
                  t('rex_interface_fund_confirmation_modal_header_funding') :
                  t('rex_interface_fund_confirmation_modal_header_defunding')
              }
            />

            <Modal.Content>
              <GlobalTransactionHandler
                actionName={transactionType === 'fund' ? 'REX_FUND' : 'REX_DEFUND'}
                actions={actions}
                blockExplorers={blockExplorers}
                content={(
                  <React.Fragment>
                    {transactionType === 'fund' ? (
                      <p>
                        {t('rex_interface_fund_confirmation_modal_funding', { amount: fundingAmount })}
                      </p>
                    ) : (
                      <p>
                        {t('rex_interface_fund_confirmation_modal_defunding', { amount: defundingAmount })}
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
                  disabled={system.REX_FUND || system.REX_DEFUND}
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
          {t('rex_interface_fund_message', { chainSymbol: connection.chainSymbol })}
        </Message>
        <Message success>{
            t(
              'rex_interface_fund_balance',
              {
                balance: balance[connection.chainSymbol],
                chainSymbol: connection.chainSymbol
              }
            )
          }
        </Message>
        <Form>
          <Form.Group widths="equal">
            <label>
              <strong>{t('rex_interface_transaction_type_label')}</strong>
              <br />
              <Dropdown
                autoFocus
                defaultValue="fund"
                name="transactionType"
                onChange={(e, props) => this.handleChange({ ...props, valid: true })}
                options={dropdownOptions}
                selection
                style={{ marginTop: '4px' }}
              />
            </label>
            {transactionType === 'fund' ? (
              <GlobalFormFieldToken
                connection={connection}
                defaultValue={fundingAmount || ''}
                key="fundingAmount"
                label={t('rex_interface_fund_label_fund', { chainSymbol: connection.chainSymbol })}
                name="fundingAmount"
                onChange={(e, props) => this.handleChange(props)}
              />
            ) : (
              <GlobalFormFieldToken
                connection={connection}
                defaultValue={defundingAmount || ''}
                key="defundingAmount"
                label={t('rex_interface_fund_label_defund', { chainSymbol: connection.chainSymbol })}
                name="defundingAmount"
                onChange={(e, props) => this.handleChange(props)}
              />
            )}
          </Form.Group>

          {error && (
            <GlobalFormMessageError
              style={{ marginTop: '20px', marginBottom: '20px' }}
              error={error}
            />
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
