// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

const { ipcRenderer } = require('electron');

class GlobalSettingsSigningRequests extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('allowSigningRequests', value);
    if (value) {
      ipcRenderer.send('enableSigningRequests');
    } else {
      ipcRenderer.send('disableSigningRequests');
    }
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'signingrequests_enable', value: true, text: t('global_settings_enable_signingrequests') },
      { key: 'signingrequests_disable', value: false, text: t('global_settings_disable_signingrequests') }
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

export default withTranslation('global')(GlobalSettingsSigningRequests);
