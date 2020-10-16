// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Breadcrumb, Icon, Segment } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import ToolsAccounts from './Tools/Accounts';
import ToolsAirgrabs from './Tools/Airgrabs';
import ToolsApiPing from './Tools/ApiPing';
import ToolsApiTrafficLog from './Tools/ApiTrafficLog';
import ToolsBidName from './Tools/BidName';
import ToolsChainState from './Tools/ChainState';
import ToolsContacts from './Tools/Contacts';
import ToolsCreateAccount from './Tools/CreateAccount';
import ToolsCrosschainTransfer from './Tools/CrosschainTransfer';
import ToolsCustomTokens from './Tools/CustomTokens';
import ToolsDfuse from './Tools/Dfuse';
import ToolsDisplay from './Tools/Display';
import ToolsDelegations from './Tools/Delegations';
import ToolsGlobalState from './Tools/GlobalState';
import ToolsHome from './Tools/Home';
import ToolsKeys from './Tools/Keys';
import ToolsKeyGenerator from './Tools/KeyGenerator';
import ToolsKeyValidator from './Tools/KeyValidator';
import ToolsLedger from './Tools/Ledger';
import ToolsLinkService from './Tools/LinkService';
import ToolsPermissions from './Tools/Permissions';
import ToolsProxy from './Tools/Proxy';
import ToolsRecommendations from './Tools/Recommendations';
import ToolsResetApplication from './Tools/ResetApplication';
import ToolsSessions from './Tools/Sessions';
import ToolsSmartContracts from './Tools/SmartContracts';
import ToolsWalletState from './Tools/WalletState';

import Tools from '../../../../shared/containers/Tools';

import * as NavigationActions from '../../actions/navigation';

class ToolsContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  render() {
    const { navigation, t } = this.props;
    let crumb;
    if (navigation && navigation.module && navigation.module !== 'tools') {
      [, crumb] = navigation.module.split('/');
    }
    return (
      <React.Fragment>
        <Segment basic style={{ marginBottom: '0.25em', paddingTop: 0 }}>
          <Breadcrumb>
            <Breadcrumb.Section
              link
              name="tools"
              onClick={this.onClick}
            >
              <Icon name="home" />
              {t('menu:tools')}
            </Breadcrumb.Section>
            {(crumb)
              ? (
                <React.Fragment>
                  <Breadcrumb.Divider />
                  <Breadcrumb.Section>{t(`tools_menu_${crumb}`)}</Breadcrumb.Section>
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <Breadcrumb.Divider />
                  <Breadcrumb.Section>{t(`tools_menu_index`)}</Breadcrumb.Section>
                </React.Fragment>
              )
            }
          </Breadcrumb>
        </Segment>
        <HashRouter>
          <Switch>
            <Route exact path="/tools" component={ToolsHome} />
            <Route path="/tools/accounts" component={ToolsAccounts} />
            <Route path="/tools/airgrabs" component={ToolsAirgrabs} />
            <Route path="/tools/api_ping" component={ToolsApiPing} />
            <Route path="/tools/api_traffic_log" component={ToolsApiTrafficLog} />
            <Route path="/tools/contacts" component={ToolsContacts} />
            <Route path="/tools/create_account" component={ToolsCreateAccount} />
            <Route path="/tools/beos_crosschaintransfer" component={ToolsCrosschainTransfer} />
            <Route path="/tools/customtokens" component={ToolsCustomTokens} />
            <Route path="/tools/dfuse_connection" component={ToolsDfuse} />
            <Route path="/tools/display" component={ToolsDisplay} />
            <Route path="/tools/delegations" component={ToolsDelegations} />
            <Route path="/tools/keys" component={ToolsKeys} />
            <Route path="/tools/key_generator" component={ToolsKeyGenerator} />
            <Route path="/tools/key_validator" component={ToolsKeyValidator} />
            <Route path="/tools/ledger" component={ToolsLedger} />
            <Route path="/tools/link_service" component={ToolsLinkService} />
            <Route path="/tools/name_bidding" component={ToolsBidName} />
            <Route path="/tools/permissions" component={ToolsPermissions} />
            <Route path="/tools/proxy" component={ToolsProxy} />
            <Route path="/tools/recommendations" component={ToolsRecommendations} />
            <Route path="/tools/reset" component={ToolsResetApplication} />
            <Route path="/tools/sessions" component={ToolsSessions} />
            <Route path="/tools/smart_contracts" component={ToolsSmartContracts} />
            <Route path="/tools/state_chain" component={ToolsChainState} />
            <Route path="/tools/state_globals" component={ToolsGlobalState} />
            <Route path="/tools/state_wallet" component={ToolsWalletState} />
            <Route path="/tools/v1" component={Tools} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation(['tools', 'menu']),
  connect(mapStateToProps, mapDispatchToProps)
)(ToolsContainer);
