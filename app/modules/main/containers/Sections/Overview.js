// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Header, Placeholder, Segment, Table } from 'semantic-ui-react';
import { times, map, uniq } from 'lodash';
import ReactJson from 'react-json-view';

import * as SettingsActions from '../../../../shared/actions/settings';

import ExplorerLink from '../../../../shared/components/Global/Modal/ExplorerLink';
import GlobalSettingsOverviewToken from '../../../../shared/components/Global/Settings/OverviewToken';
import GlobalAccountFragmentTokenBalance from '../../../../shared/containers/Global/Account/Fragment/TokenBalance';
import GlobalAccountFragmentRamPercent from '../../../../shared/containers/Global/Account/Fragment/RamPercent';
import GlobalAccountFragmentResourcePercent from '../../../../shared/containers/Global/Account/Fragment/ResourcePercent';
import OverviewBlockchainContainer from './Overview/Blockchain';

class OverviewContainer extends Component<Props> {
  state: {
    overviewTrackedToken: false
  }
  render() {
    const {
      accounts,
      actions,
      app,
      balances,
      blockExplorers,
      settings,
      wallets,
    } = this.props;
    const chainAccounts = [].concat(wallets).filter((w) => (w.chainId === settings.chainId));
    const chainSettings = settings.chainSettings[settings.chainId];
    const accountNames = uniq(map(chainAccounts, 'account')).sort();
    const [overviewContract, overviewSymbol] = (chainSettings.overviewToken || 'eosio:EOS').split(':');
    return (
      <React.Fragment>
        <OverviewBlockchainContainer
          settings={settings}
        />
        <Segment.Group vertical>
          <Segment attached>
            <Table unstackable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    Account
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    EOS Balance
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <GlobalSettingsOverviewToken
                      actions={actions}
                      chainId={settings.chainId}
                      defaultValue={chainSettings.overviewToken}
                      setLanguage={settings.lang}
                      selection
                      tokens={settings.customTokens}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    CPU
                  </Table.Cell>
                  <Table.Cell>
                    NET
                  </Table.Cell>
                  <Table.Cell>
                    RAM
                  </Table.Cell>
                </Table.Row>
                {accountNames.map((accountName) => {
                  const isLoaded = !!(accounts[accountName]);
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <ExplorerLink
                          blockExplorers={blockExplorers}
                          content={accountName}
                          linkData={accountName}
                          linkType="account"
                          settings={settings}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentTokenBalance
                          account={accountName}
                          chainId={settings.chainId}
                          contract="eosio"
                          token="EOS"
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentTokenBalance
                          account={accountName}
                          chainId={settings.chainId}
                          contract={overviewContract}
                          token={overviewSymbol}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <GlobalAccountFragmentResourcePercent
                          account={accountName}
                          type="cpu"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <GlobalAccountFragmentResourcePercent
                          account={accountName}
                          type="net"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <GlobalAccountFragmentRamPercent
                          account={accountName}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    app: state.app,
    balances: state.balances,
    blockExplorers: state.blockexplorers[state.connection.chainKey],
    features: state.features,
    navigation: state.navigation,
    settings: state.settings,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewContainer));
