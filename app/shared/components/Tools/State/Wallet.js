// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Grid, Message, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class ToolsStateWallet extends Component<Props> {
  render() {
    const {
      settings,
      t
    } = this.props;
    return (
      <Segment basic>
        <Header>
          {t('tools_wallet_state_header')}
          <Header.Subheader>
            {t('tools_wallet_state_subheader')}
          </Header.Subheader>
        </Header>
        <Segment basic>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={settings}
            style={{ padding: '1em' }}
            theme="harmonic"
          />
        </Segment>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsStateWallet);
