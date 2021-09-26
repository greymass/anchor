// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Header, Segment } from 'semantic-ui-react';

import { changeModule } from '../../../../actions/navigation';

class AccountSetupCreate extends Component<Props> {
  render() {
    return (
      <Segment>
        <Header>
          Create account
          <Header.Subheader>
            Instructions
          </Header.Subheader>
        </Header>
        <Button
          content="Back to Add Account"
          icon="caret left"
          onClick={() => this.props.actions.changeModule('home/account/setup')}
          primary
        />
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupCreate);
