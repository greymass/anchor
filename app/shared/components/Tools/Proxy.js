// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Grid, Message, Segment } from 'semantic-ui-react';

type Props = {
  actions: {
    clearSystemState: () => void
  },
  accounts: {},
  balances: {},
  settings: {},
  validate: {},
  system: {}
};

class ToolsProxy extends Component<Props> {
  props: Props;

  state = {
    open: false
  }

  render() {
    const {
      actions,
      accounts,
      balances,
      settings,
      validate,
      system,
      t
    } = this.props;

    const {
      open
    } = this.state;

    const isRegistered = true;

    return (
      <Segment basic>
        <Header>
          {t('tools_proxy_header')}
          <Header.Subheader>
            {t('tools_proxy_subheader')}
          </Header.Subheader>
        </Header>
        <Segment basic>
          {(!isRegistered) ? (
            <ToolsProxyButtonRegister
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="square"
              name={null}
              src={settings}
              style={{ padding: '1em' }}
              theme="harmonic"
            />
          ) : ''}
          {(isRegistered) ? (
            <ToolsProxyButtonUnregister
              displayDataTypes={false}
              displayObjectSize={false}
              iconStyle="square"
              name={null}
              src={settings}
              style={{ padding: '1em' }}
              theme="harmonic"
            />
          ) : ''}
        </Segment>
      </Segment>
    );
  }
}

export default translate('tools')(WalletPanelButtonStake);
