// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Header, Segment } from 'semantic-ui-react';

import { changeModule } from '../../../../actions/navigation';

class AccountSetupHome extends Component<Props> {
  render() {
    return (
      <Segment>
        <Header>
          Add account
          <Header.Subheader>
            Create a new or import an existing EOSIO account.
          </Header.Subheader>
        </Header>
        <Button
          content="Create account"
          icon="user"
          onClick={() => this.props.actions.changeModule('home/account/create')}
          primary
        />
        <Button
          content="Recover account"
          icon="qrcode"
          onClick={() => this.props.actions.changeModule('home/account/recover')}
          primary
        />
        <Button
          content="Import existing account"
          icon="key"
          onClick={() => this.props.actions.changeModule('home/account/import')}
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
)(AccountSetupHome);
