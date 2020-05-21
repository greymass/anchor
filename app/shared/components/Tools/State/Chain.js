// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Button, Header, Grid, Message, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class ToolsStateChain extends Component<Props> {
  render() {
    const {
      chain,
      t
    } = this.props;
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        <Header>
          {t('tools_state_chain_header')}
          <Header.Subheader>
            {t('tools_state_chain_subheader_message')}
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

export default withTranslation('tools')(ToolsStateChain);
