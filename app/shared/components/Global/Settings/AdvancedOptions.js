// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

class GlobalSettingsAdvancedOptions extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('advancedOptions', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'on', value: true, text: t('global_settings_advanced_options_on') },
      { key: 'off', value: false, text: t('global_settings_advanced_options_off') },
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

export default withTranslation('global')(GlobalSettingsAdvancedOptions);
