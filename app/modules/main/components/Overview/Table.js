// @flow
import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';
import { map, uniq } from 'lodash';

import ExplorerLink from '../../../../shared/containers/Global/Blockchain/ExplorerLink';
import OverviewTableHeader from './Table/Header';
import GlobalAccountFragmentRamPercent from '../../../../shared/containers/Global/Account/Fragment/RamPercent';
import GlobalAccountFragmentResourcePercent from '../../../../shared/containers/Global/Account/Fragment/ResourcePercent';
import GlobalAccountFragmentStaleness from '../../../../shared/containers/Global/Account/Fragment/Staleness';
import GlobalAccountFragmentSystemTokenBalance from '../../../../shared/containers/Global/Account/Fragment/SystemTokenBalance';
import GlobalAccountFragmentTokenBalance from '../../../../shared/containers/Global/Account/Fragment/TokenBalance';
import GlobalAccountFragmentTokenDelegated from '../../../../shared/containers/Global/Account/Fragment/TokenDelegated';
import GlobalAccountFragmentTokenStaked from '../../../../shared/containers/Global/Account/Fragment/TokenStaked';
import GlobalAccountFragmentVoterInfoVotes from '../../../../shared/containers/Global/Account/Fragment/VoterInfo/Votes';
import GlobalAccountFragmentVoterInfoEffectiveness from '../../../../shared/containers/Global/Account/Fragment/VoterInfo/Effectiveness';
import GlobalAccountFragmentVoterInfoWeightValue from '../../../../shared/containers/Global/Account/Fragment/VoterInfo/WeightValue';
import GlobalAccountFragmentVoterInfoProxy from '../../../../shared/containers/Global/Account/Fragment/VoterInfo/Proxy';

class OverviewTable extends Component<Props> {
  componentDidUpdate(prevProps) {
    Object.entries(this.props).forEach(([key, val]) => prevProps[key] !== val && console.log(`OverviewTable '${key}' changed`));
  }
  render() {
    const {
      chainSymbol,
      settings,
      view,
      wallets,
    } = this.props;
    const accountBalances = {};
    const chainAccounts = [].concat(wallets).filter((w) => (w.chainId === settings.chainId));
    const accountNames = uniq(map(chainAccounts, 'account')).sort();

    accountNames.forEach((accountName) => {
      settings.customTokens.forEach((token) => {
        const [chain, contract, symbol] = token.split(':');
        if (chain === settings.chainId) {
          if (!accountBalances[accountName]) {
            accountBalances[accountName] = [];
          }
          accountBalances[accountName].push((
            <Table.Cell textAlign="right">
              <GlobalAccountFragmentTokenBalance
                account={accountName}
                chainId={settings.chainId}
                contract={contract}
                token={symbol}
              />
            </Table.Cell>
          ));
        }
      });
    });

    let header;

    switch (view) {
      default:
      case 'systemtokens': {
        header = (
          <Header>
            System Token: {chainSymbol}
            <Header.Subheader>
              The native resource token for this blockchain.
            </Header.Subheader>
          </Header>
        );
        break;
      }
      case 'balances': {
        header = (
          <Header>
            Tracked Tokens
            <Header.Subheader>
              The EOSIO token variants created on this blockchain.
            </Header.Subheader>
          </Header>
        );
        break;
      }
      case 'governance': {
        header = (
          <Header>
            Governance Statistics
            <Header.Subheader>
              A breakdown of all loaded accounts and their involvement in governance.
            </Header.Subheader>
          </Header>
        );
        break;
      }
      case 'resources': {
        header = (
          <Header>
            Resource Usage
            <Header.Subheader>
              The resource usage breakdown for all loaded accounts on this blockchain.
            </Header.Subheader>
          </Header>
        );
        break;
      }
    }
    return (
      <div style={{ overflowX: 'auto' }}>
        {header}
        <Table celled className="overview" size="small" striped unstackable>
          <OverviewTableHeader
            settings={settings}
            view={view}
          />
          <Table.Body>
            {accountNames.map((accountName) => (
              <Table.Row>
                <Table.Cell>
                  <ExplorerLink
                    content={accountName}
                    linkData={accountName}
                    linkType="account"
                  />
                </Table.Cell>
                {(view === 'systemtokens')
                  ? (
                    <React.Fragment>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentTokenBalance
                          account={accountName}
                          chainId={settings.chainId}
                          contract="eosio"
                          token={chainSymbol}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentTokenStaked
                          account={accountName}
                          chainId={settings.chainId}
                          contract="eosio"
                          token={chainSymbol}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentTokenDelegated
                          account={accountName}
                          chainId={settings.chainId}
                          contract="eosio"
                          token={chainSymbol}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentSystemTokenBalance
                          account={accountName}
                          chainId={settings.chainId}
                          contract="eosio"
                          token={chainSymbol}
                        />
                      </Table.Cell>
                    </React.Fragment>
                  )
                  : false
                }
                {(view === 'governance')
                  ? (
                    <React.Fragment>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentVoterInfoWeightValue
                          account={accountName}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right" collapsing>
                        <GlobalAccountFragmentVoterInfoEffectiveness
                          account={accountName}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right" collapsing>
                        <GlobalAccountFragmentVoterInfoVotes
                          account={accountName}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <GlobalAccountFragmentVoterInfoProxy
                          account={accountName}
                        />
                      </Table.Cell>
                    </React.Fragment>
                  )
                  : false
                }
                {(view === 'balances')
                  ? (
                    <React.Fragment>
                      {accountBalances[accountName]}
                    </React.Fragment>
                  )
                  : false
                }
                {(view === 'resources')
                  ? (
                    <React.Fragment>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentResourcePercent
                          account={accountName}
                          type="cpu"
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentResourcePercent
                          account={accountName}
                          type="net"
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <GlobalAccountFragmentRamPercent
                          account={accountName}
                        />
                      </Table.Cell>
                    </React.Fragment>
                  )
                  : false
                }
                <Table.Cell collapsing>
                  <GlobalAccountFragmentStaleness
                    account={accountName}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default OverviewTable;
