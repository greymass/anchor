// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Header } from 'semantic-ui-react';

class ContractInterfaceSelectorTable extends Component<Props> {
  render() {
    const {
      contract,
      onChange,
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
        <Dropdown
          name="contractTable"
          placeholder={t('interface_tables_header')}
          onChange={onChange}
          options={tableOptions}
          selection
        />
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceSelectorTable);
