// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Grid, Message, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class ToolsStateChain extends Component<Props> {
  render() {
    const {
      chain,
      t
    } = this.props;
    return (
      <Segment basic>
        <Header>
          {t('tools_state_chain_header')}
          <Header.Subheader>
            {t('tools_state_chain_subheader')}
          </Header.Subheader>
        </Header>
        <Segment basic>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={chain}
            style={{ padding: '1em' }}
            theme="harmonic"
          />
        </Segment>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsStateChain);
