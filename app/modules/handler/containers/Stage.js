// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { includes, isObject } from 'lodash';
import { get } from 'dot-prop-immutable';
import ReactJson from 'react-json-view';

import { Dimmer, Header, Message, Icon, Loader, Segment } from 'semantic-ui-react';

import PromptStageBroadcast from './Stage/Broadcast';
import PromptStageCallback from './Stage/Callback';
import PromptStageExpired from './Stage/Expired';
import PromptStageForbidden from './Stage/Forbidden';
import PromptStageHardwareLedger from './Stage/Hardware/Ledger';
import PromptStageNotConfigured from './Stage/NotConfigured';
import PromptStageReview from './Stage/Review';
import PromptStageSuccess from './Stage/Success';

import PromptActionBroadcast from '../components/Actions/Broadcast';
import PromptActionCallback from '../components/Actions/Callback';
import PromptActionCancel from '../components/Actions/Cancel';
import PromptActionComplete from '../components/Actions/Complete';
import PromptActionDownload from '../components/Actions/Download';
import PromptActionRecreate from '../components/Actions/Recreate';
import PromptActionShare from '../components/Actions/Share';
import PromptActionSign from '../components/Actions/Sign';
import PromptActionSignBroadcast from '../components/Actions/SignBroadcast';
import PromptActionUnlock from '../components/Actions/Unlock';

