// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

class GlobalSettingsShowTestnets extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('refreshRate', parseInt(value, 10));
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: '10', value: 10, text: t('global_settings_refresh_rate_10') },
      { key: '20', value: 20, text: t('global_settings_refresh_rate_20') },
      { key: '30', value: 30, text: t('global_settings_refresh_rate_30') },
      { key: '60', value: 60, text: t('global_settings_refresh_rate_60') },
      { key: '120', value: 120, text: t('global_settings_refresh_rate_120') },
      { key: '300', value: 300, text: t('global_settings_refresh_rate_300') },
      { key: '0', value: 0, text: t('global_settings_refresh_rate_disable') },
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

export default withTranslation('global')(GlobalSettingsShowTestnets);
