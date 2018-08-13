// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsFilterSpamTransfers extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('filterSpamTransfers', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'global_settings_filter_spam_transfers_do', value: true, text: t('global_settings_filter_spam_transfers_do') },
      { key: 'global_settings_filter_spam_transfers_do_not', value: false, text: t('global_settings_filter_spam_transfers_do_not') }
    ];

    return (
      <Dropdown
        value={defaultValue || false}
        name={name}
        onChange={this.onChange}
        options={options}
        selection={selection}
      />
    );
  }
}

export default translate('global')(GlobalSettingsFilterSpamTransfers);
