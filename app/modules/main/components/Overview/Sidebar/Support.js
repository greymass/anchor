// @flow
import React, { PureComponent } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

const { shell } = require('electron');

class OverviewSidebarSupport extends PureComponent<Props> {
  openLink = () => shell.openExternal('https://forums.greymass.com')
  render() {
    const { t } = this.props;

    return (
      <Segment attached="top" color="grey" textAlign="center">
        <Header size="tiny">
          <Header.Subheader>
            {t('main_components_overview_sidebar_support_subheader')}
          </Header.Subheader>
          {t('main_components_overview_sidebar_support_header')}
        </Header>
        <Button
          color="black"
          content={t('main_components_overview_sidebar_button')}
          icon="external"
          onClick={this.openLink}
          size="tiny"
        />
      </Segment>
    );
  }
}

export default withTranslation('main')(OverviewSidebarSupport);
