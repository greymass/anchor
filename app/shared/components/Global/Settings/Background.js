// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';

const { ipcRenderer } = require('electron');

export class GlobalSettingsBackground extends Component<Props> {
  onChange = debounce((e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('backgroundMode', value);
    ipcRenderer.send('setBackgroundMode', value);
  }, 300)
  render() {
    const {
      t,
      value,
    } = this.props;
    const backgroundOptions = [
      { value: 'both', text: t('tools_change_background_both') },
      { value: 'tray', text: t('tools_change_background_tray') },
      { value: 'dock', text: t('tools_change_background_dock') },
    ];
    return (
      <Dropdown
        onChange={this.onChange}
        options={backgroundOptions}
        selection
        value={value}
      />
    );
  }
}

export default withTranslation('tools')(GlobalSettingsBackground);
