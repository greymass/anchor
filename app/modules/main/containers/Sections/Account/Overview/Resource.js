// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import compose from 'lodash/fp/compose';
import { Trans, withTranslation } from 'react-i18next';

import { Button, Container, Grid, Header, Icon, Popup, Progress, Segment, Table } from 'semantic-ui-react';

import GlobalAccountFragmentResourceProgress from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Progress';
import GlobalAccountFragmentResourceStakedSelf from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Staked/Self';
import GlobalAccountFragmentResourceUnits from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Units';
import GlobalAccountFragmentResourceUsage from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Usage';
import GlobalAccountFragmentResourceMax from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Max';
import GlobalAccountFragmentTokenRefunding from '../../../../../../shared/containers/Global/Account/Fragment/TokenRefunding';
import GlobalAccountFragmentTokenRefundingClaim from '../../../../../../shared/containers/Global/Account/Fragment/TokenRefundingClaim';

import GlobalButtonRent from '../../../../../../shared/containers/Global/Button/Rent';
import GlobalButtonPowerUp from '../../../../../../shared/containers/Global/Button/PowerUp';
import GlobalButtonStake from '../../../../../../shared/containers/Global/Button/Stake';
import GlobalButtonUnstake from '../../../../../../shared/containers/Global/Button/Unstake';

