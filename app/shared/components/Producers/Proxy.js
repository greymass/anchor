// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Header, Button } from 'semantic-ui-react';

import ProducersButtonProxy from './Proxy/Button/Proxy';
import GlobalAccountFragmentVoterInfoEffectiveness from '../../containers/Global/Account/Fragment/VoterInfo/Effectiveness';

class ProducersProxy extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      refreshProxy: false
    };
  }

  onRefreshClick = (e) => {
    e.preventDefault();

    this.setState({
      refreshProxy: true
    });
  }

  onClose = () => {
    this.setState({
      refreshProxy: false
    }, () => {
      this.props.onClose();
    });
  }

  render() {
    const {
      account,
      accounts,
      actions,
      blockExplorers,
      currentProxy,
      isProxying,
      isValidUser,
      removeProxy,
      settings,
      system,
      t,
      tables
    } = this.props;
    let {
      addProxy
    } = this.props;

    const proxyAccount = (account && account.voter_info) ? account.voter_info.proxy : '';

    if (this.state.refreshProxy) {
      addProxy = addProxy || proxyAccount;
    }

    return (
      <React.Fragment>
        {(account)
          ? (
            <Header block color="green" size="large">
              <Header.Subheader style={{ marginBottom: '0.5em' }}>
                Vote Strength
              </Header.Subheader>
              <GlobalAccountFragmentVoterInfoEffectiveness
                account={account.account_name}
              />
              <Header.Subheader style={{ marginTop: '0.5em' }}>
                <small>
                  Votes decay over time, refresh your vote to increase its strength.
                </small>
              </Header.Subheader>
            </Header>
          )
          : false
        }
        {(isValidUser)
          ? (
            <ProducersButtonProxy
              accounts={accounts}
              actions={actions}
              addProxy={addProxy}
              blockExplorers={blockExplorers}
              currentProxy={currentProxy}
              onClose={this.onClose}
              isProxying={isProxying}
              proxyAccount={proxyAccount}
              removeProxy={removeProxy}
              settings={settings}
              system={system}
              tables={tables}
            />
          )
          : ''
        }
        {(isValidUser && isProxying)
          ? (
            <div>
              <Button
                color="teal"
                content={t('producers_panel_refresh_proxy')}
                fluid
                icon="sync"
                onClick={this.onRefreshClick}
                style={{ marginBottom: '1em' }}
              />
              <Header block color="blue" size="large" style={{ marginTop: 0 }}>
                <Icon name="circle info" />
                <Header.Content>
                  <Header.Subheader>
                    {t('producers_table_votes_proxied_r2')}
                  </Header.Subheader>
                  {proxyAccount}
                </Header.Content>
              </Header>
            </div>
          )
          : ''
        }
      </React.Fragment>
    );
  }
}

export default translate('producers')(ProducersProxy);
