// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find, pick } from 'lodash';
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
    const { blockchains, prompt, wallets } = this.props;
    const { chainId } = prompt;
    // Set the blockchain for this network
    const blockchain = find(blockchains, { chainId });
    // Find the default wallet for this chain (defaults to first at the moment)
    const defaultWallet = find(wallets, { chainId });
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
  }
  swapAccount = (e, { value }) => {
    const { actions } = this.props;
    const { blockchain } = this.state;
    const wallet = pick(value, ['account', 'authorization', 'mode', 'path', 'pubkey']);
    this.setState({
      wallet
    }, () => actions.templateURI(blockchain, wallet));
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
    if (!blockchain) return false;
    const loading = (system.EOSIOURI === 'PENDING' || system.EOSIOURIBUILD === 'PENDING');
    const hasBroadcast = !!(response && (response.processed && response.processed.receipt.status === 'executed'));
    console.log(prompt)
    const hasExpired = !!(prompt.tx && !hasBroadcast && Date.now() > Date.parse(`${prompt.tx.expiration}z`));
    const hasWallet = !!(account && authorization && mode && pubkey);
    return (
      <Segment
        tertiary
        padded
        style={{ minHeight: '100%' }}
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
              blockchain={blockchain}
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
          <p>
            Chain ID: {(blockchain) ? blockchain.chainId : 'loading'}
          </p>
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