class AccountOverviewResource extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  toggleExpand = () => this.setState({
    expanded: !this.state.expanded
  })
  render() {
    const {
      account,
      connection,
      pstate,
      resource,
      sample,
      rstate,
      settings,
      t,
    } = this.props;
    const {
      expanded,
    } = this.state;
    const enablePowerup = (connection.supportedContracts && connection.supportedContracts.includes('powerup'));
    let enableRex = (connection.supportedContracts && connection.supportedContracts.includes('rex'));
    if (connection.chainId === 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' && !settings.advancedOptions) {
      enableRex = false;
    }
    return (
      <Segment>
        <Grid divided fluid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header size="large" textAlign="center">
                {(resource === 'cpu')
                  ? (
                    <Header.Content>
                      CPU
                      <Header.Subheader
                        style={{
                          marginTop: '0.35em',
                        }}
                      >
                        <Trans i18nKey="main_sections_overview_resource_grid_subheader_one" t={t}>
                          A <strong>time-based</strong> resource an account uses while <strong>performing</strong> smart contract actions.
                        </Trans>
                      </Header.Subheader>
                    </Header.Content>
                  )
                  : false
                }
                {(resource === 'net')
                  ? (
                    <Header.Content>
                      NET
                      <Header.Subheader
                        style={{
                          marginTop: '0.35em',
                        }}
                      >
                        <Trans i18nKey="main_sections_overview_resource_grid_subheader_two" t={t}>
                          A <strong>size-based</strong> resource an account uses while <strong>sending data</strong> to the blockchain.
                        </Trans>
                      </Header.Subheader>
                    </Header.Content>
                  )
                  : false
                }
              </Header>
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={7}>
                    <Header textAlign="center">
                      <GlobalAccountFragmentResourceUnits
                        account={account}
                        type={resource}
                      />
                      <Header.Subheader>
                        {(settings.displayResourcesAvailable)
                          ? t(
                            'main_sections_overview_resource_grid_subheader_three_available',
                            { resource: resource.toUpperCase() }
                          ) : t(
                            'main_sections_overview_resource_grid_subheader_three_used',
                            { resource: resource.toUpperCase() }
                          )
                        }
                      </Header.Subheader>
                    </Header>
                    <Segment basic style={{ padding: 0 }}>
                      <GlobalAccountFragmentResourceProgress
                        account={account}
                        size="tiny"
                        style={{ marginBottom: 0 }}
                        type={resource}
                      />
                      <Table
                        definition
                        size="small"
                        style={{
                          display: (expanded ? 'table' : 'none'),
                          marginBottom: 0,
                        }}
                        unstackable
                      >
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell collapsing>{t('main_sections_overview_resource_used')}</Table.Cell>
                            <Table.Cell>
                              <GlobalAccountFragmentResourceUsage
                                account={account}
                                type={resource}
                              />
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell collapsing>{t('main_sections_overview_resource_allowed')}</Table.Cell>
                            <Table.Cell>
                              <GlobalAccountFragmentResourceMax
                                account={account}
                                type={resource}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <Container
                        fluid
                        style={{
                          marginTop: '1em',
                          textAlign: 'center'
                        }}
                      >
                        {(enablePowerup)
                          ? (
                            <GlobalButtonPowerUp
                              button={{
                                color: 'green',
                                content: t('main_sections_overview_resource_button_rent_powerup'),
                                size: 'tiny',
                                style: { padding: '0.78571429em' },
                              }}
                              sample={sample}
                              pstate={pstate}
                              resource={resource}
                            />
                          )
                          : false
                        }
                        {(enableRex && (expanded || !enablePowerup))
                          ? (
                            <GlobalButtonRent
                              button={{
                                color: 'green',
                                content: t('main_sections_overview_resource_button_rent_rex'),
                                size: 'tiny',
                                style: { margin: '0.78571429em', padding: '0.78571429em' },
                              }}
                              sample={sample}
                              resource={resource}
                              rstate={rstate}
                            />
                          )
                          : false
                        }
                      </Container>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column
                    textAlign="center"
                    verticalAlign="top"
                    width={2}
                  >
                    <Button
                      basic
                      icon={`angle double ${(expanded ? 'up' : 'down')}`}
                      name={resource}
                      onClick={this.toggleExpand}
                      size="small"
                      style={{
                        marginTop: '5.25em'
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Header textAlign="center">
                      <GlobalAccountFragmentResourceStakedSelf
                        account={account}
                        type={resource}
                      />
                      <Header.Subheader>
                        {t(
                          'main_sections_overview_resource_grid_subheader_four',
                          { resource: resource.toUpperCase() }
                        )}
                      </Header.Subheader>
                    </Header>
                    <Progress
                      percent={100}
                      size="tiny"
                      style={{ marginBottom: 0 }}
                    />
                    <Table
                      definition
                      size="small"
                      style={{
                        display: (expanded ? 'table' : 'none'),
                        marginBottom: 0,
                      }}
                      unstackable
                    >
                      <Table.Row>
                        <Table.Cell collapsing textAlign="right">
                          <Popup
                            content={t('main_sections_overview_resource_table_popup_three_content')}
                            inverted
                            position="center left"
                            trigger={(
                              <span>
                                {t('main_sections_overview_resource_table_popup_three_trigger')}
                                <Icon color="grey" name="circle help" style={{ margin: '0 0 0 0.5em' }} />
                              </span>
                            )}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <GlobalAccountFragmentTokenRefunding
                            account={account}
                            chainId={connection.chainId}
                            contract="eosio"
                            token={connection.chainSymbol}
                            resource={resource}
                          />
                          {` ${connection.chainSymbol}`}
                          <GlobalAccountFragmentTokenRefundingClaim
                            account={account}
                            chainId={connection.chainId}
                            contract="eosio"
                            token={connection.chainSymbol}
                            resource={resource}
                          />
                        </Table.Cell>
                      </Table.Row>
                    </Table>
                    <Container
                      fluid
                      style={{
                        marginTop: '1em'
                      }}
                    >
                      <GlobalButtonStake
                        button={{
                          color: 'blue',
                          content: t('main_sections_overview_resource_button_add'),
                          floated: 'left',
                          icon: 'plus circle',
                          size: 'tiny'
                        }}
                        resource={resource}
                      />
                      <GlobalButtonUnstake
                        button={{
                          color: 'red',
                          content: t('main_sections_overview_resource_button_remove'),
                          floated: 'right',
                          icon: 'minus circle',
                          size: 'tiny'
                        }}
                        resource={resource}
                      />
                    </Container>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withTranslation('main'),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AccountOverviewResource);
