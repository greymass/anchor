// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import AccountOverview from './Account/Overview';
import { withTranslation } from "react-i18next";

class AccountContainer extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route path="/account/:account_name" component={AccountOverview} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps() {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountContainer);
