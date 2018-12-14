// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsShowTestnets extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('displayTestNetworks', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'testnets_show', value: true, text: t('global_settings_show_testnets') },
      { key: 'testnets_hide', value: false, text: t('global_settings_hide_testnets') }
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

export default translate('global')(GlobalSettingsShowTestnets);
