// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find, includes } from 'lodash';

import { Dimmer, Header, Icon, Loader, Segment } from 'semantic-ui-react';

import PromptStageReview from './Stage/Review';
import PromptStageBroadcast from './Stage/Broadcast';
import PromptStageExpired from './Stage/Expired';
import PromptStageForbidden from './Stage/Forbidden';
import PromptStageHardwareLedger from './Stage/Hardware/Ledger';
import PromptStageSuccess from './Stage/Success';

import PromptActionBroadcast from '../components/Actions/Broadcast';
import PromptActionCancel from '../components/Actions/Cancel';
import PromptActionComplete from '../components/Actions/Complete';
import PromptActionDownload from '../components/Actions/Download';
import PromptActionRecreate from '../components/Actions/Recreate';
import PromptActionSign from '../components/Actions/Sign';
import PromptActionSignBroadcast from '../components/Actions/SignBroadcast';

import PromptActionUnlock from '../components/Actions/Unlock';

import URIActions from '../actions/uri';
import * as HardwareLedgerActions from '../../../shared/actions/hardware/ledger';
import { setSetting } from '../../../shared/actions/settings';
import { unlockWalletByAuth } from '../../../shared/actions/wallet';

const { ipcRenderer } = require('electron');

const potentialSettings = ['eosio_signbroadcast'];

