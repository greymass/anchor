// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Dropdown, Flag, Menu } from 'semantic-ui-react';

const languages = [
  { key: 'en', value: 'en', flag: 'us', text: 'EN' },
  { key: 'fr', value: 'fr', flag: 'fr', text: 'FR' },
  { key: 'ja', value: 'ja', flag: 'jp', text: '日本語' },
  { key: 'kr', value: 'kr', flag: 'kr', text: '한글' }
];

class WalletLanguage extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions, i18n } = this.props;
    i18n.changeLanguage(value);
    actions.setSetting('lang', value);
  }
  render() {
    const {
      settings
    } = this.props;
    return (
      <Menu.Item
        key="language"
        inverted="true"
      >
        <Dropdown
          defaultValue={settings.lang}
          fluid
          onChange={this.onChange}
          options={languages}
        />
      </Menu.Item>
    );
  }
}

export default translate('wallet')(WalletLanguage);
