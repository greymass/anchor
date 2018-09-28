// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Header, Button } from 'semantic-ui-react';

import ProducersButtonProxy from './Proxy/Button/Proxy';

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
        {(isProxying)
          ? (
            <div>
              <Button
                color="green"
                content={t('producers_panel_refresh_proxy')}
                fluid
                icon="sync"
                onClick={this.onRefreshClick}
                style={{ marginTop: '1em' }}
              />
              <Header block color="blue" size="large">
                <Icon name="circle info" />
                <Header.Content>
                  <Header.Subheader>
                    {t('producers_table_votes_proxied')}
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
