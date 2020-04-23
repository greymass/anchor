// @flow
import React, { PureComponent } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

const { shell } = require('electron');

class OverviewSidebarTelegram extends PureComponent<Props> {
  openLink = () => shell.openExternal('https://t.me/anchorwallet')
  render() {
    const { t } = this.props;

    return (
      <Segment attached="top" color="grey" textAlign="center">
        <Header size="tiny">
          <Header.Subheader>
            {t('main_components_overview_sidebar_telegram_subheader')}
          </Header.Subheader>
          {t('main_components_overview_sidebar_telegram_header')}
        </Header>
        <Button
          color="black"
          content="Join Chat"
          icon="telegram"
          onClick={this.openLink}
          size="tiny"
        />
      </Segment>
    );
  }
}

export default withTranslation('main')(OverviewSidebarTelegram);
