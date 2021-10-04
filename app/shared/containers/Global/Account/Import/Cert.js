// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Modal } from 'semantic-ui-react';

import AccountSetupRecover from '../../../../../modules/main/containers/Sections/Home/Setup/Recover';
import GlobalModalAccountImportPassword from './Password';

class GlobalModalAccountImportCert extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    };
  }
  onOpen = () => {
    this.setState({ open: true });
  }
  onClose = () => {
    this.setState({ open: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    const {
      settings,
      t,
      trigger,
    } = this.props;
    const { open } = this.state;
    if (open && !settings.walletHash) {
      return <GlobalModalAccountImportPassword onComplete={this.onPasswordSet} />;
    }
    return (
      <Modal
        centered={false}
        closeIcon
        open={open}
        onOpen={this.onOpen}
        onClose={this.onClose}
        trigger={trigger}
      >
        <Modal.Header>
          Recover Account
        </Modal.Header>
        <AccountSetupRecover />
      </Modal>
    );
  }
}


function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

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
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportCert);