import URIActions from '../actions/uri';
import WhitelistActions from '../actions/whitelist';
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
  onCallback = () => {
    const {
      actions,
      blockchain,
      prompt
    } = this.props;
    const {
      callback,
      signed,
    } = prompt;
    actions.callbackURI(signed, blockchain, callback);
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
  onSign = (andBroadcast = false) => {
    const {
      actions,
      blockchain,
      prompt,
      wallet
    } = this.props;
    const { resolved } = prompt;
    // After this signature is added, does it meet the requirements to be able to broadcast?
    // TODO: Implement checks for existing signatures
    const authorizations = get(resolved.transaction, 'actions.0.authorization', []);
    const canBroadcast = (authorizations.length === 1);
    const broadcast = (prompt.broadcast && andBroadcast)
    actions.signURI(resolved.transaction, blockchain, wallet, broadcast, prompt.callback);
  }
  onSignBroadcast = () => {
    const {
      actions,
      blockchain,
      prompt,
      wallet,
      whitelist,
    } = this.props;
    const {
      callback,
    } = prompt;
    const { resolved } = prompt;
    if (
      whitelist.actions
      && whitelist.actions.length
    ) {
      actions.addWhitelist(blockchain, wallet, whitelist);
    }
    actions.signURI(resolved.transaction, blockchain, wallet, true, callback);
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
      enableWhitelist,
      hasBroadcast,
      hasExpired,
      hasIssuedCallback,
      modifyWhitelist,
      onClose,
      onShareLink,
      onWhitelist,
      prompt,
      requestedActorMissing,
      settings,
      shouldBroadcast,
      status,
      system,
      t,
      validate,
      wallet,
      whitelist,
    } = this.props;

    const awaitingDevice = (system.EOSIOURISIGN === 'PENDING');
    const signing = (system.EOSIOURISIGN === 'PENDING');
    const broadcasting = (system.EOSIOURIBROADCAST === 'PENDING');
    const callbacking = (system.EOSIOURICALLBACK === 'PENDING');
    const validatingPassword = (validate.WALLET_PASSWORD === 'PENDING');

    let error = system.EOSIOURIBUILD_LAST_ERROR ||
      system.EOSIOURISIGN_LAST_ERROR ||
      system.EOSIOURIBROADCAST_LAST_ERROR;

    const warning = system.EOSIOURIBUILD_LAST_WARNING;

    if (requestedActorMissing) {
      error = { message: t('error_requested_actor_missing') };
    }

    const couldSignWithKey = ['cold', 'hot'].includes(wallet.mode);
    const canSignWithKey = (couldSignWithKey && availableKeys.includes(wallet.pubkey));
    const couldSignWithDevice = ['ledger'].includes(wallet.mode);
    const canSignWithDevice = (wallet.mode === 'ledger' && status === 'connected');
    const canSign = (canSignWithKey || canSignWithDevice);

    const hasTransaction = (prompt.resolved && prompt.resolved.transaction);
    const { signed } = prompt;
    const hasSignature = !!(
      signed
      && signed.signatures
      && signed.signatures.length > 0
    );

    const hasWallet = !!(wallet.account && wallet.authorization && wallet.mode && wallet.pubkey);
    const hasCallback = !!(prompt && prompt.callback && prompt.callback.url);
    const hasForegroundCallback = !!(
      prompt
      && prompt.callback
      && prompt.callback.url
      && prompt.callback.background === false
    );

    // After this signature is added, does it meet the requirements to be able to broadcast?
    // TODO: Implement checks for existing signatures
    const authorizations = get(prompt, 'transaction.actions.0.authorization', []);
    const canBroadcast = (canSign && authorizations.length === 1 && prompt.broadcast);

    const uriDigested = !!(prompt.transaction);

    let stage = (
      <PromptStageReview
        canBroadcast={canBroadcast}
        couldSignWithDevice={couldSignWithDevice}
        enableWhitelist={enableWhitelist}
        modifyWhitelist={modifyWhitelist}
        onCheck={this.onCheck}
        onShareLink={onShareLink}
        onWhitelist={onWhitelist}
        prompt={prompt}
        shouldBroadcast={shouldBroadcast}
        swapAccount={this.props.swapAccount}
        wallet={wallet}
        whitelist={whitelist}
      />
    );

    let nextAction = (
      <PromptActionSign
        broadcast
        disabled={!hasTransaction || signing || !canSign}
        loading={signing}
        onClick={this.onSign}
        wallet={wallet}
      />
    );

    // If the transaction has a signature, no need to sign
    if (hasSignature) {
      nextAction = false;
    }

    if (settings.eosio_signbroadcast && canBroadcast) {
      nextAction = (
        <PromptActionSignBroadcast
          disabled={!prompt.transaction || signing || !canSign}
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

    let helpAction = (
      <PromptActionShare
        onClick={onShareLink}
      />
    )

    if (wallet.mode === 'watch') {
      nextAction = (
        <PromptActionDownload
          disabled={!prompt.transaction || signing}
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

    const shouldDisplayDangerousTransactionsError = prompt &&
                                                    prompt.uri &&
                                                    error &&
                                                    error.type === 'forbidden' &&
                                                    settings.allowDangerousTransactions;

    if (shouldDisplayDangerousTransactionsError) {
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
    } else if (!hasWallet) {
      stage = (
        <PromptStageNotConfigured
          blockchain={blockchain}
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
          blockchain={blockchain}
          callbacking={callbacking}
          prompt={prompt}
          hasForegroundCallback={hasForegroundCallback}
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
          disabled={!prompt.transaction || signing || validatingPassword}
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
    } else if (hasTransaction && hasSignature && !hasBroadcast && !awaitingDevice) {
      stage = (
        <PromptStageBroadcast
          blockchain={blockchain}
        />
      );
      if (canBroadcast) {
        nextAction = (
          <PromptActionBroadcast
            disabled={!prompt.transaction}
            onClick={this.onBroadcast}
            wallet={wallet}
          />
        );
      }
      if (!canBroadcast && hasCallback && !hasIssuedCallback) {
        stage = (
          <PromptStageCallback
            blockchain={blockchain}
            callbacking={callbacking}
            settings={settings}
          />
        );
        nextAction = (
          <PromptActionComplete
            onClick={onClose}
          />
        );
      }
      if (!canBroadcast && hasCallback && hasIssuedCallback) {
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
      }
    }

    const shouldDisplayDangerousTransactionWarning =
      warning && warning.type === 'forbidden' && settings.allowDangerousTransactions;

    return (
      <React.Fragment>
        <Segment
          attached="bottom"
          padded
          style={{
            marginBottom: 0,
            paddingBottom: '100px',
            paddingTop: '130px',
          }}
        >
          <Dimmer
            active={signing || broadcasting || callbacking}
            inverted
          >
            <Loader
              size="big"
            >
              <Header>
                {(broadcasting) ? 'Broadcasting Transaction' : false}
                {(callbacking) ? 'Issuing Callback' : false}
                {(signing) ? 'Signing Transaction' : false}
              </Header>
            </Loader>
          </Dimmer>
          {(error && error.type !== 'forbidden')
            ? (
              <Segment color="red" inverted style={{ margin: 0 }}>
                {(error.message)
                  ? (
                    <React.Fragment>
                      <Header>
                        <Icon name="warning sign" />
                        <Header.Content>
                          There was a problem with this transaction
                        </Header.Content>
                      </Header>
                      <Segment>
                        {isObject(error)
                          ? (
                            <ReactJson
                              collapsed={4}
                              displayDataTypes={false}
                              displayObjectSize={false}
                              iconStyle="square"
                              name={null}
                              src={error}
                              style={{ padding: '1em' }}
                            />
                          )
                          : error
                        }
                      </Segment>
                    </React.Fragment>
                  )
                  : false
                }
              </Segment>
            )
            : stage
          }
          {(shouldDisplayDangerousTransactionWarning) && (
            <Message
              icon="warning sign"
              header="This is a dangerous transaction"
              content={warning.message}
              warning
            />
          )}
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

        </Segment>
        <Segment
          clearing
          secondary
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '90px',
            margin: 0,
            zIndex: 2,
          }}
        >
          {(!error || error.type === 'forbidden')
            ? nextAction
            : false
          }
          {cancelAction}
          {helpAction}
        </Segment>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    availableKeys: state.auths.keystore.map((auth) => auth.pubkey),
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
      ...WhitelistActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(PromptStage);
