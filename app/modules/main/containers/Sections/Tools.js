// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ToolsAirgrabs from './Tools/Airgrabs';
import ToolsApiPing from './Tools/ApiPing';
import ToolsBidName from './Tools/BidName';
import ToolsBlockchains from './Tools/Blockchains';
import ToolsContacts from './Tools/Contacts';
import ToolsCreateAccount from './Tools/CreateAccount';
import ToolsCrosschainTransfer from './Tools/CrosschainTransfer';
import ToolsCustomTokens from './Tools/CustomTokens';
import ToolsDelegations from './Tools/Delegations';
import ToolsHome from './Tools/Home';
import ToolsKeyGenerator from './Tools/KeyGenerator';
import ToolsKeyValidator from './Tools/KeyValidator';
import ToolsLedger from './Tools/Ledger';
import ToolsPermissions from './Tools/Permissions';
import ToolsProxy from './Tools/Proxy';
import ToolsRecommendations from './Tools/Recommendations';
import ToolsSmartContracts from './Tools/SmartContracts';
import ToolsWallets from './Tools/Wallets';

import * as NavigationActions from '../../actions/navigation';

class ToolsContainer extends Component<Props> {
  onClick = (e, data) => {
    const { actions } = this.props;

    actions.changeModule(data.name);
  };
  render() {
    const { navigation } = this.props;
    return (
      <Segment style={{ margin: 0 }} loading={navigation.loading}>
        <Button
          color="purple"
          content="< Back to Tools"
          disabled={navigation.module === 'tools'}
          name="tools"
          onClick={this.onClick}
          style={{ marginBottom: '15px' }}
        />
        <HashRouter>
          <Switch>
            <Route exact path="/tools" component={ToolsHome} />
            <Route path="/tools/airgrabs" component={ToolsAirgrabs} />
            <Route path="/tools/api_ping" component={ToolsApiPing} />
            <Route path="/tools/bid_name" component={ToolsBidName} />
            <Route path="/tools/contacts" component={ToolsContacts} />
            <Route path="/tools/blockchains" component={ToolsBlockchains} />
            <Route path="/tools/create_account" component={ToolsCreateAccount} />
            <Route path="/tools/crosschain_transfer" component={ToolsCrosschainTransfer} />
            <Route path="/tools/custom_tokens" component={ToolsCustomTokens} />
            <Route path="/tools/delegations" component={ToolsDelegations} />
            <Route path="/tools/key_generator" component={ToolsKeyGenerator} />
            <Route path="/tools/key_validator" component={ToolsKeyValidator} />
            <Route path="/tools/ledger" component={ToolsLedger} />
            <Route path="/tools/permissions" component={ToolsPermissions} />
            <Route path="/tools/proxy" component={ToolsProxy} />
            <Route path="/tools/recommendations" component={ToolsRecommendations} />
            <Route path="/tools/smart_contracts" component={ToolsSmartContracts} />
            <Route path="/tools/wallets" component={ToolsWallets} />
          </Switch>
        </HashRouter>
      </Segment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsContainer));
