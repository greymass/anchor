// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Header, Icon, Segment } from 'semantic-ui-react';

class AccountSetupElementsWordsComplete extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Header icon size="large" textAlign="center">
          <Icon color="blue" name="shield" />
          Key certificate security
          <Header.Subheader>
            Keep it secret, keep it safe.
          </Header.Subheader>
        </Header>
        <Segment basic padded size="large">
          <p>Your key certificate with the encryption keywords entered is the master key to your account. With it you can recover your account should Anchor be removed or you lose access to this computer. You can also use it to setup your account in Anchor on other devices, such as your mobile phone!</p>
          <p>Store it in a secure location, don't photograph it or show it to anyone unless you intend for them to take possession of your account.</p>
        </Segment>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {

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
)(AccountSetupElementsWordsComplete);
