// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Form, Header, Segment } from 'semantic-ui-react';

class ContractInterfaceSelectorTable extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      contractTable,
      contractTableScope
    } = props;
    this.state = {
      contractTable,
      contractTableScope
    };
  }
  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onSubmit = () => this.props.onSet(this.state);
  render() {
    const {
      contract,
      contractTable,
      contractTableScope,
      t
    } = this.props;
    const tableOptions = contract.getTables().map((table) => ({
      text: table.name,
      value: table.name,
    }));
    return (
      <React.Fragment>
        <Header>
          {t('interface_tables_header')}
          <Header.Subheader>
            {t('interface_tables_subheader')}
          </Header.Subheader>
        </Header>
        <p>
          {t('interface_tables_instructions')}
        </p>
        <Segment secondary stacked>
          <Form
            onSubmit={this.onSubmit}
          >
            <Form.Group inline widths="equal">
              <Form.Dropdown
                defaultValue={contractTable}
                fluid
                label={t('interface_tables_header')}
                name="contractTable"
                placeholder={t('interface_tables_placeholder')}
                onChange={this.onChange}
                options={tableOptions}
                selection
              />
              <Form.Input
                defaultValue={contractTableScope}
                fluid
                label={t('interface_tables_scope')}
                name="contractTableScope"
                placeholder={contract.account}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Button
              content={t('interface_tables_load')}
              primary
            />
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceSelectorTable);