class PromptStage extends Component<Props> {
  onBroadcast = () => {
    const {
      actions,
      blockchain,
      prompt
    } = this.props;
    const {
      callback,
      signed,
    } = prompt;
    // actions.callbackURIWithProcessed({
    //   bn: 123456,
    //   tx: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    //   sig: ['ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'],
    // }, callback);
    actions.broadcastURI(signed, blockchain, callback);
  }
  onCheck = (e, { name, checked }) => {
    if (potentialSettings.includes(name)) {
      const { actions } = this.props;
      actions.setSetting(name, checked);
    } else {
      console.log('unrecognized setting: ', name, checked);
    }
  }
  onRecreate = () => {
    const {
      uri
    } = this.props.prompt;
    ipcRenderer.send('openUri', uri);
  }
  onSaveUnsigned = () => {

  }
  onSign = () => {
    const {
      actions,
      blockchain,
      prompt,
      wallet
    } = this.props;
    const { tx } = prompt;
    actions.signURI(tx, blockchain, wallet);
  }
  onSignBroadcast = () => {
    const {
      actions,
      blockchain,
      prompt,
      wallet
    } = this.props;
    const {
      callback,
    } = prompt;
    const { tx } = prompt;
    actions.signURI(tx, blockchain, wallet, true, callback);
  }
  onUnlock = (password) => {
    const {
      actions,
      wallet
    } = this.props;
    actions.unlockWalletByAuth(wallet.account, wallet.authorization, password);
  }
  render() {
    const {
      availableKeys,
      blockchain,
      hasBroadcast,
      hasExpired,
      onClose,
      onShareLink,
      prompt,
      settings,
      status,
      system,
      wallet,
      validate,
    } = this.props;
    const transaction = prompt.signed;
    const awaitingDevice = (system.EOSIOURISIGN === 'PENDING');
    const couldSignWithKey = ['cold', 'hot'].includes(wallet.mode);
    const canSignWithKey = (couldSignWithKey && availableKeys.includes(wallet.pubkey));
    const canSignWithDevice = (wallet.mode === 'ledger' && status === 'connected');
    const canSign = (canSignWithKey || canSignWithDevice);
    // console.log(this.props)
    // console.log(couldSignWithKey, canSignWithKey, canSignWithDevice, canSign);
    const hasSignature = !!(
      transaction
      && transaction.transaction
      && transaction.transaction.signatures.length > 0
    );
    const uriDigested = !!(prompt.tx);
    const hasTransaction = !!(transaction && transaction.transaction_id);
    const signing = (system.EOSIOURISIGN === 'PENDING');
    const broadcasting = (system.EOSIOURIBROADCAST === 'PENDING');
    const validatingPassword = (validate.WALLET_PASSWORD === 'PENDING');
    const error = system.EOSIOURIBUILD_LAST_ERROR || system.EOSIOURISIGN_LAST_ERROR;

    // console.log(prompt);
    // console.log('hasExpired', hasExpired)
    // console.log('settings.walletMode', settings.walletMode);
    // console.log('awaitingDevice', awaitingDevice);
    // console.log('hasBroadcast', hasBroadcast);
    // console.log('hasTransaction', hasTransaction);
    // console.log('hasSignature', hasSignature);
    // console.log('hasError', hasError);

    let stage = (
      <PromptStageReview
        onCheck={this.onCheck}
        onShareLink={onShareLink}
        prompt={prompt}
        swapAccount={this.props.swapAccount}
        wallet={wallet}
      />
    );

    let nextAction = (
      <PromptActionSign
        disabled={!prompt.tx || signing || !canSign}
        loading={signing}
        onClick={this.onSign}
        wallet={wallet}
      />
    );

    if (settings.eosio_signbroadcast) {
      nextAction = (
        <PromptActionSignBroadcast
          disabled={!prompt.tx || signing || !canSign}
          loading={signing}
          onClick={this.onSignBroadcast}
          wallet={wallet}
        />
      );
    }

    let cancelAction = (
      <PromptActionCancel
        onClick={onClose}
      />
    );

    if (wallet.mode === 'watch') {
      nextAction = (
        <PromptActionDownload
          disabled={!prompt.tx || signing}
          onClick={this.onSaveUnsigned}
          prompt={prompt}
          settings={settings}
          wallet={wallet}
        />
      );
    }

    if (wallet.mode === 'ledger' && !canSign) {
      stage = (
        <PromptStageHardwareLedger
          onShareLink={onShareLink}
          prompt={prompt}
          swapAccount={this.props.swapAccount}
          wallet={wallet}
        />
      );
    }
    if (prompt && prompt.uri && error && error.type === 'forbidden') {
      stage = (
        <PromptStageForbidden
          error={error}
          prompt={prompt}
        />
      );
      nextAction = false;
      cancelAction = (
        <PromptActionComplete
          onClick={onClose}
        />
      );
    } else if (!awaitingDevice && hasBroadcast) {
      stage = (
        <PromptStageSuccess
          settings={settings}
        />
      );
      nextAction = false;
      cancelAction = (
        <PromptActionComplete
          onClick={onClose}
        />
      );
    } else if (couldSignWithKey && !canSign) {
      nextAction = (
        <PromptActionUnlock
          disabled={!prompt.tx || signing || validatingPassword}
          loading={validatingPassword}
          onClick={this.onUnlock}
          wallet={wallet}
        />
      );
    } else if (!hasBroadcast && hasExpired) {
      stage = (
        <PromptStageExpired
          uri={prompt.uri}
        />
      );
      nextAction = (
        <PromptActionRecreate
          onClick={this.onRecreate}
          wallet={wallet}
        />
      );
    } else if (hasTransaction && !hasSignature && !includes(['watch', 'ledger'], settings.walletMode)) {
      console.log('display signer');
    } else if (hasTransaction && wallet.mode === 'watch') {
      console.log('display download');
    } else if (awaitingDevice && wallet.mode === 'ledger') {
      console.log('display ledger');
    } else if (uriDigested && hasTransaction && hasSignature && !hasBroadcast && !awaitingDevice) {
      stage = (
        <PromptStageBroadcast
          blockchain={blockchain}
        />
      );
      nextAction = (
        <PromptActionBroadcast
          disabled={!prompt.tx}
          onClick={this.onBroadcast}
          wallet={wallet}
        />
      );
    }

    console.log(error)

    return (
      <React.Fragment>
        <Segment
          attached="bottom"
          style={{
            marginBottom: 0
          }}
        >
          <Dimmer
            active={signing || broadcasting}
            inverted
          >
            <Loader
              size="big"
            >
              <Header>
                {(signing) ? 'Signing' : false}
                {(broadcasting) ? 'Broadcasting' : false}
                {' '}
                Transaction
              </Header>
            </Loader>
          </Dimmer>
          {stage}
        </Segment>
        {(error && error.type !== 'forbidden')
          ? (
            <Segment size="large" color="red" inverted>
              {(error.message)
                ? (
                  <Header>
                    <Icon name="warning sign" />
                    <Header.Content>
                      {(wallet.mode === 'ledger')
                        ? 'Try again - the device failed to sign this transaction.'
                        : 'There was a problem signing this transaction.'
                      }
                      <Header.Subheader style={{ color: 'white' }}>
                        {error.message}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                )
                : false
              }
            </Segment>
          )
          : false
        }
        <Segment
          basic
          clearing
          style={{ margin: 0 }}
        >
          {nextAction}
          {cancelAction}
        </Segment>
        {(wallet && wallet.mode === 'watch')
          ? (
            <Segment color="orange" style={{ margin: 0 }}>
              <Header size="large">
                <Icon name="clock" />
                <Header.Content>
                  Offline Signing & Transaction Expirations
                  <Header.Subheader>
                    From the moment the unsigned transaction is saved as a file, a 2 hour countdown begins in which the transaction must be completed. Once 2 hours has passed, the transaction will become invalid and unable to perform the desired action.
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Segment>
          )
          : false
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    availableKeys: state.auths.map((auth) => auth.pubkey),
    blockchains: state.blockchains,
    prompt: state.prompt,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
    system: state.system,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting,
      unlockWalletByAuth,
      ...URIActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(PromptStage);
