// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';

import { Button, Grid, Header, List, Popup, Segment } from 'semantic-ui-react';

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
      path: 'tools/custom_tokens'
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
    tools_menu_contracts: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/smart_contracts'
    }
  },
  tools_menu_security_header: {
    tools_menu_recommendation: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/recommendations'
    },
    tools_menu_managekeys: {
      modes: ['all'],
      path: 'tools/keys'
    },
    tools_menu_permissions: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/permissions'
    },
    tools_menu_keyvalidator: {
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
      path: 'tools/bid_name'
    },
    tools_menu_proxy: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/proxy'
    }
  },
  tools_menu_hardware_header: {
    tools_menu_ledger: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/ledger'
    }
  },
  tools_menu_third_party_services_header: {
    tools_menu_beos_crosschaintransfer: {
      modes: ['hot', 'ledger', 'watch'],
      path: 'tools/crosschain_transfer'
    }
  },
  tools_menu_network_utilities_header: {
    'API Performance Analysis': {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/api_ping'
    },
    tools_system_log_header: {
      modes: [undefined, false, 'hot', 'ledger', 'watch'],
      path: 'tools/api_traffic_log'
    },
  },
  tools_menu_advanced_header: {
    tools_menu_state_chain: {
      modes: ['all'],
      path: 'tools/chain_state'
    },
    tools_menu_state_globals: {
      modes: ['all'],
      path: 'tools/global_state'
    },
    tools_menu_state: {
      modes: ['all'],
      path: 'tools/wallet_state'
    },
    tools_reset_header_header: {
      modes: ['all'],
      path: 'tools/reset_application'
    },
  }
};

class ToolsHome extends Component<Props> {
  onClick = (e, data) => {
    this.props.actions.changeModule((data && data.name) || e.target.name);
    e.preventDefault();
  };

  onReset = () => {
    const { actions } = this.props;
    actions.clearSettingsCache();
    actions.changeModule('');
  }

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
        <Segment style={{ margin: '0 0 15px' }}>
          <p>
            <Button
              content="V1 Tools Interface"
              name="tools/v1"
              onClick={this.onClick}
              primary
            />
            &nbsp;
            <Button
              content="Reset Wallet"
              onClick={this.onReset}
            />
          </p>
        </Segment>
        <Grid columns={4} stackable>
          {Object.keys(toolSections).map(sectionGroupTitle => (
            <Grid.Column>
              <Segment.Group vertical>
                <Header attached="top">
                  {t(sectionGroupTitle)}
                </Header>
                <Segment attached="bottom" secondary>
                  <List divided relaxed="very">
                    {Object.keys(toolSections[sectionGroupTitle]).map(sectionTitle => {
                        const item = toolSections[sectionGroupTitle][sectionTitle];
                      const isValidItem = (item.modes.includes(settings.walletMode) || item.modes.includes('all'));
                      const reason = (
                        <div>
                          <p>This feature requires a one of the following types of wallets:</p>
                          <List>
                            {item.modes
                              .filter((m) => !!m)
                              .map((type) =>
                                <List.Item content={`${String(type).toUpperCase()} Wallet`} />)}
                          </List>
                          <p>Select a compatible wallet to continue.</p>
                        </div>
                      );
                      return (isValidItem)
                        ? (
                          <List.Item
                            content={t(sectionTitle)}
                            name={item.path}
                            onClick={this.onClick}
                            style={linkStyle}
                          />
                        )
                        : (
                          <Popup
                            content={reason}
                            position="right center"
                            trigger={(
                              <List.Item
                                content={t(sectionTitle)}
                                style={{ color: 'grey' }}
                              />
                            )}
                          />
                        );
                    })}
                  </List>
                </Segment>
              </Segment.Group>
            </Grid.Column>
          ))}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('tools')(ToolsHome)));
