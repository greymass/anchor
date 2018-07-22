// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Form, Header, Segment } from 'semantic-ui-react';

import GlobalFormFieldGeneric from '../../../Global/Form/Field/Generic';

class ContractInterfaceSelectorContract extends Component<Props> {
  render() {
    const {
      contract,
      contractName,
      onChange,
      onReset,
      onSubmit,
      t
    } = this.props;
    let display = (
      <Form
        onSubmit={onSubmit}
      >
        <GlobalFormFieldGeneric
          autoFocus
          label={t('interface_contract_account_name')}
          name="contractName"
          onChange={onChange}
          value={contractName}
        />
        <Button
          content={t('interface_contract_load')}
          primary
        />
      </Form>
    );
    if (contract && contract.account === contractName) {
      display = (
        <Segment secondary stacked>
          <Button
            content={t('interface_contract_reset')}
            floated="right"
            onClick={onReset}
            primary
          />
          <Header style={{ marginTop: 0 }}>
            {t('interface_contract_loaded_header')}: {contractName}
            <Header.Subheader>
              {t('interface_contract_loaded_subheader')}
            </Header.Subheader>
          </Header>
        </Segment>
      );
    }
    return display;
  }
}

export default translate('contract')(ContractInterfaceSelectorContract);
