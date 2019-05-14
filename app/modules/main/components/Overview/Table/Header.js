// @flow
import React, { Component } from 'react';
import { Header, Icon, Popup, Table } from 'semantic-ui-react';

class OverviewTableHeader extends Component<Props> {
  render() {
    const {
      settings,
      supportedContracts,
      tokens,
      view
    } = this.props;
    const balanceHeaders = tokens.map((token) => {
      const [, contract, symbol] = token.split(':');
      return (
        <Table.HeaderCell textAlign="right">
          <Header
            content={symbol}
            size="tiny"
            subheader={contract}
          />
        </Table.HeaderCell>
      );
    });
    return (
      <Table.Header style={{ width: '100%' }}>
        <Table.Row>
          <Table.HeaderCell collapsing textAlign="right">
            <Header
              content="Accounts"
              subheader="Overview"
              size="tiny"
            />
          </Table.HeaderCell>
          {(view === 'systemtokens')
            ? (
              <React.Fragment>
                <Table.HeaderCell textAlign="right">
                  Total
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Available
                </Table.HeaderCell>
                {(supportedContracts.includes('delphioracle'))
                  ? (
                    <Table.HeaderCell textAlign="right">
                      $/USD
                    </Table.HeaderCell>
                  )
                  : false
                }
                <Table.HeaderCell textAlign="right">
                  Staked
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Delegated
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  Refunding
                </Table.HeaderCell>
              </React.Fragment>
            )
            : false
          }
          {(view === 'balances')
            ? (
              <React.Fragment>
                {(balanceHeaders.length > 0)
                  ? balanceHeaders
                  : (
                    <Table.HeaderCell />
                  )
                }
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
