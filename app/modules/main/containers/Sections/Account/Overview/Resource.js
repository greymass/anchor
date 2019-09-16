// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Progress, Segment, Table } from 'semantic-ui-react';

import GlobalAccountFragmentRamPercent from '../../../../../../shared/containers/Global/Account/Fragment/Ram/Percent';
import GlobalAccountFragmentResourcePercent from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Percent';
import GlobalAccountFragmentResourceProgress from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Progress';
import GlobalAccountFragmentResourceStaked from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Staked';
import GlobalAccountFragmentResourceStakedDelegated from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Staked/Delegated';
import GlobalAccountFragmentResourceStakedSelf from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Staked/Self';
import GlobalAccountFragmentResourceUsage from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Usage';
import GlobalAccountFragmentResourceMax from '../../../../../../shared/containers/Global/Account/Fragment/Resource/Max';
import GlobalAccountFragmentStaleness from '../../../../../../shared/containers/Global/Account/Fragment/Staleness';
import GlobalAccountFragmentSystemTokenBalance from '../../../../../../shared/containers/Global/Account/Fragment/SystemTokenBalance';
import GlobalAccountFragmentSystemTokenValue from '../../../../../../shared/containers/Global/Account/Fragment/SystemTokenValue';
import GlobalAccountFragmentTokenBalance from '../../../../../../shared/containers/Global/Account/Fragment/TokenBalance';
import GlobalAccountFragmentTokenDelegated from '../../../../../../shared/containers/Global/Account/Fragment/TokenDelegated';
import GlobalAccountFragmentTokenRefunding from '../../../../../../shared/containers/Global/Account/Fragment/TokenRefunding';
import GlobalAccountFragmentTokenStaked from '../../../../../../shared/containers/Global/Account/Fragment/TokenStaked';
import GlobalAccountFragmentVoterInfoVotes from '../../../../../../shared/containers/Global/Account/Fragment/VoterInfo/Votes';
import GlobalAccountFragmentVoterInfoEffectiveness from '../../../../../../shared/containers/Global/Account/Fragment/VoterInfo/Effectiveness';
import GlobalAccountFragmentVoterInfoWeightValue from '../../../../../../shared/containers/Global/Account/Fragment/VoterInfo/WeightValue';
import GlobalAccountFragmentVoterInfoProxy from '../../../../../../shared/containers/Global/Account/Fragment/VoterInfo/Proxy';

class AccountOverviewResource extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  toggleExpand = (e) => this.setState({
    expanded: !this.state.expanded
  })
  render() {
    const {
      account,
      connection,
      resource,
    } = this.props;
    const {
      expanded,
    } = this.state;
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
                        A <strong>time-based</strong> resource an account uses while <strong>performing</strong> smart contract actions.
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
                        A <strong>size-based</strong> resource an account uses while <strong>sending data</strong> to the blockchain.
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
                      <GlobalAccountFragmentResourcePercent
                        account={account}
                        type={resource}
                      />
                      <Header.Subheader>
                        Available {resource.toUpperCase()}
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
                        <Table.Row>
                          <Table.Cell collapsing>Used</Table.Cell>
                          <Table.Cell>
                            <GlobalAccountFragmentResourceUsage
                              account={account}
                              type={resource}
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell collapsing>Allowed</Table.Cell>
                          <Table.Cell>
                            <GlobalAccountFragmentResourceMax
                              account={account}
                              type={resource}
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
                        <Button
                          color="green"
                          content="Lease"
                          floated="right"
                          icon="exchange"
                          size="tiny"
                        />
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
                      <GlobalAccountFragmentResourceStaked
                        account={account}
                        type={resource}
                      />
                      <Header.Subheader>
                        Allocated to {resource.toUpperCase()}
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
                        <Table.Cell collapsing>Staked (Self)</Table.Cell>
                        <Table.Cell>
                          <GlobalAccountFragmentResourceStakedSelf
                            account={account}
                            chainId={connection.chainId}
                            contract="eosio"
                            token={connection.chainSymbol}
                            type={resource}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell collapsing>Delegated</Table.Cell>
                        <Table.Cell>
                          <GlobalAccountFragmentResourceStakedDelegated
                            account={account}
                            chainId={connection.chainId}
                            contract="eosio"
                            token={connection.chainSymbol}
                            type={resource}
                          />
                          {` ${connection.chainSymbol}`}
                        </Table.Cell>
                      </Table.Row>
                    </Table>
                    <Container
                      fluid
                      style={{
                        marginTop: '1em'
                      }}
                    >
                      <Button
                        color="blue"
                        content="Add"
                        icon="plus circle"
                        size="tiny"
                      />
                      <Button
                        color="red"
                        content="Remove"
                        floated="right"
                        icon="minus circle"
                        size="tiny"
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountOverviewResource));
