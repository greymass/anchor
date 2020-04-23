// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Grid, Header, Label, Segment } from 'semantic-ui-react';

import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

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
      settings,
      stakedResources,
      supportedContracts,
      t,
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
            {t('main_sections_overview_system_tokens_header', { chainSymbol })}

            <Header.Subheader>
              {t('main_sections_overview_system_tokens_subheader')}
            </Header.Subheader>
          </Header>
        );
        break;
      }
      case 'balances': {
        header = (
          <Header>
            {t('main_sections_overview_balances_header')}
            <Header.Subheader>
              {t('main_sections_overview_balances_header')}
            </Header.Subheader>
          </Header>
        );
        break;
      }
      case 'governance': {
        header = (
          <Header>
            {t('main_sections_overview_governance_header')}
            <Header.Subheader>
              {t('main_sections_overview_governance_subheader')}
            </Header.Subheader>
          </Header>
        );
        break;
      }
      case 'resources': {
        header = (
          <Header>
            {t('main_sections_overview_resources_header')}
            <Header.Subheader>
              {t('main_sections_overview_resources_subheader')}
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
                content={t('main_sections_overview_grid_header')}
                subheader={t('main_sections_overview_grid_subheader')}
              />
              <OverviewMenu
                stakedResources={stakedResources}
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
                  settings={settings}
                  supportedContracts={supportedContracts}
                  stakedResources={stakedResources}
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
                    content={t('main_sections_overview_container_button')}
                    icon="users"
                    onClick={() => this.props.actions.changeModule('manage/wallets')}
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
    stakedResources: state.connection.stakedResources,
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

export default compose(
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(OverviewContainer);
