// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { Segment } from 'semantic-ui-react';

import URIActions from '../actions/uri';
import SettingsActions from '../../../shared/actions/settings';
import TransactionActions from '../../../shared/actions/transaction';
import ValidateActions from '../../../shared/actions/validate';
import WalletActions from '../../../shared/actions/wallet';

import PromptStage from './Stage';
import PromptHeader from '../components/Header';
import PromptShare from '../components/Share';

const { remote } = require('electron');

const initialState = {
  blockchain: {},
  displayShareLink: false,
  wallet: {
    account: undefined,
    authorization: undefined,
    mode: undefined,
    pubkey: undefined,
  }
};

class PromptContainer extends Component<Props> {
  state = initialState
  componentDidMount() {
    this.templateURI();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.system.EOSIOURI === 'PENDING' && this.props.system.EOSIOURI === 'SUCCESS') {
      this.templateURI();
    }
  }
  onShareLink = () => this.setState({ displayShareLink: !this.state.displayShareLink })
  onClose = () => {
    const { actions } = this.props;
    actions.clearURI();
    const w = remote.getCurrentWindow();
    w.close();
  }
  onSign = () => {
    const { wallet } = this.state;
    const { actions, blockchains, prompt } = this.props;
    const { chainId, tx } = prompt;
    const blockchain = find(blockchains, { chainId });
    actions.signURI(tx, blockchain, wallet);
  }
  templateURI = () => {
    const { actions, blockchains, prompt } = this.props;
    const { chainId } = prompt;
    const newState = {};
    // Set the blockchain for this network
    const blockchain = find(blockchains, { chainId });
    newState.blockchain = blockchain;
    // Set the wallet to use by default for this network if not set
    const defaultWallet = find(this.props.wallets, { chainId });
    if (defaultWallet) {
      const wallet = {
        account: defaultWallet.account,
        authorization: defaultWallet.authorization,
        mode: defaultWallet.mode,
        pubkey: defaultWallet.pubkey,
      };
      newState.wallet = wallet;
      // Regenerate the template based on the blockchain and selected wallet
      actions.templateURI(blockchain, wallet);
    } else {
      newState.wallet = {};
    }
    this.setState(newState);
  }
  swapAccount = (e, { value }) => {
    const { actions, blockchains, prompt } = this.props;
    const { chainId } = prompt;
    const blockchain = find(blockchains, { chainId });
    const {
      account,
      authorization,
      mode,
      pubkey
    } = value;
    const wallet = {
      account,
      authorization,
      mode,
      pubkey,
    };
    this.setState({ wallet }, () => actions.templateURI(blockchain, wallet));
  }
  render() {
    const {
      prompt,
      system,
    } = this.props;
    const {
      blockchain,
      displayShareLink,
      wallet
    } = this.state;
    const {
      account,
      authorization,
      mode,
      pubkey,
    } = wallet;
    const {
      response
    } = prompt;
    const loading = (system.EOSIOURI === 'PENDING' || system.EOSIOURIBUILD === 'PENDING');
    const hasBroadcast = !!(response && (response.processed && response.processed.receipt.status === 'executed'));
    const hasExpired = !!(prompt.tx && !hasBroadcast && Date.now() > Date.parse(`${prompt.tx.expiration}z`));
    const hasWallet = !!(account && authorization && mode && pubkey);
    // const error = system.EOSIOURIBUILD_LAST_ERROR;
    return (
      <Segment
        tertiary
        padded
        style={{ height: '100%', minHeight: '100%' }}
      >
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
        {(hasWallet)
          ? (
            <PromptStage
              hasBroadcast={hasBroadcast}
              hasExpired={hasExpired}
              onClose={this.onClose}
              onShareLink={this.onShareLink}
              swapAccount={this.swapAccount}
              wallet={wallet}
            />
          )
          : (
            <span> no wallets</span>
          )
        }
        <Segment basic style={{ marginTop: 0 }} textAlign="center">
          <p>Chain ID: {blockchain.chainId}</p>
        </Segment>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    prompt: state.prompt,
    system: state.system,
    wallets: state.wallets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
      ...TransactionActions,
      ...URIActions,
      ...ValidateActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PromptContainer);
