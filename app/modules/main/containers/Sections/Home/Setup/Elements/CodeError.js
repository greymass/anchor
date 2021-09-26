// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Header, Segment } from 'semantic-ui-react';

class AccountSetupElementsCodeError extends Component<Props> {
  render() {
    const { error } = this.props.accountcreate;
    return (
      <Segment>
        <Header>
          There was an issue with this request.
        </Header>
        <p>
          {error}
        </p>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountcreate: state.accountcreate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupElementsCodeError);
