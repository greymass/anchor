// @flow
import React, { PureComponent } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

const { ipcRenderer } = require('electron');

class OverviewSidebarPrompt extends PureComponent<Props> {
  toggleSigning = () => {
    const newValue = !this.props.settings.allowSigningRequests;
    this.props.actions.setSetting('allowSigningRequests', newValue);
    if (newValue) {
      ipcRenderer.send('enableSigningRequests');
    } else {
      ipcRenderer.send('disableSigningRequests');
    }
  };
  render() {
    const { settings, t } = this.props;
    return (
      <Segment attached="top" color="orange" textAlign="center">
        <Header size="tiny">
          <Header.Subheader>
            {t('main_components_overview_sidebar_prompt_subheader')}
          </Header.Subheader>
          {t('main_components_overview_sidebar_prompt_header')}
        </Header>
        <Button
          color={(settings.allowSigningRequests) ? 'orange' : 'green'}
          content={(settings.allowSigningRequests) ? 'Disable' : 'Enable'}
          icon="power"
          onClick={this.toggleSigning}
          size="tiny"
        />
      </Segment>
    );
  }
}

export default withTranslation('main')(OverviewSidebarPrompt);
