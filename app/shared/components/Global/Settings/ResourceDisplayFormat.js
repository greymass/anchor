// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsResourceDisplayFormat extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('displayResourcesAvailable', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'display_resources_available', value: true, text: t('global_settings_display_resources_available') },
      { key: 'display_resources_used', value: false, text: t('global_settings_display_resources_used') }
    ];

    return (
      <Dropdown
        name={name}
        onChange={this.onChange}
        options={options}
        selection={selection}
        value={defaultValue || true}
      />
    );
  }
}

export default translate('global')(GlobalSettingsResourceDisplayFormat);
