// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Divider, Form, Header, Message } from 'semantic-ui-react';
import { attempt, isError } from 'lodash';
import { Bytes, Name, Transaction } from '@greymass/eosio';

import { createHttpHandler } from '../../../../utils/http/handler';
import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import GlobalFormFieldGeneric from '../../../Global/Form/Field/Generic';
import WalletModalContentBroadcast from '../../../Wallet/Modal/Content/Broadcast';

const initialState = {
  arrayOptions: {},
  currentArrayValues: {},
  form: {},
  formToggleMatchAccount: {},
};

class ContractInterfaceFormAction extends Component<Props> {
  state = initialState;
  componentDidMount() {
    this.resetForm(this.props.contractAction);
  }
  componentWillReceiveProps(nextProps) {
    const {
      contractAction
    } = this.props;
    if (contractAction !== nextProps.contractAction) {
      this.resetForm(nextProps.contractAction);
    }
  }

  formatField = (contractAction, name, value = '', type = null) => {
    const {
      contract
    } = this.props;
    let fieldType = contract.getFieldType(contractAction, name);

    if (type === 'array') {
      fieldType = 'array';
    }

    switch (fieldType) {
      case 'int': {
        return parseInt(value, 10);
      }
      case 'bool': {
        return value ? 1 : 0;
      }
      case 'array': {
        return value;
      }
      case 'string': {
        return String(value);
      }
      default: {
        if (!isError(attempt(JSON.parse, value))) {
          return JSON.parse(value);
        }
        return String(value);
      }
    }
  };
  onChange = (e, { name, value }, type = null) => {
    const { contractAction } = this.props;
    this.setState({
      form: Object.assign(
        {},
        this.state.form,
        {
          [name]: this.formatField(contractAction, name, value, type)
        }
      )
    });
  };
  onToggle = (e, { name, checked }) => {
    this.setState({
      form: Object.assign(
        {},
        this.state.form,
        {
          [name]: checked ? 1 : 0
        }
      )
    });
  };
  onFormToggleName = (e, { name, checked }) => {
    const { settings } = this.props;
    this.setState({
      form: Object.assign(
        {},
        this.state.form,
        {
          [name]: checked ? settings.account : ''
        }
      ),
      formToggleMatchAccount: Object.assign(
        {},
        this.state.formToggleMatchAccount,
        {
          [name]: checked ? 1 : 0
        }
      )
    });
  };
  onSubmit = async () => {
    const {
      actions,
      connection,
      contract,
      contractAction,
      settings
    } = this.props;
    const { httpClient } = await createHttpHandler(connection);
    const { form } = this.state;
    const fields = contract.getFields(contractAction);
    const modified = Object.assign({}, form);
    for (const field of fields) {
      if (field.type === 'transaction') {
        const requiredAbis = modified[field.name].actions
          .filter((action) =>
            !Bytes.isBytes(action.data) && action.data.constructor.abiName === undefined)
          .map((action) => Name.from(action.account));
        const abis = await Promise.all(requiredAbis.map(async (account) => {
          const result = await httpClient.post(`${connection.httpEndpoint}/v1/chain/get_abi`, {
            account_name: String(account)
          });
          return {
            contract: account,
            abi: result.data.abi
          };
        }));
        const tx = Transaction.from(modified[field.name], abis);
        modified[field.name] = JSON.parse(JSON.stringify(tx));
      }
    }
    actions.buildTransaction(contract, contractAction, settings.account, modified);
  };
  resetForm = (contractAction) => {
    const {
      actions,
      contract
    } = this.props;
    const formData = {};
    const fields = contract.getFields(contractAction);
    fields.forEach((field) => {
      formData[field.name] = this.formatField(contractAction, field.name);
    });
    this.setState({ form: formData });
    actions.clearSystemState();
  };
  render() {
    const {
      actions,
      blockExplorers,
      contract,
      contractAction,
      settings,
      system,
      t,
      transaction,
      unlocked,
    } = this.props;
    const {
      currentArrayValues,
      form,
      formToggleMatchAccount,
    } = this.state;
    const signing = !!(system.TRANSACTION_BUILD === 'PENDING');
    const fields = contract.getFields(contractAction);
    const formFields = [];
    const fieldsMeta = fields.map((field) => {
      if (field.type.substr(field.type.length - 2) === '[]') {
        return { ...field, type: 'array' };
      }
      return field;
    });
    fieldsMeta.forEach((field) => {
      switch (field.type) {
        case 'array': {
          const options = (currentArrayValues[field.name] || [])
            .map(option => ({ text: option, value: option, key: option }))
            .concat([{
              key: '',
              text: t('interface_form_field_options_entry'),
              value: 'placeholder',
              disabled: true
            }]);
          formFields.push((
            <Form.Select
              allowAdditions
              fluid
              label={field.name}
              multiple
              name={field.name}
              options={options}
              search
              selection
              value={currentArrayValues[field.name] || []}
              onChange={(e, { name, value }) => {
                this.setState(
                  { currentArrayValues: { ...this.state.currentArrayValues, [name]: value } },
                  () => {
                    this.onChange(null, { name, value }, field.type);
                  }
                );
              }}
            />
          ));
          break;
        }
        case 'bool': {
          formFields.push((
            <Form.Checkbox
              key={`${contractAction}-${field.name}-${field.type}`}
              label={`${field.name} (${field.type})`}
              name={field.name}
              onChange={this.onToggle}
            />
          ));
          break;
        }
        default: {
          formFields.push((
            <GlobalFormFieldGeneric
              disabled={formToggleMatchAccount[field.name]}
              key={`${contractAction}-${field.name}-${field.type}-${formToggleMatchAccount[field.name]}`}
              label={`${field.name} (${field.type})`}
              name={field.name}
              onChange={this.onChange}
              value={form[field.name]}
            />
          ));
          if (field.type === 'name') {
            formFields.push((
              <Form.Checkbox
                key={`${contractAction}-${field.name}-${field.type}-useaccount`}
                label={`Use current account for field '${field.name}'`}
                name={field.name}
                onChange={this.onFormToggleName}
              />
            ));
          }
        }
      }
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
    if (system.TRANSACTION_SIGN === 'FAILURE'
      && transaction
      && transaction.data
    ) {
      modal = (
        <GlobalTransactionModal
          actionName="TRANSACTION_SIGN"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletModalContentBroadcast
              actions={actions}
              settings={settings}
            />
          )}
          contract={transaction.contract}
          icon="wifi"
          open
          title={t('wallet:wallet_panel_wallet_signbroadcast')}
          settings={settings}
          system={system}
          transaction={transaction}
        />
      );
    } else if (system.TRANSACTION_BROADCAST === 'SUCCESS'
      && transaction
      && transaction.data
    ) {
      modal = (
        <GlobalTransactionModal
          actionName="TRANSACTION_BROADCAST"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletModalContentBroadcast
              actions={actions}
              settings={settings}
            />
          )}
          contract={transaction.contract}
          icon="wifi"
          open
          title={t('wallet:wallet_panel_wallet_signbroadcast')}
          settings={settings}
          system={system}
          transaction={transaction}
        />
      );
    } else if (system.TRANSACTION_BUILD
      && transaction
      && transaction.data
    ) {
      modal = (
        <GlobalTransactionModal
          actionName="TRANSACTION_BUILD"
          actions={actions}
          blockExplorers={blockExplorers}
          content={(
            <WalletModalContentBroadcast
              actions={actions}
              settings={settings}
            />
          )}
          contract={transaction.contract}
          icon="wifi"
          open
          title={t('wallet:wallet_panel_wallet_signbroadcast')}
          settings={settings}
          system={system}
          transaction={transaction}
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
          content={t('interface_form_action_button')}
          disabled={signing || !unlocked}
          loading={signing}
          primary
        />
      </Form>
    );
  }
}

export default withTranslation('contract')(ContractInterfaceFormAction);
