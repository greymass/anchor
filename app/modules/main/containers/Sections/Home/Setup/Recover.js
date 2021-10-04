// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { range } from 'lodash';
import QrReader from 'react-qr-reader';
import TimeAgo from 'react-timeago';

import { Button, Dimmer, Divider, Grid, Header, Icon, Image, Loader, Segment, Table } from 'semantic-ui-react';

import { changeModule } from '../../../../actions/navigation';
import { resetAccountCreation, verifyTransactionExists } from '../../../../actions/account';

import AccountSetupElementsWordsList from './Elements/Words/List';
import Certificate from '../../../../../../renderer/assets/images/certificate.png';
import GlobalButtonElevate from '../../../../../../shared/containers/Global/Button/Elevate';
import GlobalFormFieldWords from '../../../../../../shared/components/Global/Form/Field/Words';

import RecoverAccount from './Elements/Recover/Account';
import RecoverEncryptionWords from './Elements/Recover/EncryptionWords';
import RecoverManual from './Elements/Recover/Manual';
import RecoverScan from './Elements/Recover/Scan';

const { ipcRenderer } = require('electron');

class AccountSetupRecover extends Component<Props> {
  state = {
    // Account to recover (needed for manual entry)
    accountName: false,
    // Key certificate string (anchorcert:<payload>)
    code: false,
    // Whether or not the recovery process has completed
    complete: false,
    // Encryption Keys (6 words)
    encryption: [],
    // User is entering mnemonic manually
    entry: false,
    // Error returned while decrypting certificate
    error: false,
    // Awaiting decryption of key certificate
    decrypting: false,
    // Last failure time of decryption
    decryptFailed: false,
    // Awaiting transaction irreverisibility
    irreversible: false,
    // Network (chainId) to recover account on (needed for manual entry)
    network: false,
    // QR Code scanning active, waiting for code detection
    scan: false,
    // 28 word phrase
    mnemonic: [],
    // Awaiting permission update
    updatingPermissions: false,
  }
  componentWillReceiveProps(nextProps) {
    const {
      codeReceived,
      error,
      decrypting,
      decryptFailed,
      updatingPermissions,
    } = this.state;
    if (decrypting && nextProps.accountcreate.decrypted) {
      this.setState({
        decrypting: false,
      });
    }
    if (updatingPermissions && nextProps.accountcreate.updatedAccount) {
      this.awaitIrreversible();
    }
    if (codeReceived !== nextProps.accountcreate.codeReceived && nextProps.accountcreate.code) {
      this.setState({
        code: nextProps.accountcreate.code,
        codeReceived: nextProps.accountcreate.codeReceived,
      });
    }
    if (decryptFailed !== nextProps.accountcreate.decryptFailed && nextProps.accountcreate.decryptFailed) {
      this.setState({
        decrypting: false,
        decryptFailed: nextProps.accountcreate.decryptFailed,
        error: nextProps.accountcreate.decryptError,
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.actions.resetAccountCreation();
  }
  interval = false
  awaitIrreversible = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const { updatedAccount } = this.props.accountcreate;
      const { chainId, transactionId } = updatedAccount;
      this.props.actions.verifyTransactionExists(chainId, transactionId);
    }, 2000);
    this.setState({
      updatingPermissions: false,
      irreversible: true
    });
  }
  complete = () => {
    clearInterval(this.interval);
    this.setState({
      complete: true,
      irreversible: false,
    });
  }
  handleScan = (data) => {
    if (data) {
      this.setState({
        scan: false,
        code: data
      });
    }
  }
  handleError = (err) => {
    console.error(err);
  }
  decrypt = () => {
    const { code, encryption } = this.state;
    if (encryption.length === 6) {
      ipcRenderer.send('decryptKeyCertificate', code, encryption);
      this.setState({ decrypting: true });
    }
  }
  addDevice = (password) => {
    const { code, encryption } = this.state;
    ipcRenderer.send('updateKeyWithCertificate', password, code, encryption);
    this.setState({
      updatingPermissions: true
    });
  }
  resetKeys = (password) => {
    const { code, encryption } = this.state;
    ipcRenderer.send('updateKeyWithCertificate', password, code, encryption, true);
    this.setState({
      updatingPermissions: true
    });
  }
  resetError = () => {
    this.setState({
      error: false
    });
  }
  setEncryptionWords = (encryption) => {
    this.setState({ encryption });
  }
  setCertificateDetails = (network, account = false, mnemonic = false) => {
    const changes = {
      network
    };
    if (account) {
      changes.account = account;
    }
    if (mnemonic) {
      changes.mnemonic = mnemonic;
    }
    this.setState(changes);
  }
  importOwner = () => {}
  render() {
    const {
      account,
      code,
      complete,
      entry,
      decrypting,
      irreversible,
      mnemonic,
      network,
      scan,
      updatingPermissions
    } = this.state;
    const { accountcreate, t } = this.props;
    const { decrypted } = accountcreate;
    let content = false;
    if (scan) {
      content = (
        <RecoverScan
          handleError={this.handleError}
          handleScan={this.handleScan}
          onBack={() => this.setState({ scan: false })}
        />
      );
    }
    if (entry) {
      content = (
        <RecoverManual
          account={account}
          mnemonic={mnemonic}
          network={network}
          onBack={() => this.setState({ entry: false })}
          setCertificateDetails={this.setCertificateDetails}
        />
      );
    }
    if (code) {
      content = (
        <RecoverEncryptionWords
          error={this.state.error}
          onBack={() => this.setState({
            code: false,
            scan: false,
            entry: false,
            error: false
          })}
          onClick={this.decrypt}
          resetError={this.resetError}
          setEncryptionWords={this.setEncryptionWords}
        />
      );
    }
    let loader = false;
    if (decrypting) {
      loader = (
        <Dimmer active inverted>
          <Loader size="big"><Header>Decrypting Certificate...</Header></Loader>
        </Dimmer>
      );
    }
    if (updatingPermissions) {
      loader = (
        <Dimmer active inverted>
          <Loader size="big"><Header>Updating account...</Header></Loader>
        </Dimmer>
      );
    }
    if (irreversible) {
      const { transactionEta } = accountcreate;
      const time = new Date();
      const expected = time.setSeconds(time.getSeconds() + transactionEta);
      loader = (
        <Dimmer active inverted>
          <Loader size="big">
            <Header>
              Verifying account update...
              <Header.Subheader>
                ~<TimeAgo live={false} date={expected} />
              </Header.Subheader>
            </Header>
            <Button
              content="Skip"
              onClick={this.complete}
              primary
            />
          </Loader>
        </Dimmer>
      );
    }
    if (decrypted) {
      content = (
        <RecoverAccount
          addDevice={this.addDevice}
          resetKeys={this.resetKeys}
        />
      );
    }
    if (complete) {
      content = (
        <React.Fragment>
          <Header>
            Your account is ready to use
            <Header.Subheader>
              The account has successfully been recovered using the owner key certificate.
            </Header.Subheader>
          </Header>
        </React.Fragment>
      );
    }
    return (
      <Segment basic clearing style={{ marginTop: 0 }}>
        {loader}
        {(!scan && !entry && !code)
          ? (
            <Segment basic>
              <Image
                floated="right"
                src={Certificate}
                style={{
                  height: '360px'
                }}
              />
              <Header
                content={t('global_account_import_exist_header_six')}
                subheader={t('global_account_import_exist_subheader_six')}
                style={{ marginTop: 0 }}
              />
              <React.Fragment>
                <Segment style={{ maxWidth: '50%' }}>
                  <Button
                    content="Scan with Webcam"
                    fluid
                    icon="qrcode"
                    onClick={() => this.setState({ scan: true, code: false })}
                    primary
                    style={{ marginBottom: '1em' }}
                  />
                  <p>Scan the QR code from the owner key certificate and enter the 6-word encryption key.</p>
                </Segment>
                <Segment style={{ maxWidth: '50%' }}>
                  <Button
                    content="Manual Entry"
                    fluid
                    icon="keyboard"
                    onClick={() => this.setState({ entry: true, code: false })}
                    primary
                    style={{ marginBottom: '1em' }}
                  />
                  <p>Select the network, enter the account name, the 28-word mnemonic key, and the 6-word encryption key from the owner key certificate.</p>
                </Segment>
              </React.Fragment>
            </Segment>
          )
          : false
        }
        {content}
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountcreate: state.accountcreate,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      resetAccountCreation,
      verifyTransactionExists
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupRecover);
