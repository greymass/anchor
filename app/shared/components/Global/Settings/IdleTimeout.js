// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsIdleTimeout extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('idleTimeout', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const timeoutOptions = [
      { key: 'no_timeout', value: 999999999, text: t('global_settings_idle_timeout_no_timeout') },
      { key: 'five_minutes', value: 5 * 60 * 1000, text: t('global_settings_idle_timeout_five_minutes') },
      { key: 'fifteen_minutes', value: 15 * 60 * 1000, text: t('global_settings_idle_timeout_fifteen_minutes') },
      { key: 'thirty_minutes', value: 30 * 60 * 1000, text: t('global_settings_idle_timeout_thirty_minutes') },
      { key: 'sixty_minutes', value: 60 * 60 * 1000, text: t('global_settings_idle_timeout_sixty_minutes') }
    ];

    return (
      <Dropdown
        name={name}
        onChange={this.onChange}
        options={timeoutOptions}
        selection={selection}
        value={defaultValue || 999999999}
      />
    );
  }
}

export default translate('global')(GlobalSettingsIdleTimeout);
