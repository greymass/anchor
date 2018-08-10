// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsFilterSpamTransfers extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('filter_spam_transfers', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'filter_spam_transfers', value: true, text: t('filter_spam_transfers') },
      { key: 'do_not_filter_spam_transfers', value: false, text: t('do_not_filter_spam_transfers') }
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
