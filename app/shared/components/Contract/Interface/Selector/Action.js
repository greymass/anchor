// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Header } from 'semantic-ui-react';

class ContractInterfaceSelectorAction extends Component<Props> {
  render() {
    const {
      contract,
      onChange,
      t
    } = this.props;
    const actionOptions = contract.getActions().map((action) => ({
      text: action.name,
      value: action.type,
    }));
    return (
      <React.Fragment>
        <Header>
          {t('interface_actions_header')}
          <Header.Subheader>
            {t('interface_actions_subheader')}
          </Header.Subheader>
        </Header>
        <p>
          {t('interface_actions_instructions')}
        </p>
        <Dropdown
          name="contractAction"
          placeholder={t('interface_actions_header')}
          onChange={onChange}
          options={actionOptions}
          selection
        />
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceSelectorAction);
