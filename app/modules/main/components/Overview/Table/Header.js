// @flow
import React, { Component } from 'react';
import { Header, Icon, Popup, Table } from 'semantic-ui-react';

class OverviewTableHeader extends Component<Props> {
  render() {
    const {
      settings,
      view
    } = this.props;
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>
            <Header
              content="Account(s)"
              subheader="subheader"
            />
          </Table.HeaderCell>
          {(view === 'systemtokens')
            ? (
              <React.Fragment>
                <Table.HeaderCell textAlign="right">
                  Available
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Staked
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Delegated
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Total
                </Table.HeaderCell>
              </React.Fragment>
            )
            : false
          }
          {(view === 'balances')
            ? (
              <React.Fragment>
                {settings.customTokens.map((token) => {
                  const [chain, contract, symbol] = token.split(':');
                  if (chain !== settings.chainId) return false;
                  return (
                    <Table.HeaderCell textAlign="right">
                      <Header
                        content={symbol}
                        subheader={contract}
                      />
                    </Table.HeaderCell>
                  );
                })}
              </React.Fragment>
            )
            : false
          }
          {(view === 'governance')
            ? (
              <React.Fragment>
                <Table.HeaderCell textAlign="right">
                  <Popup
                    content="The strength of each vote, which is the sum of both staked CPU and NET of this account and any other account which has set this account as a proxy."
                    inverted
                    trigger={(
                      <span>
                        <Icon
                          color="grey"
                          inline
                          name="question circle outline"
                        />
                        Vote Weight
                      </span>
                    )}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  <Popup
                    content="The relative strength of the current vote against the strength of a vote cast today. The strength can be increased to 100% simply by casting your vote again."
                    inverted
                    trigger={(
                      <span>
                        <Icon
                          color="grey"
                          inline
                          name="question circle outline"
                        />
                        %
                      </span>
                    )}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Votes
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Popup
                    content="The proxy set by this account. The staked voting weight is transfered from the current account and given to the proxy."
                    inverted
                    trigger={(
                      <span>
                        <Icon
                          color="grey"
                          inline
                          name="question circle outline"
                        />
                        Proxy
                      </span>
                    )}
                  />
                </Table.HeaderCell>
              </React.Fragment>
            )
            : false
          }
          {(view === 'resources')
            ? (
              <React.Fragment>
                <Table.HeaderCell textAlign="right">
                  CPU
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  NET
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  RAM
                </Table.HeaderCell>
              </React.Fragment>
            )
            : false
          }
          <Table.HeaderCell collapsing />
        </Table.Row>
      </Table.Header>
    );
  }
}

export default OverviewTableHeader;
