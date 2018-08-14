// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsSkipLinkModal extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('skipLinkModal', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'skip_link_modal', value: true, text: t('global_settings_skip_link_modal_skip') },
      { key: 'do_not_skip_link_modal', value: false, text: t('global_settings_skip_link_modal_do_not_skip') }
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

export default translate('global')(GlobalSettingsSkipLinkModal);
