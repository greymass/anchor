// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';

import OverviewSidebarContainer from './Overview/Sidebar';

import OverviewMenu from '../../components/Overview/Menu';
import OverviewTable from '../../components/Overview/Table';

class OverviewContainer extends Component<Props> {
  state = {
    view: 'systemtokens'
  }
  componentDidUpdate(prevProps, prevState) {
    // Object.entries(this.props).forEach(([key, val]) => prevProps[key] !== val && console.log(`OverviewContainer '${key}' changed`));
    // Object.entries(this.state).forEach(([key, val]) => prevState[key] !== val && console.log(`OverviewContainer '${key}' changed`));
  }
  viewChange = (e, data) => this.setState({ view: data.name })
  render() {
    const {
      chainSymbol,
      settings,
      wallets,
    } = this.props;
    const {
      view
    } = this.state;
    if (!settings.walletInit) {
      return false;
    }
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
      <React.Fragment>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={12}>
              <OverviewMenu
                view={view}
                viewChange={this.viewChange}
              />
              <Segment color="green" piled style={{ marginTop: 0 }}>
                {header}

                <OverviewTable
                  chainSymbol={chainSymbol}
                  settings={settings}
                  view={view}
                  wallets={wallets}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <OverviewSidebarContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    chainSymbol: state.connection.chainSymbol,
    navigation: state.navigation,
    settings: state.settings,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewContainer));
