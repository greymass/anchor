// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { includes, isObject } from 'lodash';
import { get } from 'dot-prop-immutable';
import ReactJson from 'react-json-view';

import { Dimmer, Header, Message, Icon, Loader, Segment } from 'semantic-ui-react';

import PromptStageBroadcast from './Stage/Broadcast';
import PromptStageCallback from './Stage/Callback';
import PromptStageError from './Stage/Error';
import PromptStageExpired from './Stage/Expired';
import PromptStageForbidden from './Stage/Forbidden';
import PromptStageIdentity from './Stage/Identity';
import PromptStageHardwareLedger from './Stage/Hardware/Ledger';
import PromptStageNotConfigured from './Stage/NotConfigured';
import PromptStageReview from './Stage/Review';
import PromptStageSuccess from './Stage/Success';

import PromptActionBroadcast from '../components/Actions/Broadcast';
import PromptActionCallback from '../components/Actions/Callback';
import PromptActionCancel from '../components/Actions/Cancel';
import PromptActionComplete from '../components/Actions/Complete';
import PromptActionDownload from '../components/Actions/Download';
import PromptActionIdentity from '../components/Actions/Identity';
import PromptActionRecreate from '../components/Actions/Recreate';
import PromptActionShare from '../components/Actions/Share';
import PromptActionSign from '../components/Actions/Sign';
import PromptActionSignBroadcast from '../components/Actions/SignBroadcast';
import PromptActionUnlock from '../components/Actions/Unlock';

import URIActions from '../actions/uri';
import WhitelistActions from '../actions/whitelist';
import GlobalTransactionMessageError from '../../../shared/components/Global/Transaction/Message/Error';
import * as HardwareLedgerActions from '../../../shared/actions/hardware/ledger';
import { setSetting } from '../../../shared/actions/settings';
import { unlockWalletByAuth } from '../../../shared/actions/wallet';

const { ipcRenderer } = require('electron');

const potentialSettings = ['promptCloseOnComplete', 'promptSignAndBroadcast'];

