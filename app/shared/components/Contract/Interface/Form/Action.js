// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Form, Header, Message } from 'semantic-ui-react';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import GlobalFormFieldGeneric from '../../../Global/Form/Field/Generic';
import WalletModalContentBroadcast from '../../../Wallet/Modal/Content/Broadcast';

const initialState = {
  form: {}
};

class ContractInterfaceFormAction extends Component<Props> {
  state = initialState;
  componentWillReceiveProps(nextProps) {
    const { contractAction } = this.props;
    if (contractAction.name !== nextProps.contractAction.name) {
      this.resetForm();
    }
  }
  onChange = (e, { name, value }) => {
    this.setState({
      form: Object.assign({}, this.state.form, { [name]: value })
    });
  }
  onSubmit = () => {
    const {
      actions,
      contract,
      contractAction,
      settings
    } = this.props;
    const { form } = this.state;
    actions.buildTransaction(contract, contractAction, settings.account, form);
  }
  resetForm = () => {
    this.setState({ ...initialState });
  }
  render() {
    const {
      actions,
      blockExplorers,
      contract,
      contractAction,
      settings,
      system,
      t,
      transaction
    } = this.props;

    const action = contract.getAction(contractAction);
    const fields = contract.getFields(contractAction);

    const formFields = [];
    fields.forEach((field) => {
      formFields.push((
        <GlobalFormFieldGeneric
          key={`${contractAction}-${field.name}-${field.type}`}
          label={`${field.name} (${field.type})`}
          name={field.name}
          onChange={this.onChange}
        />
      ));
    });

    let errors = '';
    if (system.TRANSACTION_BUILD_LAST_ERROR) {
      errors = (
        <Message
          content={String(system.TRANSACTION_BUILD_LAST_ERROR)}
          error
          icon="warning sign"
        />
      );
    }

    let modal;
    if (system.TRANSACTION_SUCCESS
      && transaction
      && transaction.data
      && transaction.data.transaction_id
    ) {
      modal = (
        <GlobalTransactionModal
          actionName="TRANSACTION_BUILD"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletModalContentBroadcast
              actions={actions}
            />
          )}
          contract={transaction.contract}
          icon="wifi"
          open
          title={t('wallet_panel_wallet_broadcast')}
          settings={settings}
          system={system}
          transaction={transaction.data}
        />
      );
    }
    if (system.TRANSACTION_BUILD === 'SUCCESS'
      && transaction
      && transaction.data
      && transaction.data.transaction_id
    ) {
      modal = (
        <GlobalTransactionModal
          actionName="TRANSACTION_BUILD"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletModalContentBroadcast
              actions={actions}
            />
          )}
          contract={transaction.contract}
          icon="wifi"
          open
          title={t('wallet_panel_wallet_broadcast')}
          settings={settings}
          system={system}
          transaction={transaction.data}
        />
      );
    }
    if (system.TRANSACTION_SIGN === 'FAILURE'
      && transaction
      && transaction.data
      && transaction.data.transaction_id
    ) {
      modal = (
        <GlobalTransactionModal
          actionName="TRANSACTION_SIGN"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletModalContentBroadcast
              actions={actions}
            />
          )}
          contract={transaction.contract}
          icon="wifi"
          open
          title={t('wallet_panel_wallet_broadcast')}
          settings={settings}
          system={system}
          transaction={transaction.data}
        />
      );
    }
    return (
      <Form
        error={!!(errors)}
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('interface_form_action_header')}
          <Header.Subheader>
            {t('interface_form_action_subheader')}
          </Header.Subheader>
        </Header>
        <p>
          {t('interface_form_action_instructions')}
        </p>
        <Divider />
        {modal}
        {formFields}
        {errors}
        <Button
          content={t('build')}
          primary
        />
      </Form>
    );
  }
}

export default translate('contract')(ContractInterfaceFormAction)
