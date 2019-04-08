// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Grid, Header, Segment } from 'semantic-ui-react';

import NavigationActions from '../../../actions/navigation';
import SettingsActions from '../../../../../shared/actions/settings';

const toolSections = {
  Tokens: {
    Airgrabs: {
      path: 'tools/airgrabs'
    },
    'Custom Tokens': {
      path: 'tools/custom_tokens'
    },
    Delegations: {
      path: 'tools/delegations'
    }
  },
  Security: {
    'Best Practices': {
      path: 'tools/recommendations'
    },
    'Generate Keys': {
      path: 'tools/key_generator'
    },
    Permissions: {
      path: 'tools/permissions'
    },
    'Validate Keys': {
      path: 'tools/key_validator'
    }
  },
  Hardware: {
    Ledger: {
      path: 'tools/ledger'
    }
  },
  '3rd Party Services': {
    'Crosschain Transfers': {
      path: 'tools/crosschain_transfer'
    }
  },
  'Network Utilities': {
    'API Performance Analysis': {
      path: 'tools/api_ping'
    }
  },
  Registration: {
    'Create Account': {
      path: 'tools/create_account'
    },
    Proxy: {
      path: 'tools/proxy'
    }
  },
  Utilities: {
    'Bid Name': {
      path: 'tools/bid_name'
    },
    Contacts: {
      path: 'tools/contacts'
    },
    'Smart Contracts': {
      path: 'tools/smart_contracts'
    }
  }
};

class ToolsHome extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  onReset = () => this.props.actions.clearSettingsCache()

  render() {
    const linkStyle = { cursor: 'pointer' }

    return (
      <Grid columns={4}>
        {Object.keys(toolSections).map(sectionGroupTitle => (
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                {sectionGroupTitle}
              </Header>
              {Object.keys(toolSections[sectionGroupTitle]).map(sectionTitle => (
                <Segment>
                  <a
                    name={toolSections[sectionGroupTitle][sectionTitle].path}
                    onClick={this.onClick}
                    style={linkStyle}
                  >
                    {sectionTitle}
                  </a>
                </Segment>
              ))}
            </Segment.Group>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...SettingsActions,
    }, dispatch)
  };
}

export default withRouter(connect(() => {}, mapDispatchToProps)(ToolsHome));
