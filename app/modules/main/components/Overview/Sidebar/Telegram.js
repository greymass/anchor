// @flow
import React, { PureComponent } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';

const { shell } = require('electron');

class OverviewSidebarTelegram extends PureComponent<Props> {
  openLink = () => shell.openExternal('https://t.me/anchorwallet')
  render() {
    return (
      <Segment attached="top" color="grey" textAlign="center">
        <Header size="tiny">
          <Header.Subheader>
            Need help?
          </Header.Subheader>
          Join our Telegram chat!
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

export default OverviewSidebarTelegram;
