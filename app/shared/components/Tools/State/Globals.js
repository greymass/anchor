// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Button, Header, Grid, Message, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class ToolsStateGlobals extends Component<Props> {
  render() {
    const {
      globals,
      t
    } = this.props;
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        <Header>
          {t('tools_state_globals_header')}
          <Header.Subheader>
            {t('tools_state_globals_subheader_message')}
          </Header.Subheader>
        </Header>
        <ReactJson
          displayDataTypes={false}
          displayObjectSize={false}
          iconStyle="square"
          name={null}
          src={globals.current}
          style={{ padding: '1em' }}
          theme="harmonic"
        />
      </Segment>
    );
  }
}

export default withTranslation('tools')(ToolsStateGlobals);
