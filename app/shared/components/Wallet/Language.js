// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Dropdown, Flag, Menu } from 'semantic-ui-react';

const languages = [
  { key: 'cn', value: 'zh-CN', flag: 'cn', text: '中文' },
  { key: 'en', value: 'en-US', flag: 'us', text: 'EN' },
  { key: 'fr', value: 'fr-FR', flag: 'fr', text: 'FR' },
  { key: 'it', value: 'it-IT', flag: 'it', text: 'IT' },
  { key: 'ja', value: 'ja-JP', flag: 'jp', text: '日本語' },
  { key: 'kr', value: 'ko-KR', flag: 'kr', text: '한글' }
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
