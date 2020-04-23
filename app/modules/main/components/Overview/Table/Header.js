// @flow
import React, { Component } from 'react';
import { Header, Icon, Popup, Table } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

class OverviewTableHeader extends Component<Props> {
  render() {
    const {
      stakedResources,
      supportedContracts,
      t,
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
                  {t('main_components_overview_table_total')}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  {t('main_components_overview_table_available')}
                </Table.HeaderCell>
                {(supportedContracts && supportedContracts.includes('delphioracle'))
                  ? (
                    <Table.HeaderCell textAlign="right">
                      $/USD
                    </Table.HeaderCell>
                  )
                  : false
                }
                {(stakedResources)
                  ? (
                    <Table.HeaderCell textAlign="right">
                      {t('main_components_overview_table_staked')}
                    </Table.HeaderCell>
                  )
                  : false
                }
                {(supportedContracts && supportedContracts.includes('rex'))
                  ? (
                    <Table.HeaderCell textAlign="right">
                      REX
                    </Table.HeaderCell>
                  )
                  : false
                }
                {(stakedResources)
                  ? (
                    <Table.HeaderCell textAlign="right">
                      {t('main_components_overview_table_delegated')}
                    </Table.HeaderCell>
                  )
                  : false
                }
                {(stakedResources)
                  ? (
                    <Table.HeaderCell textAlign="right">
                      {t('main_components_overview_table_refunding')}
                    </Table.HeaderCell>
                  )
                  : false
                }
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
                    content={t('main_components_overview_popup_one_content')}

                    inverted
                    trigger={(
                      <span>
                        <Icon
                          color="grey"
                          inline
                          name="question circle outline"
                        />
                        {t('main_components_overview_popup_one_trigger')}
                      </span>
                    )}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  <Popup
                    content={t('main_components_overview_popup_two_content')}
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
                  {t('main_components_overview_table_votes')}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Popup
                    content={t('main_components_overview_popup_three_content')}
                    inverted
                    trigger={(
                      <span>
                        <Icon
                          color="grey"
                          inline
                          name="question circle outline"
                        />
                        {t('main_components_overview_popup_three_trigger')}
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

export default withTranslation('main')(OverviewTableHeader);
