// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';
import GlobalSettingsLanguage from '../Global/Settings/Language';

class WalletLanguage extends Component<Props> {
  render() {
    const {
      actions,
      i18n,
      settings
    } = this.props;

    return (
      <Menu.Item
        key="language"
        inverted="true"
      >
        <GlobalSettingsLanguage
          actions={actions}
          setLanguage={settings.lang}
          i18n={i18n}
          onChange={this.onChange}
          settings
        />

      </Menu.Item>
    );
  }
}

export default withTranslation('wallet')(WalletLanguage);
