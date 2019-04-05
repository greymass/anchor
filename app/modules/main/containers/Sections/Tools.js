// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as NavigationActions from '../../actions/navigation';

import ToolsHome from './Tools/Home';
import ToolsDelegations from './Tools/Delegations';
import ToolsAirgrabs from './Tools/Airgrabs';
import ToolsKeyGenerator from './Tools/KeyGenerator';
import ToolsKeyValidator from './Tools/KeyValidator';
import ToolsCustomTokens from './Tools/CustomTokens';
import ToolsPermissions from './Tools/Permissions';
import ToolsRecommendations from './Tools/Recommendations';
import ToolsSmartContracts from './Tools/SmartContracts';
import ToolsLedger from './Tools/Ledger';
import ToolsCrosschainTransfer from './Tools/CrosschainTransfer';
import ToolsBlockchains from './Tools/Blockchains';
import ToolsWallets from './Tools/Wallets';
import ToolsApiPing from './Tools/ApiPing';
import ToolsCreateAccount from './Tools/CreateAccount';
import ToolsBidName from './Tools/BidName';
import ToolsProxy from './Tools/Proxy';

class ToolsContainer extends Component<Props> {
  onClick = (e, data) => {
    this.props.actions.changeModule(data.name);
  };
  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
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
            <Route path="/tools/v1" component={Tools} />
            <Route path="/tools/delegations" component={ToolsDelegations} />
            <Route path="/tools/airgrabs" component={ToolsAirgrabs} />
            <Route path="/tools/key_generator" component={ToolsKeyGenerator} />
            <Route path="/tools/key_validator" component={ToolsKeyValidator} />
            <Route path="/tools/custom_tokens" component={ToolsCustomTokens} />
            <Route path="/tools/permissions" component={ToolsPermissions} />
            <Route path="/tools/recommendations" component={ToolsRecommendations} />
            <Route path="/tools/smart-contracts" component={ToolsSmartContracts} />
            <Route path="/tools/ledger" component={ToolsLedger} />
            <Route path="/tools/crosschain_transfer" component={ToolsCrosschainTransfer} />
            <Route path="/tools/blockchains" component={ToolsBlockchains} />
            <Route path="/tools/wallets" component={ToolsWallets} />
            <Route path="/tools/api_ping" component={ToolsApiPing} />
            <Route path="/tools/create_account" component={ToolsCreateAccount} />
            <Route path="/tools/bid_name" component={ToolsBidName} />
            <Route path="/tools/proxy" component={ToolsProxy} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsContainer));
