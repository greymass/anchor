// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Icon, Modal } from 'semantic-ui-react';

import * as HardwareLedgerActions from '../../../../../../../shared/actions/hardware/ledger';

import AccountSetupElementsLedgerSetup from './Ledger/Setup';
import AccountSetupElementsLedgerOptions from './Ledger/Options';
import AccountSetupElementsLedgerVerify from './Ledger/Verify';

const defaultState = {
  method: false
};

class AccountSetupElementsLedger extends Component<Props> {
  state = defaultState
  onCancel = () => {
    this.setState(defaultState, this.props.onCancel);
  }
  onVerify = () => {
    const { method } = this.state;
    this.setState(defaultState);
    this.props.onComplete({
      method
    });
  }
  reset = this.setState(defaultState)
  render() {
    const {
      method,
    } = this.state;
    const {
      open,
      status,
    } = this.props;
    return (
      <Modal
        centered={false}
        closeOnDimmerClick={false}
        open={open}
        onOpen={this.reset}
        onClose={this.reset}
        size="small"
      >
        <Modal.Header>
          <Icon name="usb" style={{ marginRight: '1em' }} />
          Createn an account that uses your Ledger
        </Modal.Header>
        <Modal.Content>
          {(status !== 'connected')
           ? (
             <AccountSetupElementsLedgerSetup />
           )
           : false
          }
          {(status === 'connected' && !method)
           ? (
             <AccountSetupElementsLedgerOptions
               selectMethod={(m) => this.setState({ method: m })}
             />
           )
           : false
          }
          {(status === 'connected' && method)
           ? (
             <AccountSetupElementsLedgerVerify
               onVerify={this.onVerify}
             />
           )
           : false
          }
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel Ledger Setup"
            icon="remove"
            onClick={this.onCancel}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...HardwareLedgerActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupElementsLedger);
