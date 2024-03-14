// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { Button, Grid, Header, List, Popup, Segment } from 'semantic-ui-react';

import GlobalButtonResetContainer from '../../../../../shared/containers/Global/Button/Reset';

import NavigationActions from '../../../actions/navigation';
import SettingsActions from '../../../../../shared/actions/settings';

const toolSections = {
  tools_menu_token_header: {
    tools_menu_airgrabs: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/airgrabs'
    },
    tools_menu_customtokens: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/customtokens'
    },
    tools_menu_delegations: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/delegations'
    }
  },
  tools_menu_utilities_header: {
    tools_menu_contacts: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/contacts'
    },
    tools_menu_sessions: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/sessions'
    },
    tools_menu_smart_contracts: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/smart_contracts'
    }
  },
  tools_menu_security_header: {
    // tools_menu_recommendations: {
    //   modes: ['hot', 'ledger', 'watch'],
    //   path: 'tools/recommendations'
    // },
    tools_menu_managekeys: {
      modes: ['all'],
      path: 'tools/keys'
    },
    tools_menu_permissions: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/permissions'
    },
    tools_menu_key_converter: {
      modes: ['all'],
      path: 'tools/key_converter'
    },
    tools_menu_key_validator: {
      modes: ['all'],
      path: 'tools/key_validator'
    }
  },
  tools_menu_registration_header: {
    tools_menu_create_account: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/create_account'
    },
    tools_menu_name_bidding: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/name_bidding'
    },
    tools_menu_proxy: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/proxy'
    }
  },
  tools_menu_hardware_header: {
    tools_menu_ledger: {
      modes: ['all'],
      path: 'tools/ledger'
    }
  },
  tools_menu_third_party_services_header: {
    tools_menu_dfuse_connection: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/dfuse_connection'
    },
    tools_menu_beos_crosschaintransfer: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/beos_crosschaintransfer'
    }
  },
  tools_menu_network_utilities_header: {
    tools_menu_abi_cache: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/abi_cache'
    },
    tools_menu_performance_header: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/api_ping'
    },
    tools_menu_linkservice_header: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/link_service'
    },
    // tools_system_log_header: {
    //   modes: [undefined, false, 'hot', 'ledger', 'watch'],
    //   path: 'tools/api_traffic_log'
    // },
  },
  tools_menu_advanced_header: {
    tools_menu_display: {
      modes: ['all'],
      path: 'tools/display'
    },
    tools_menu_state_chain: {
      modes: ['all'],
      path: 'tools/state_chain'
    },
    tools_menu_state_globals: {
      modes: ['all'],
      path: 'tools/state_globals'
    },
    tools_menu_state_wallet: {
      modes: ['all'],
      path: 'tools/state_wallet'
    },
  }
};

class ToolsHome extends Component<Props> {
  onClick = (e, data) => {
    this.props.actions.changeModule((data && data.name) || e.target.name);
    e.preventDefault();
  };
  render() {
    const {
      settings,
      t,
    } = this.props;
    const linkStyle = {
      color: 'black',
      cursor: 'pointer',
    };
    return (
      <React.Fragment>
        <Segment clearing style={{ margin: '0 0 15px' }}>
          <p>
            {(settings.advancedOptions)
              ? (
                <Button
                  content={t('tools_menu_home_button')}
                  icon="external"
                  name="tools/v1"
                  onClick={this.onClick}
                  primary
                />
              )
              : false
            }
            &nbsp;
            <GlobalButtonResetContainer />
          </p>
        </Segment>
        <Grid columns={4} stackable>
          {Object.keys(toolSections).map(sectionGroupTitle => {
            const validItems = Object.keys(toolSections[sectionGroupTitle]).filter(sectionTitle => {
              const item = toolSections[sectionGroupTitle][sectionTitle];
              return (
                (item.modes.includes(settings.walletMode) && settings.account)
                || item.modes.includes('all')
              );
            });
            if (validItems.length === 0) return false;
            return (
              <Grid.Column>
                <Segment.Group vertical>
                  <Header attached="top">
                    {t(sectionGroupTitle)}
                  </Header>
                  <Segment attached="bottom" secondary>
                    <List divided relaxed="very">
                      {Object.keys(toolSections[sectionGroupTitle]).map(sectionTitle => {
                        const item = toolSections[sectionGroupTitle][sectionTitle];
                        const isValidItem = (
                          (item.modes.includes(settings.walletMode) && settings.account)
                          || item.modes.includes('all')
                        );
                        if (!isValidItem) {
                          return false;
                        }
                        return (
                          <List.Item
                            content={t(sectionTitle)}
                            name={item.path}
                            onClick={this.onClick}
                            style={linkStyle}
                          />
                        );
                      })}
                    </List>
                  </Segment>
                </Segment.Group>
              </Grid.Column>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    wallets: state.wallets.length,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...SettingsActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation('tools')(ToolsHome)));
