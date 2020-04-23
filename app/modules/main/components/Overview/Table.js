// @flow
import React, { Component } from 'react';
import { Header, Table } from 'semantic-ui-react';
import { isEmpty, map, sortBy, uniq } from 'lodash';
import { Link } from 'react-router-dom';

import ExplorerLink from '../../../../shared/containers/Global/Blockchain/ExplorerLink';
import OverviewTableHeader from './Table/Header';
import GlobalAccountLink from '../../../../shared/containers/Global/Account/Link';
import GlobalAccountFragmentRamPercent from '../../../../shared/containers/Global/Account/Fragment/Ram/Percent';
import GlobalAccountFragmentResourcePercent from '../../../../shared/containers/Global/Account/Fragment/Resource/Percent';
import GlobalAccountFragmentREXBalance from '../../../../shared/containers/Global/Account/Fragment/REX/Balance';
import GlobalAccountFragmentStaleness from '../../../../shared/containers/Global/Account/Fragment/Staleness';
import GlobalAccountFragmentSystemTokenBalance from '../../../../shared/containers/Global/Account/Fragment/SystemTokenBalance';
import GlobalAccountFragmentSystemTokenValue from '../../../../shared/containers/Global/Account/Fragment/SystemTokenValue';
import GlobalAccountFragmentTokenBalance from '../../../../shared/containers/Global/Account/Fragment/TokenBalance';
import GlobalAccountFragmentTokenDelegated from '../../../../shared/containers/Global/Account/Fragment/TokenDelegated';
import GlobalAccountFragmentTokenRefunding from '../../../../shared/containers/Global/Account/Fragment/TokenRefunding';
import GlobalAccountFragmentTokenStaked from '../../../../shared/containers/Global/Account/Fragment/TokenStaked';
import GlobalAccountFragmentVoterInfoVotes from '../../../../shared/containers/Global/Account/Fragment/VoterInfo/Votes';
import GlobalAccountFragmentVoterInfoEffectiveness from '../../../../shared/containers/Global/Account/Fragment/VoterInfo/Effectiveness';
import GlobalAccountFragmentVoterInfoWeightValue from '../../../../shared/containers/Global/Account/Fragment/VoterInfo/WeightValue';
import GlobalAccountFragmentVoterInfoProxy from '../../../../shared/containers/Global/Account/Fragment/VoterInfo/Proxy';
import { withTranslation } from "react-i18next";

class OverviewTable extends Component<Props> {
  render() {
    const {
      chainSymbol,
      settings,
      stakedResources,
      supportedContracts,
      t,
      view,
      wallets,
    } = this.props;
    const accountBalances = {};
    const chainAccounts = [].concat(wallets).filter((w) => (w.chainId === settings.chainId));
    const accountNames = uniq(map(chainAccounts, 'account')).sort();

    const tokens = settings.customTokens.filter((token) => {
      const [chain] = token.split(':');
      return (chain === settings.chainId);
    }).sort((a, b) => {
      const [, , asymbol] = a.split(':');
      const [, , bsymbol] = b.split(':');
      return asymbol > bsymbol ? 1 : -1;
    });

    accountNames.forEach((accountName) => {
      tokens.forEach((token) => {
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
    return (
      <div style={{ overflowX: 'auto', maxWidth: '75vw' }}>
        <Table celled className="overview" compact size="small" striped unstackable>
          <OverviewTableHeader
            settings={settings}
            stakedResources={stakedResources}
            supportedContracts={supportedContracts}
            tokens={tokens}
            view={view}
          />
          <Table.Body>
            {accountNames.map((accountName) => {
              const addresses = sortBy(
                wallets.filter((wallet) => (wallet.address && wallet.account === accountName)),
                (address) => address.address
              )
              return (
                <Table.Row>
                  <Table.Cell collapsing textAlign="right">
                    <strong>{accountName}</strong>
                    {(addresses.length > 0)
                      ? (
                        <div>
                          {addresses.map((address) => (
                            <div>{address.address}</div>
                          ))}
                        </div>
                      )
                      : false
                    }
                  </Table.Cell>
                  {(view === 'systemtokens')
                    ? (
                      <React.Fragment>
                        <Table.Cell textAlign="right">
                          <Header size="small">
                            <GlobalAccountFragmentSystemTokenBalance
                              account={accountName}
                              chainId={settings.chainId}
                              contract="eosio"
                              token={chainSymbol}
                            />
                          </Header>
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          <Header size="small">
                            <GlobalAccountFragmentTokenBalance
                              account={accountName}
                              chainId={settings.chainId}
                              contract="eosio"
                              token={chainSymbol}
                            />
                          </Header>
                        </Table.Cell>
                        {(supportedContracts && supportedContracts.includes('delphioracle'))
                          ? (
                            <Table.Cell textAlign="right">
                              <Header size="small">
                                <GlobalAccountFragmentSystemTokenValue
                                  account={accountName}
                                  chainId={settings.chainId}
                                  contract="eosio"
                                  token={chainSymbol}
                                />
                              </Header>
                            </Table.Cell>
                          )
                          : false
                        }
                        {(stakedResources)
                          ? (
                            <Table.Cell textAlign="right">
                              <GlobalAccountFragmentTokenStaked
                                account={accountName}
                                chainId={settings.chainId}
                                contract="eosio"
                                token={chainSymbol}
                              />
                            </Table.Cell>
                          )
                          : false
                        }
                        {(supportedContracts && supportedContracts.includes('rex'))
                          ? (
                            <Table.Cell textAlign="right">
                              <GlobalAccountFragmentREXBalance
                                account={accountName}
                                chainId={settings.chainId}
                                contract="eosio"
                                token={chainSymbol}
                              />
                            </Table.Cell>
                          )
                          : false
                        }
                        {(stakedResources)
                          ? (
                            <Table.Cell textAlign="right">
                              <GlobalAccountFragmentTokenDelegated
                                account={accountName}
                                chainId={settings.chainId}
                                contract="eosio"
                                token={chainSymbol}
                              />
                            </Table.Cell>
                          )
                          : false
                        }
                        {(stakedResources)
                          ? (
                            <Table.Cell textAlign="right">
                              <GlobalAccountFragmentTokenRefunding
                                account={accountName}
                                chainId={settings.chainId}
                                contract="eosio"
                                token={chainSymbol}
                              />
                            </Table.Cell>
                          )
                          : false
                        }
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
                        {(isEmpty(accountBalances))
                          ? (
                            <Table.Cell>
                              {t('main_components_overview_no_token_balances')}
                            </Table.Cell>
                          )
                          : accountBalances[accountName]
                        }
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
              )
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default withTranslation('main')(OverviewTable);
