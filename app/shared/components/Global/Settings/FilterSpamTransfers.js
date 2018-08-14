// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsFilterSpamTransfers extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('filterSpamTransfersUnder', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'global_settings_filter_spam_transfers_0_0002', value: 0.0002, text: t('global_settings_filter_spam_transfers_0_0002') },
      { key: 'global_settings_filter_spam_transfers_0_0010', value: 0.0010, text: t('global_settings_filter_spam_transfers_0_0010') },
      { key: 'global_settings_filter_spam_transfers_0_0100', value: 0.0100, text: t('global_settings_filter_spam_transfers_0_0100') },
      { key: 'global_settings_filter_spam_transfers_0_1000', value: 0.1000, text: t('global_settings_filter_spam_transfers_0_1000') },
      { key: 'global_settings_filter_spam_transfers_do_not', value: 0.0000, text: t('global_settings_filter_spam_transfers_do_not') }
    ];

    return (
      <Dropdown
        value={defaultValue || 0.0000}
        name={name}
        onChange={this.onChange}
        options={options}
        selection={selection}
      />
    );
  }
}

export default translate('global')(GlobalSettingsFilterSpamTransfers);
