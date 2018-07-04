// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment, Divider, Grid } from 'semantic-ui-react';

import ToolsProxyButtonRegister from './Button/Register';
import ToolsProxyButtonUnregister from './Button/Unregister';
import WalletPanelLocked from '../Wallet/Panel/Locked';

class ToolsProxy extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      keys,
      settings,
      system,
      validate,
      wallet,
      t
    } = this.props;

    const account = accounts[wallet.account];

    const {
      voter_info
    } = account;

    const {
      is_proxy
    } = voter_info;

    return (
      <Grid centered>
        <Grid.Column width={8} style={{ textAlign: 'center' }} >
          {(keys && keys.key) ?
          (
            <div>
              <Header>
                {t('tools_proxy_header_registration')}
              </Header>
              {(!is_proxy) ? (
                <Segment basic>
                  <p>
                    {t('tools_proxy_text_not_registered')}
                  </p>
                  <Divider />
                  <ToolsProxyButtonRegister
                    account={account}
                    actions={actions}
                    settings={settings}
                    system={system}
                  />
                </Segment>
              ) : ''}
              {(is_proxy) ? (
                <Segment basic>
                  <p>
                    {t('tools_proxy_text_registered')}
                  </p>
                  <Divider />
                  <p>
                    {wallet.account}
                  </p>
                  <Divider />
                  <ToolsProxyButtonUnregister
                    account={account}
                    actions={actions}
                    settings={settings}
                    system={system}
                  />
                </Segment>
              ) : ''}
            </div>
          ) : (
            <WalletPanelLocked
              actions={actions}
              settings={settings}
              validate={validate}
              wallet={wallet}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default translate('tools')(ToolsProxy);
