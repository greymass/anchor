// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';

import OverviewBlockchainContainer from './Overview/Blockchain';
import OverviewSidebarContainer from './Overview/Sidebar';

import OverviewMenu from '../../components/Overview/Menu';
import OverviewTable from '../../components/Overview/Table';

class OverviewContainer extends Component<Props> {
  state = {
    view: 'systemtokens'
  }
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) => prevProps[key] !== val && console.log(`OverviewContainer '${key}' changed`));
    Object.entries(this.state).forEach(([key, val]) => prevState[key] !== val && console.log(`OverviewContainer '${key}' changed`));
  }
  viewChange = (e, data) => this.setState({ view: data.name })
  render() {
    const {
      settings,
      wallets,
    } = this.props;
    const {
      view
    } = this.state;
    if (!settings.walletInit) {
      return false;
    }
    return (
      <React.Fragment>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment color="green" piled>
                <OverviewMenu
                  view={view}
                  viewChange={this.viewChange}
                />
                <OverviewTable
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
