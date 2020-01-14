// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Grid, Header, Label, Segment } from 'semantic-ui-react';

import OverviewSidebarContainer from './Overview/Sidebar';

import NavigationActions from '../../actions/navigation';
import OverviewMenu from '../../components/Overview/Menu';
import OverviewTable from '../../components/Overview/Table';

class OverviewContainer extends Component<Props> {
  state = {
    view: 'systemtokens'
  }
  viewChange = (e, data) => this.setState({ view: data.name })
  render() {
    const {
      chainSymbol,
      pricefeed,
      supportedContracts,
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
              <Header
                content="Account(s) Overview"
                subheader="Overview of accounts for this blockchain."
              />
              <OverviewMenu
                view={view}
                viewChange={this.viewChange}
              />
              <Segment color="green" style={{ marginTop: 0 }}>
                <Grid style={{ marginBottom: 0 }}>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      {header}
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={6}>
                      {(['systemtokens'].includes(view) && (supportedContracts && supportedContracts.includes('delphioracle')))
                        ? (
                          <Label
                            color="green"
                            content={(
                              <span style={{
                                display: 'block',
                                textAlign: 'center',
                              }}>
                                ${(pricefeed.eosusd / 10000).toFixed(2)}
                                {' '}
                                <span style={{
                                  display: 'block',
                                  marginTop: '0.25em',
                                  fontSize: '0.70em',
                                }}>
                                  USD/EOS
                                </span>

                              </span>
                            )}
                          />

                        )
                        : false
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <OverviewTable
                  chainSymbol={chainSymbol}
                  pricefeed={pricefeed}
                  supportedContracts={supportedContracts}
                  settings={settings}
                  view={view}
                  wallets={wallets}
                />
                <Container
                  fluid
                  style={{ marginTop: '1em' }}
                  textAlign="center"
                >
                  <Button
                    basic
                    content="Manage Wallets"
                    icon="users"
                    onClick={() => this.props.actions.changeModule('tools/wallets')}

                  />
                </Container>
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
    pricefeed: state.globals.pricefeed,
    navigation: state.navigation,
    settings: state.settings,
    supportedContracts: state.connection.supportedContracts,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewContainer);