class PromptStage extends Component<Props> {
  componentDidUpdate() {
    const { hasBroadcast, prompt, system } = this.props;
    if (
      hasBroadcast
      && prompt
      && prompt.resolved
      && prompt.resolved.request
      && prompt.resolved.request.getInfoKey
    ) {
      const onSuccess = prompt.resolved.request.getInfoKey('onSuccess');
      const [actionType, actionName, actionResult] = onSuccess.split('_');
      if (onSuccess && !system[actionName] && !system[`${actionName}_LAST_TRANSACTION`] && prompt.response) {
        this.props.actions.mockDispatch(onSuccess, {
          tx: prompt.response
        });
      }
    }
  }
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
    const broadcast = !!(prompt.broadcast !== false && andBroadcast);
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
  onSignIdentity = () => {
    const {
      actions,
      blockchain,
      prompt,
      wallet
    } = this.props;
    actions.signIdentityRequest(
      prompt,
      blockchain,
      wallet,
    );
  }
  onUnlock = (password) => {
    const {
      actions,
      blockchain,
      wallet
    } = this.props;
    actions.unlockWalletByAuth(wallet.account, wallet.authorization, password, blockchain.chainId);
  }
  onUnlockAndSign = (password) => {
    const {
      actions,
      blockchain,
      prompt,
      wallet
    } = this.props;
    const { resolved } = prompt;
    const broadcast = !!(prompt.broadcast !== false);
    actions.unlockWalletByAuth(
      wallet.account,
      wallet.authorization,
      password,
      blockchain.chainId,
      // callback
      () => actions.signURI(resolved.transaction, blockchain, wallet, broadcast, prompt.callback)
    );
  }
  onUnlockAndSignIdentity= (password) => {
    const {
      actions,
      blockchain,
      prompt,
      wallet
    } = this.props;
    actions.unlockWalletByAuth(
      wallet.account,
      wallet.authorization,
      password,
      blockchain.chainId,
      // callback
      () => actions.signIdentityRequest(
        prompt,
        blockchain,
        wallet,
      )
    );
  }
  render() {
    const {
      auths,
      blockchain,
      blockchains,
      enableSessions,
      enableWhitelist,
      expiration,
      hasBroadcast,
      hasExpired,
      hasIssuedCallback,
      modifyWhitelist,
      onCancel,
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
      toggleSessions,
      validate,
      wallet,
      whitelist,
    } = this.props;
    const availableKeys = auths.keystore.map((auth) => auth.pubkey);
    const awaitingDevice = (system.ESRURISIGN === 'PENDING');
    const signing = (system.ESRURISIGN === 'PENDING');
    const broadcasting = (system.ESRURIBROADCAST === 'PENDING');
    const callbacking = (system.ESRURICALLBACK === 'PENDING');
    const validatingPassword = (validate.WALLET_PASSWORD === 'PENDING');

    let error = system.ESRURIBUILD_LAST_ERROR ||
      system.ESRURISIGN_LAST_ERROR ||
      system.ESRURIBROADCAST_LAST_ERROR ||
      // system.ESRURICALLBACK_LAST_ERROR ||
      system.ESRURI_LAST_ERROR;

    const warning = system.ESRURIBUILD_LAST_WARNING;

    if (requestedActorMissing) {
      error = { message: t('error_requested_actor_missing') };
    }

    const couldSignWithKey = ['cold', 'hot', 'auth'].includes(wallet.mode);
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

    let reqType;
    if (prompt && prompt.req) {
      ([reqType] = prompt.req);
    }


    const hasWallet = !!(wallet.account && wallet.authorization && wallet.mode && wallet.pubkey);
    const hasCallback = !!(prompt && prompt.callback);

    const hasForegroundCallback = !!(
      prompt
      && prompt.callback
      && prompt.callback.background === false
    );

    // After this signature is added, does it meet the requirements to be able to broadcast?
    // TODO: Implement checks for existing signatures
    const authorizations = get(prompt, 'transaction.actions.0.authorization', []);
    const canBroadcast = (canSign && authorizations.length === 1 && prompt.broadcast);

    const uriDigested = !!(prompt.transaction);

    // Once a identity request has been sent, just close
    if (reqType === 'identity' && hasSignature && !hasForegroundCallback) {
      onClose();
      return false;
    }

    // If promptCloseOnComplete is true
    // and the transaction is successful and wasn't broadcast, just close
    if (
      hasSignature
      && !hasForegroundCallback
      && settings.promptCloseOnComplete
      && (
        system.ESRURIBROADCAST === 'SUCCESS'
        || system.ESRURICALLBACK === 'SUCCESS'
      )
    ) {
      onClose();
      return false;
    }

    let stage = (
      <PromptStageReview
        canBroadcast={canBroadcast}
        couldSignWithDevice={couldSignWithDevice}
        enableWhitelist={enableWhitelist}
        expiration={expiration}
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
        disabled={hasExpired || !hasTransaction || signing || !canSign}
        loading={signing}
        onClick={this.onSign}
        wallet={wallet}
      />
    );

    // If the transaction has a signature, no need to sign
    if (hasSignature) {
      nextAction = false;
    }

    if (settings.esr_signbroadcast && canBroadcast) {
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
        onClick={onCancel}
      />
    );

    const helpAction = (
      <PromptActionShare
        onClick={onShareLink}
      />
    );

    if (wallet.mode === 'watch') {
      nextAction = (
        <PromptActionDownload
          disabled={!(prompt.resolved && prompt.resolved.transaction) || signing}
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
    } else if (!blockchain) {
      stage = (
        <PromptStageError
          error={`Unknown Blockchain (ID: ${prompt.chainId})`}
        />
      );
      nextAction = (
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
    } else if (!awaitingDevice && (hasForegroundCallback || hasBroadcast)) {
      stage = (
        <PromptStageSuccess
          blockchain={blockchain}
          callbacking={callbacking}
          prompt={prompt}
          hasBroadcast={hasBroadcast}
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
    } else if (reqType === 'identity' && !hasSignature) {
      stage = (
        <PromptStageIdentity
          blockchains={blockchains}
          canSign={canSign}
          couldSignWithDevice={couldSignWithDevice}
          enableSessions={enableSessions}
          onSelect={this.props.swapAccount}
          onSelectChain={this.props.swapChain}
          toggleSessions={toggleSessions}
          wallet={wallet}
        />
      );
      if (couldSignWithKey && !canSign) {
        nextAction = (
          <PromptActionUnlock
            disabled={hasExpired || signing || validatingPassword}
            loading={validatingPassword}
            onClick={this.onUnlockAndSignIdentity}
            wallet={wallet}
          />
        );
      } else {
        nextAction = (
          <PromptActionIdentity
            disabled={signing || !canSign}
            enableSessions={enableSessions}
            loading={signing}
            onClick={this.onSignIdentity}
            wallet={wallet}
          />
        );
      }
    } else if (
      couldSignWithKey
      // && !hasExpired
      && !canSign
    ) {
      nextAction = (
        <PromptActionUnlock
          disabled={hasExpired || signing || validatingPassword}
          loading={validatingPassword}
          onClick={this.onUnlockAndSign}
          wallet={wallet}
        />
      );
    } else if (!hasBroadcast && hasExpired) {
      stage = (
        <PromptStageExpired
          uri={prompt.uri}
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
      if (!canBroadcast && hasCallback && hasForegroundCallback && !hasIssuedCallback) {
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
            hasBroadcast={hasIssuedCallback || hasBroadcast}
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
            padding: '115px 15px 100px',
            minHeight: '100vh',
          }}
        >
          <Dimmer
            active={signing || broadcasting || callbacking || validatingPassword}
            inverted
            style={{ zIndex: 1001 }}
          >
            <Loader
              size="big"
            >
              <Header>
                {(broadcasting) ? t('handler_containers_stage_header_broadcast') : false}
                {(callbacking) ? t('handler_containers_stage_header_issue') : false}
                {(signing) ? t('handler_containers_stage_header_sign') : false}
                {(validatingPassword) ? t('handler_containers_stage_header_password') : false}
              </Header>
            </Loader>
          </Dimmer>
          {(shouldDisplayDangerousTransactionWarning) && (
            <Message
              icon="warning sign"
              header={t('handler_containers_stage_message_header')}
              content={(
                <React.Fragment>
                  <p>
                    {t(warning.message)}
                  </p>
                  <p>
                    {t('handler_containers_stage_message_paragraph')}
                  </p>
                </React.Fragment>
              )}
              error
              size="large"
              style={{ marginTop: 0 }}
            />
          )}
          {(error && error.type !== 'forbidden')
            ? (
              <GlobalTransactionMessageError
                error={error}
              />
            )
            : false
          }
          {(error && error.type === 'forbidden')
            ? (
              <PromptStageForbidden
                error={error}
                prompt={prompt}
              />
            )
            : false
          }
          {(!error)
            ? stage
            : false
          }
          {(wallet && wallet.mode === 'watch' && reqType !== 'identity')
            ? (
              <Segment color="orange" style={{ margin: 0 }}>
                <Header size="large">
                  <Icon name="clock" />
                  <Header.Content>
                    {t('handler_containers_stage_header')}
                    <Header.Subheader>
                      {t('handler_containers_stage_subheader')}
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
            zIndex: 2000,
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
    auths: state.auths,
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
  withTranslation('handler'),
  connect(mapStateToProps, mapDispatchToProps)
)(PromptStage);
