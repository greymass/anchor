// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsAllowDangerousTransactions extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('allowDangerousTransactions', value);
  };

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'allow_dangerous_transactions', value: true, text: t('global_settings_allow_dangerous_transactions') },
      { key: 'disable_dangerous_transaction', value: false, text: t('global_settings_disable_dangerous_transactions') }
    ];

    return (
      <Dropdown
        name={name}
        onChange={this.onChange}
        options={options}
        selection={selection}
        value={defaultValue || false}
      />
    );
  }
}

export default translate('global')(GlobalSettingsAllowDangerousTransactions);
