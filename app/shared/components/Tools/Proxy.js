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

    const account = accounts[settings.account];
    let is_proxy = false;
    if (account && account.voter_info && account.voter_info.is_proxy) {
      is_proxy = account.voter_info.is_proxy;
    }

    return (
      <Grid centered>
        <Grid.Column width={8} style={{ textAlign: 'center' }} >
          {(keys && keys.key || settings.walletMode === 'watch') ?
          (
            <div>
              <Header>
                {t('tools_proxy_header_registration')}
              </Header>
              <Segment style={(is_proxy) ? ({ display: 'none' }) : {}} basic>
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
              <Segment style={(!is_proxy) ? ({ display: 'none' }) : {}} basic>
                <p>
                  {t('tools_proxy_text_registered')}
                </p>
                <Divider />
                <p>
                  {settings.account}
                </p>
                <Divider />
                <ToolsProxyButtonUnregister
                  account={account}
                  actions={actions}
                  settings={settings}
                  system={system}
                />
              </Segment>
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
