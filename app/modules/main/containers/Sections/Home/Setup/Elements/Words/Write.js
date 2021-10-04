// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Header, Segment } from 'semantic-ui-react';

import AccountSetupElementsWordsList from './List';

class AccountSetupElementsWordsWrite extends Component<Props> {
  render() {
    const { words } = this.props;
    return (
      <React.Fragment>
        <Header size="large">
          Write encryption key
          <Header.Subheader />
        </Header>
        <p>Write down these six words <strong>on the certificate</strong> you just printed out and <strong>keep it safe</strong>.</p>
        <Segment secondary>
          <AccountSetupElementsWordsList words={words} />
        </Segment>
        <p>You will need both the encryption key (these six words) and the backup sheet in order to recover your account.</p>
        <p><em>Tip: Use a ballpoint pen or a permanant marker.</em></p>
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
)(AccountSetupElementsWordsWrite);
