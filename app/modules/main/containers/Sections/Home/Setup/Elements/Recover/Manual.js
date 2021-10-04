// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import AccountSetupRecoveryManualAccountName from './Manual/AccountName';
import AccountSetupRecoveryManualNetwork from './Manual/Network';
import AccountSetupRecoveryManualMnemonicWords from './Manual/MnemonicWords';

const { ipcRenderer } = require('electron');

class AccountSetupRecoverManual extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      // Account to recover (needed for manual entry)
      account: props.account || false,
      // Network (chainId) to recover account on (needed for manual entry)
      network: props.network || false,
      // 28 word phrase
      mnemonic: props.mnemonic || [],
      // Stage of UI
      stage: 'network',
    };
  }
  onChangeNetwork = (network) => {
    this.props.setCertificateDetails(network);
    this.setState({
      network,
      stage: 'account',
    });
  }
  onChangeAccount = (account) => {
    const { network } = this.state;
    this.props.setCertificateDetails(network, account);
    this.setState({
      account,
      stage: 'mnemonic',
    });
  }
  onChangeMnemonic = (mnemonic) => {
    this.setState({ mnemonic }, () => {
      const { network, account } = this.state;
      this.props.setCertificateDetails(network, account, mnemonic);
      ipcRenderer.send('getKeyCertificateCode', network, account, mnemonic);
    });
  }
  render() {
    const {
      account,
      mnemonic,
      network,
      stage,
    } = this.state;
    switch (stage) {
      default:
      case 'network': {
        return (
          <AccountSetupRecoveryManualNetwork
            onBack={this.props.onBack}
            onChangeNetwork={this.onChangeNetwork}
          />
        );
      }
      case 'account': {
        return (
          <AccountSetupRecoveryManualAccountName
            account={account}
            network={network}
            onBack={() => this.setState({ stage: 'network' })}
            onChangeAccount={this.onChangeAccount}
          />
        );
      }
      case 'mnemonic': {
        return (
          <AccountSetupRecoveryManualMnemonicWords
            onBack={() => this.setState({ stage: 'account' })}
            onChangeMnemonic={this.onChangeMnemonic}
            mnemonic={mnemonic}
          />
        );
      }
    }
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
)(AccountSetupRecoverManual);
