// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Form, Header, Segment } from 'semantic-ui-react';

import GlobalFormFieldGeneric from '../../../Global/Form/Field/Generic';

class ContractInterfaceSelectorContract extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      contractName: props.contractName
    };
  }
  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = () => {
    const {
      onSet,
      onSubmit
    } = this.props;
    onSet(this.state, onSubmit);
  }
  render() {
    const {
      contract,
      onReset,
      t
    } = this.props;
    const {
      contractName
    } = this.state;
    let display = (
      <Segment basic>
        <Form
          onSubmit={this.onSubmit}
        >
          <Header>
            {t('interface_header')}
            <Header.Subheader>
              {t('interface_subheader')}
            </Header.Subheader>
          </Header>
          <GlobalFormFieldGeneric
            autoFocus
            label={t('interface_contract_account_name')}
            name="contractName"
            onChange={this.onChange}
            value={contractName}
          />
          <Button
            content={t('interface_contract_load')}
            primary
          />
        </Form>
      </Segment>
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
