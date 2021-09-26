// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Form, Header, Input, Message } from 'semantic-ui-react';

import * as HardwareLedgerActions from '../../../../../../../../shared/actions/hardware/ledger';

class AccountSetupElementsLedgerVerify extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      displaying: (props.ledger.publicKey),
      loading: false,
      publicKey: (props.ledger.publicKey) ? props.ledger.publicKey.wif : false,
    };
  }
  componentDidMount() {
    const { actions } = this.props;
    const { publicKey } = this.state;
    if (!publicKey) {
      actions.ledgerGetPublicKey(0);
    }
    if (publicKey) {
      actions.ledgerGetPublicKey(0, true);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      displaying, loading, publicKey
    } = this.state;
    const { actions, ledger, system } = this.props;
    // If the public key wasn't loaded, attempt to load it
    if (!ledger.publicKey && !nextProps.ledger.publicKey && !loading && !displaying) {
      this.setState({ loading: true });
      actions.ledgerGetPublicKey(0);
    }
    // If the public key was just received, now display it on the device for verification
    if (!publicKey && nextProps.ledger.publicKey && !displaying) {
      this.setState({
        displaying: true,
        loading: false,
        publicKey: nextProps.ledger.publicKey.wif,
      });
      actions.ledgerGetPublicKey(0, true);
    }
    if (
      system.LEDGER_DISPLAY_PUBLIC_KEY === 'PENDING'
      && nextProps.system.LEDGER_DISPLAY_PUBLIC_KEY === 'SUCCESS'
    ) {
      this.props.onVerify();
    }
    if (
      system.LEDGER_DISPLAY_PUBLIC_KEY === 'PENDING'
      && nextProps.system.LEDGER_DISPLAY_PUBLIC_KEY === 'FAILURE'
    ) {
      console.log('user has rejected matching keys');
    }
  }
  retry = () => {
    const { actions } = this.props;
    actions.ledgerGetPublicKey(0, true);
  }
  render() {
    const { publicKey } = this.state;
    if (!publicKey) {
      return (
        <Header>
          Dismiss any existing requests on your Ledger device.
          <Header.Subheader>
            Communication with your Ledger cannot proceed until the app is waiting on the EOS App screen.
          </Header.Subheader>
        </Header>
      );
    }
    return (
      <React.Fragment>

        <Message
          icon="eye"
          header="Look at your Ledger device screen"
          content="Check to ensure the key listed below matches the key reported by your Ledger device. If the keys do match, approve the request on your device to proceed."
        />

        <Form>
          <Form.Field>
            <Input fluid value={publicKey} />
          </Form.Field>

          <p><em>Tip: A quick way to compare keys like this is to make sure the characters at the beginning and the end are the same.</em></p>

          <Form.Field>
            <Button
              content="Retry"
              fluid
              icon="refresh"
              onClick={this.retry}
            />
          </Form.Field>
        </Form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    system: state.system,
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
)(AccountSetupElementsLedgerVerify);
