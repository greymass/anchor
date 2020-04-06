// @flow
import React, { PureComponent } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';

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
  }
  render() {
    const { settings } = this.props;
    return (
      <Segment attached="top" color="grey" textAlign="center">
        <Header size="tiny">
          <Header.Subheader>
            EOSIO Signing Request
          </Header.Subheader>
          App Integration
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

export default OverviewSidebarPrompt;
