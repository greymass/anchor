// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { PrivateKey } from '@greymass/eosio';
import { Button, Dimmer, Header, Loader, Segment } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import {
  createAccount,
  createWallet,
  importCreatedAccountKeys,
  resetAccountCreation,
  verifyAccountExists
} from '../../../../actions/account';
import { importPubkeyStorage } from '../../../../../../shared/actions/wallets';
import { changeModule } from '../../../../actions/navigation';

import GlobalModalAccountImportPassword from '../../../../../../shared/containers/Global/Account/Import/Password';

import AccountSetupElementsCodeError from './Elements/CodeError';
import AccountSetupElementsComplete from './Elements/Complete';
import AccountSetupElementsConfirm from './Elements/Confirm';
import AccountSetupElementsAccountName from './Elements/AccountName';

const { ipcRenderer } = require('electron');

class AccountSetupCode extends Component<Props> {
  state = {
    // User specified account name
    accountName: '',
    // Public key of the active permission generated in the process
    activeKey: false,
    // Awaiting confirmation of creation on-chain by transaction id
    awaiting: false,
    // Final account completion status
    complete: false,
    // Awaiting user confirmation of account name
    confirming: false,
    // Awaiting sextant creation response
    creating: false,
    // Whether or not keys have been generated
    generated: false,
    // Awaiting generation of keys/certificate
    generating: false,
    // Awaiting irreversible of account
    irreversible: false,
    // The Ledger setup configuration used during creation
    ledgerMethod: false,
    // User password temporarily stored to prevent multiple entries
    password: false,
    // Transaction ID to monitor for account creation
    transactionId: false,
  }
  componentWillReceiveProps(nextProps) {
    const {
      awaiting, creating, generated, generating, irreversible, password
    } = this.state;
    const {
      transactionId, transactionExists, transactionIrreversible
    } = this.props.accountcreate;
    if (generating && !generated && nextProps.accountcreate.account) {
      this.setState({
        generated: true
      }, () => this.createAccount(nextProps.accountcreate));
    }
    if (creating && !transactionId && nextProps.accountcreate.transactionId) {
      this.setState({
        transactionId: nextProps.accountcreate.transactionId
      }, () => this.awaitCreation());
    }
    if (awaiting && !transactionExists && nextProps.accountcreate.transactionExists) {
      this.awaitIrreversible();
    }
    if (
      !transactionIrreversible
      && nextProps.accountcreate.transactionIrreversible
    ) {
      this.complete();
    }
  }
  componentWillUnmount() {
    this.props.actions.resetAccountCreation();
    clearInterval(this.interval);
  }
  createAccount = (accountcreate) => {
    const { actions } = this.props;
    const {
      accountName, active, chainId, owner
    } = accountcreate.account;
    // Create the account
    actions.createAccount(
      accountcreate.code,
      chainId,
      accountName,
      active,
      owner,
    );
    // Proceed to the next step
    this.setState({
      creating: true,
      generating: false,
      password: undefined,
    });
  }
  interval = false
  awaitCreation = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const { account, chainId } = this.props.accountcreate;
      const { accountName, active } = account;
      this.props.actions.verifyAccountExists(chainId, accountName, active);
    }, 2000);
    this.setState({
      awaiting: true,
      creating: false
    });
  }
  awaitIrreversible = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const { account, chainId } = this.props.accountcreate;
      const { accountName, active } = account;
      this.props.actions.verifyAccountExists(chainId, accountName, active);
    }, 2000);
    this.setState({
      awaiting: false,
      irreversible: true
    });
  }
  complete = () => {
    clearInterval(this.interval);
    // const { accountcreate } = this.props;
    // const { account, chainId } = accountcreate;
    // const { active, accountName } = account;
    // this.props.actions.createWallet(chainId, accountName, active);
    this.setState({
      complete: true,
      irreversible: false,
    });
  }
  onChangeAccountName = (accountName) => this.setState({ accountName })
  onCreate = (password, ledgerMethod = false) => {
    const { accountcreate, actions, ledger } = this.props;
    const { chainId } = accountcreate;
    const { publicKey } = ledger;
    const { accountName } = this.state;
    let ownerKey = false;
    let activeKey = false;
    if (ledgerMethod) {
      if (!publicKey || !publicKey.wif) {
        throw new Error('The Ledger public key could not be retrieved during creation process.');
      }
      this.setState({ ledgerMethod });
    }
    switch (ledgerMethod) {
      case 'all': {
        // for 'all' method, both owner and active are that of the ledger
        ownerKey = publicKey.wif;
        activeKey = publicKey.wif;
        break;
      }
      case 'recover': {
        // for 'recover' method, owner is the ledger and active is false
        ownerKey = publicKey.wif;
        break;
      }
      case 'use': {
        // for 'use' method, owner is false and active is that of the ledger
        activeKey = publicKey.wif;
        break;
      }
      default: {
        // do nothing on unspecified ledger method
        break;
      }
    }
    // if the ledger method used sets the active key to that of the ledger, import pubkey into storage
    if (['all', 'use'].includes(ledgerMethod)) {
      actions.importPubkeyStorage(activeKey, "44'/194'/0'/0/0");
    }
    // instruct the main process to create/store the account information
    ipcRenderer.send('generateNewAccount', password, chainId, accountName, ownerKey, activeKey);

    this.setState({
      generating: true,
      confirming: false,
      password,
    });
  }
  onPasswordSet = () => this.props.actions.changeModule('home/account/code')
  render() {
    const {
      accountName,
      awaiting,
      complete,
      confirming,
      creating,
      generating,
      irreversible,
      ledgerMethod,
    } = this.state;
    const { accountcreate, settings } = this.props;
    if (!settings.walletHash) {
      return <GlobalModalAccountImportPassword onComplete={this.onPasswordSet} />;
    }
    if (accountcreate.error) {
      return <AccountSetupElementsCodeError />;
    }
    if (!accountcreate || !accountcreate.blockchain) {
      return (
        <React.Fragment>
          <p>This request is not valid.</p>
          <Button
            content="New"
            onClick={() => ipcRenderer.send('openUri', 'anchorcreate:ASQ5MTUzMjU1OS01ZWMzLTQ0YmMtOTUxZC0yOWRjMWZiMmFiNjEA')}
          />
        </React.Fragment>
      );
    }
    if (complete) {
      return (
        <AccountSetupElementsComplete
          accountcreate={accountcreate}
          ledgerMethod={ledgerMethod}
        />
      );
    }
    let loader = false;
    if (generating) {
      loader = (
        <Dimmer active inverted>
          <Loader size="big"><Header>Generating/saving keys...</Header></Loader>
        </Dimmer>
      );
    }
    if (creating) {
      loader = (
        <Dimmer active inverted>
          <Loader size="big"><Header>Creating account...</Header></Loader>
        </Dimmer>
      );
    }
    if (awaiting) {
      loader = (
        <Dimmer active inverted>
          <Loader size="big"><Header>Confirming creation...</Header></Loader>
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
              Verifying account exists...
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
    // Show confirming step
    if (confirming || generating || creating || awaiting || irreversible) {
      return (
        <AccountSetupElementsConfirm
          accountName={accountName}
          blockchain={accountcreate.blockchain}
          loader={loader}
          onBack={() => this.setState({ confirming: false })}
          onClick={this.onCreate}
        />
      );
    }
    // If account is available and valid, allow proceeding to confirmation step
    return (
      <AccountSetupElementsAccountName
        accountName={accountName}
        blockchain={accountcreate.blockchain}
        onChange={this.onChangeAccountName}
        onNext={() => this.setState({ confirming: true })}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accountcreate: state.accountcreate,
    ledger: state.ledger,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      changeModule,
      createAccount,
      createWallet,
      importCreatedAccountKeys,
      importPubkeyStorage,
      resetAccountCreation,
      verifyAccountExists,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupCode);
