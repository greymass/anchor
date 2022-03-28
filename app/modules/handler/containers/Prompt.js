// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find, pick } from 'lodash';
import { get, set } from 'dot-prop-immutable';

import URIActions from '../actions/uri';
import SettingsActions from '../../../shared/actions/settings';
import SystemStateActions from '../../../shared/actions/system/systemstate';
import TransactionActions from '../../../shared/actions/transaction';
import ValidateActions from '../../../shared/actions/validate';
import WalletActions from '../../../shared/actions/wallet';

import { createHttpHandler } from '../../../shared/utils/http/handler';

import PromptStage from './Stage';
import PromptHeader from '../components/Header';
import PromptShare from '../components/Share';

const { remote } = require('electron');

const initialState = {
  blockchain: {},
  displayShareLink: false,
  enableWhitelist: false,
  whitelist: {
    actions: [],
    flexible: [],
  },
  wallet: {
    account: undefined,
    authorization: undefined,
    mode: undefined,
    pubkey: undefined,
  },
};

class PromptContainer extends Component<Props> {
  state = initialState
  componentDidMount() {
    this.props.actions.clearSystemState();
    window.addEventListener('keydown', this.onKeyPress, true);
    this.templateURI();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.system.ESRURI === 'PENDING' && this.props.system.ESRURI === 'SUCCESS') {
      this.props.actions.clearSystemState();
      this.setState(initialState);
      this.templateURI();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPress, true);
  }
  modifyWhitelist = (e, { index, name }) => {
    const { whitelist } = this.state;
    const current = get(whitelist, `flexible.${index}.${name}`, false);
    const modified = set(whitelist, `flexible.${index}.${name}`, !current);
    this.setState({ whitelist: modified });
  }
  onKeyPress = (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && (e.target.nodeName === 'BODY')) {
      this.onCancel();
      e.preventDefault();
      return false;
    }
  }
  onShareLink = () => this.setState({ displayShareLink: !this.state.displayShareLink })
  onClose = () => {
    const { actions, prompt } = this.props;
    actions.clearURI();
    const w = remote.getCurrentWindow();
    if (prompt.callback) {
      w.close();
    } else {
      w.hide();
    }
    this.setState(initialState);
  };
  onCancel = async () => {
    const { prompt } = this.props;
    if (prompt.callback) {
      const { httpClient } = await createHttpHandler({});
      httpClient.post(prompt.callback, {
        rejected: 'Request cancelled from within Anchor.'
      });
    }
    this.onClose();
  }
  onSign = () => {
    const { wallet } = this.state;
    const { actions, blockchains, prompt } = this.props;
    const { chainId, resolved } = prompt;
    const blockchain = find(blockchains, { chainId });
    // After this signature is added, does it meet the requirements to be able to broadcast?
    // TODO: Implement checks for existing signatures
    // const authorizations = get(tx, 'tx.actions.0.authorization', []);
    // const canBroadcast = (canSign && authorizations.length === 1);
    actions.signURI(resolved.transaction, blockchain, wallet);
  };
  onWhitelist = (e, { checked }) => {
    const actions = get(this.props.prompt, 'transaction.actions', []);
    // Establish which fields should have flexible values within the whitelist
    const flexible = actions.map((action) => {
      const flex = {};
      Object.keys(action.data).forEach((field) => {
        flex[field] = false;
      });
      return flex;
    });
    this.setState({
      enableWhitelist: checked,
      whitelist: (checked)
        ? { actions, flexible }
        : {}
    });
  }
  getDefaultWallet = () => {
    const { blockchain } = this.state;
    const { prompt, wallets } = this.props;
    const { chainId } = (blockchain && blockchain.chainId) ? blockchain : prompt;
    const firstAction = get(prompt, 'req.1.actions.0')
      || get(prompt, 'req.1.0')
      || get(prompt, 'req.1');
    const secondAction = get(prompt, 'req.1.actions.1')
      || get(prompt, 'req.1.1');
    const firstAccount = get(firstAction, 'authorization.0.actor');
    const firstAuthorization = get(firstAction, 'authorization.0.permission');
    let secondAccount;
    let secondAuthorization;
    if (secondAction) {
      secondAccount = get(secondAction, 'authorization.0.actor');
      secondAuthorization = get(secondAction, 'authorization.0.permission');
    }
    const defaultWallet =
      find(wallets, { chainId, account: firstAccount, authorization: firstAuthorization }) ||
      find(wallets, { chainId, account: secondAccount, authorization: secondAuthorization }) ||
      find(wallets, { chainId });
    return defaultWallet;
  }
  templateURI = () => {
    const { blockchains, prompt } = this.props;
    const { chainId } = prompt;
    // Set the blockchain for this network
    const blockchain = find(blockchains, { chainId });
    const defaultWallet = this.getDefaultWallet();
    // Find the default wallet for this chain (defaults to first at the moment)
    if (defaultWallet) {
      // If a default was found, set the blockchain and swap to it
      this.setState({ blockchain }, () => {
        this.swapAccount(false, { value: defaultWallet });
      });
    } else {
      // If not, empty the current wallet and set the blockchain
      this.setState({
        blockchain,
        wallet: {}
      });
    }
  };
  swapAccount = (e, { value }) => {
    const { actions, wallets } = this.props;
    const { blockchain } = this.state;
    const wallet = pick(value, ['account', 'authorization', 'authAccount', 'authAuthorization', 'chainId', 'mode', 'path', 'pubkey']);
    if (!wallet.pubkey && wallet.authAccount && wallet.authAuthorization) {
        const authority = find(wallets, { chainId: wallet.chainId, account: wallet.authAccount, authorization: wallet.authAuthorization })
        if (authority) {
            wallet.pubkey = authority.pubkey
        }
    }
    this.setState({
      displayShareLink: initialState.displayShareLink,
      enableWhitelist: initialState.enableWhitelist,
      whitelist: initialState.whitelist,
      wallet
    }, () => actions.templateURI(blockchain, wallet));
  };
  swapChain = (chainId) => {
    const { actions, blockchains } = this.props;
    const blockchain = find(blockchains, { chainId });
    this.setState({
      blockchain,
      displayShareLink: initialState.displayShareLink,
      enableWhitelist: initialState.enableWhitelist,
      whitelist: initialState.whitelist,
    }, () => {
      const wallet = this.getDefaultWallet();
      if (wallet) {
        this.setState({ wallet }, () => actions.templateURI(blockchain, wallet));
      } else {
        actions.templateURI(blockchain, wallet);
      }
    });
  };
  toggleSessions = () => {
    this.props.actions.setSetting('enableSessions', !this.props.settings.enableSessions);
  }
  render() {
    const {
      prompt,
      settings,
      system,
      wallets,
    } = this.props;
    const {
      blockchain,
      displayShareLink,
      enableWhitelist,
      wallet,
      whitelist,
    } = this.state;
    const {
      enableSessions
    } = settings;
    const {
      response
    } = prompt;
    if (Object.keys(prompt).length === 0) {
      return false;
    }
    const loading = (system.ESRURI === 'PENDING' || system.ESRURIBUILD === 'PENDING');
    const shouldBroadcast = (prompt && prompt.resolved && prompt.resolved.request && prompt.resolved.request.shouldBroadcast)
      ? prompt.resolved.request.shouldBroadcast()
      : false;
    const hasBroadcast =
      !!(response && (response.processed && response.processed.receipt.status === 'executed'));
    const hasIssuedCallback = prompt.callbackExecuted;
    const expiration = prompt.resolved
      && prompt.resolved.transaction
      && Date.parse(`${prompt.resolved.transaction.expiration.toString()}z`);
    const now = Date.now();
    const hasExpired = false; //! !(expiration && !hasBroadcast && now > expiration);
    const requestedActor = get(prompt, 'transaction.actions.0.authorization.0.actor');
    const requestedActorMissing =
      requestedActor &&
      requestedActor !== '...........1' &&
      blockchain &&
      !find(wallets, { account: requestedActor, chainId: blockchain.chainId });
    return (
      <React.Fragment>
        <PromptShare
          onClose={this.onShareLink}
          open={displayShareLink}
          uri={prompt.uri}
        />
        <PromptHeader
          blockchain={blockchain}
          hasBroadcast={hasBroadcast}
          hasExpired={hasExpired}
          prompt={prompt}
          loading={loading}
        />
        <PromptStage
          blockchain={blockchain}
          enableSessions={enableSessions}
          enableWhitelist={enableWhitelist}
          expiration={expiration}
          hasBroadcast={hasBroadcast}
          hasExpired={hasExpired}
          hasIssuedCallback={hasIssuedCallback}
          modifyWhitelist={this.modifyWhitelist}
          onCancel={this.onCancel}
          onClose={this.onClose}
          onShareLink={this.onShareLink}
          onWhitelist={this.onWhitelist}
          requestedActorMissing={requestedActorMissing}
          shouldBroadcast={shouldBroadcast}
          swapAccount={this.swapAccount}
          swapChain={this.swapChain}
          toggleSessions={this.toggleSessions}
          wallet={wallet}
          whitelist={whitelist}
        />
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
    wallets: state.wallets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
      ...SystemStateActions,
      ...TransactionActions,
      ...URIActions,
      ...ValidateActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PromptContainer);
