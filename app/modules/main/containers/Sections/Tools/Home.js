// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Grid, Header, Segment } from 'semantic-ui-react';

import NavigationActions from '../../../actions/navigation';

class ToolsHome extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  render() {
    return (
      <div>
        <Segment>
          <Button
            content="Delegations"
            name="tools/delegations"
            onClick={this.onClick}
          />
        </Segment>
        <Grid columns={4}>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Tokens
              </Header>
              <Segment>
                Airgrabs
              </Segment>
              <Segment>
                Custom Tokens
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Manage
              </Header>
              <Segment>
                Accounts (move to dropdown)
              </Segment>
              <Segment>
                Blockchains (move to dropdown)
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Security
              </Header>
              <Segment>
                Keys
              </Segment>
              <Segment>
                Permissions
              </Segment>
              <Segment>
                Best Practices
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Hardware
              </Header>
              <Segment>
                Ledger
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                3rd Party Services
              </Header>
              <Segment>
                Crosschain Transfer
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Network Utilities
              </Header>
              <Segment>
                API Performance Analysis
              </Segment>
              <Segment>
                API Traffic Log
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Registration
              </Header>
              <Segment>
                Proxy Voter
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Utilities
              </Header>
              <Segment>
                Contacts
              </Segment>
              <Segment>
                Blockchains
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Manage
              </Header>
              <Segment>
                Accounts
              </Segment>
              <Segment>
                Blockchains
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Manage
              </Header>
              <Segment>
                Accounts
              </Segment>
              <Segment>
                Blockchains
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Manage
              </Header>
              <Segment>
                Accounts
              </Segment>
              <Segment>
                Blockchains
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Manage
              </Header>
              <Segment>
                Accounts
              </Segment>
              <Segment>
                Blockchains
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Manage
              </Header>
              <Segment>
                Accounts
              </Segment>
              <Segment>
                Blockchains
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                Manage
              </Header>
              <Segment>
                Accounts
              </Segment>
              <Segment>
                Blockchains
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsHome));
