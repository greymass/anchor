// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Header, Segment, Tab } from 'semantic-ui-react';

import makeGetKeysUnlocked from '../../../../../selectors/getKeysUnlocked';

class GlobalModalAccountImportRequestCode extends Component<Props> {
  render() {
    const {
      pubkeys,
      t,
    } = this.props;
    return (
      <Tab.Pane>
        <Segment basic>
          <p>Button at the top right to create a new request.</p>
          <p>Display a table of pending requests.</p>
          <p>Form to create a new request:</p>
          <p>1) Search for an available account name.</p>
          <p>2) Select a public key from storage to use for active.</p>
          <p>3) Select a public key from storage to use for owner.</p>
          <p>4) Click Generate Request, which saves the request into an array within settings. The name, active, owner public keys are within this object, along with the creation date, and the request code itself.</p>
          <p>5) Request Code should be displayed</p>
        </Segment>
      </Tab.Pane>
    );
  }
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default compose(
  withTranslation('global', {
    withRef: true
  }),
  connect(makeMapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportRequestCode);
