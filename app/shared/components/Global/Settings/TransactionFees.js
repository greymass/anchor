// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

class GlobalSettingsTransactionFees extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('transactionFees', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'on', value: true, text: t('global_settings_transaction_fees_on') },
      { key: 'off', value: false, text: t('global_settings_transaction_fees_off') },
    ];

    return (
      <Dropdown
        defaultValue={defaultValue}
        name={name}
        onChange={this.onChange}
        options={options}
        selection={selection}
        value={defaultValue}
      />
    );
  }
}

export default withTranslation('global')(GlobalSettingsTransactionFees);
