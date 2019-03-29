// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find, includes } from 'lodash';

import { Dimmer, Header, Loader, Segment } from 'semantic-ui-react';

import PromptActionBroadcast from '../components/Actions/Broadcast';
import PromptActionCancel from '../components/Actions/Cancel';
import PromptActionComplete from '../components/Actions/Complete';
import PromptActionDownload from '../components/Actions/Download';
import PromptActionRecreate from '../components/Actions/Recreate';
import PromptActionSign from '../components/Actions/Sign';

import PromptStageReview from './Stage/Review';
import PromptStageBroadcast from './Stage/Broadcast';
import PromptStageExpired from './Stage/Expired';
import PromptStageSuccess from './Stage/Success';

import URIActions from '../actions/uri';

const { ipcRenderer } = require('electron');

class PromptStage extends Component<Props> {
  onBroadcast = () => {
    const { actions, blockchains, prompt } = this.props;
    const {
      callback,
      chainId,
      signed,
    } = prompt;
    const blockchain = find(blockchains, { chainId });
    actions.callbackURIWithProcessed({
      bi: '',
      bn: 123456,
      tx: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      sig: ['ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'],
    }, callback);
    // actions.broadcastURI(signed, blockchain, callback);
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
      blockchains,
      prompt,
      wallet
    } = this.props;
    const { chainId, tx } = prompt;
    const blockchain = find(blockchains, { chainId });
    actions.signURI(tx, blockchain, wallet);
  }
  render() {
    const {
      actionName,
      hasBroadcast,
      hasExpired,
      onClose,
      onShareLink,
      prompt,
      settings,
      system,
      wallet,
    } = this.props;
    const transaction = prompt.signed;
    const awaitingDevice = (system.EOSIOURISIGN === 'PENDING');
    const canSign = !!(['hot', 'ledger'].includes(wallet.mode));
    const hasSignature = !!(
      transaction
      && transaction.transaction
      && transaction.transaction.signatures.length > 0
    );
    const uriDigested = !!(prompt.tx);
    const hasTransaction = !!(transaction && transaction.transaction_id);
    const hasError = (system[`${actionName}_LAST_ERROR`]);
    const signing = (system.EOSIOURISIGN === 'PENDING');
    const broadcasting = (system.EOSIOURIBROADCAST === 'PENDING');

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
        onShareLink={onShareLink}
        prompt={prompt}
        swapAccount={this.props.swapAccount}
        wallet={wallet}
      />
    );

    let nextAction = (
      <PromptActionSign
        disabled={!prompt.tx || signing}
        onClick={this.onSign}
        wallet={wallet}
      />
    );

    let cancelAction = (
      <PromptActionCancel
        onClick={onClose}
      />
    );

    if (!canSign) {
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

    if (!awaitingDevice && hasBroadcast) {
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
    } else if (hasError) {
      console.log('display err');
    } else if (hasTransaction && !hasSignature && !includes(['watch', 'ledger'], settings.walletMode)) {
      console.log('display signer');
    } else if (hasTransaction && wallet.mode === 'watch') {
      console.log('display download');
    } else if (awaitingDevice && wallet.mode === 'ledger') {
      console.log('display ledger');
    } else if (uriDigested && hasTransaction && hasSignature && !hasBroadcast && !awaitingDevice) {
      stage = (
        <PromptStageBroadcast />
      );
      nextAction = (
        <PromptActionBroadcast
          disabled={!prompt.tx}
          onClick={this.onBroadcast}
          wallet={wallet}
        />
      );
    }

    return (
      <React.Fragment>
        <Segment attached>
          <Dimmer
            active={signing || broadcasting}
            inverted
          >
            <Loader
              indeterminate
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
        <Segment
          attached="bottom"
          basic
          clearing
          secondary
          style={{ marginBottom: 0 }}
        >
          {nextAction}
          {cancelAction}
        </Segment>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    prompt: state.prompt,
    settings: state.settings,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...URIActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(PromptStage);
