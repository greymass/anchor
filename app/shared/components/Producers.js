import React, { Component } from 'react';
import { Tab, Grid, Divider, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { intersection } from 'lodash';

import BlockProducers from './Producers/BlockProducers';
import ProducersProxy from './Producers/Proxy';
import ProducersVotingPreview from './Producers/BlockProducers/Modal/Preview';
import Proxies from './Producers/Proxies';
import ProducersSelector from './Producers/BlockProducers/Selector';
import ToolsGovernanceProposals from './Tools/Governance/Proposals';
import WalletPanelLocked from './Wallet/Panel/Locked';

class Producers extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      editingProducers: false,
      lastError: false,
      lastTransaction: {},
      previewing: false,
      selected: [],
      selected_account: false,
      selected_loaded: false,
      submitting: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { settings, system } = nextProps;
    // Update state when the transaction has gone through
    if (
      this.state.submitting
      && (
        this.state.lastTransaction !== system.VOTEPRODUCER_LAST_TRANSACTION
        || this.state.lastError !== system.VOTEPRODUCER_LAST_ERROR
      )
    ) {
      this.setState({
        lastError: system.VOTEPRODUCER_LAST_ERROR,
        lastTransaction: system.VOTEPRODUCER_LAST_TRANSACTION,
        submitting: false,
      });
    }
    // If no selected are loaded, attempt to retrieve them from the props
    if (
      !this.state.selected_loaded
      || this.state.selected_account !== settings.account
      || (nextProps.producers.proxy && nextProps.producers.proxy !== this.state.selected_account)
    ) {
      const { accounts } = nextProps;
      const { selected: currentlySelected, editingProducers } = this.state;
      // If an account is loaded, attempt to load it's votes
      if (settings.account && accounts[settings.account]) {
        const account = accounts[settings.account];
        if (account.voter_info) {
          const selected_account = account.voter_info.proxy || account.account_name;
          const selected = editingProducers || !accounts[selected_account] ?
            currentlySelected :
            accounts[selected_account].voter_info.producers;
          // If the voter_info entry exists, load those votes into state
          this.setState({
            selected,
            selected_account,
            selected_loaded: true
          });
        } else {
          // otherwise notify users that they must stake before allowed voting
        }
      }
    }
  }

  addProxy = (proxyAccout) => {
    this.setState({
      addProxy: proxyAccout
    });
  };

  removeProxy = () => {
    this.setState({
      removeProxy: true
    });
  };

  onClose = () => {
    this.setState({
      addProxy: false,
      removeProxy: false
    });
  };

  addProducer = (producer) => {
    const producers = [...this.state.selected];
    if (producers.indexOf(producer) === -1) {
      producers.push(producer);
      producers.sort();
      this.setState({
        selected: producers,
        editingProducers: true,
      });
    }
  };

  removeProducer = (producer) => {
    const producers = [...this.state.selected];
    const index = producers.indexOf(producer);
    if (index !== -1) {
      producers.splice(index, 1);
    }
    this.setState({
      selected: producers,
      editingProducers: true,
    });
  };

  previewProducerVotes = (previewing) => this.setState({
    previewing,
    lastError: false, // Reset the last error
    lastTransaction: {}, // Reset the last transaction
  });

  submitProducerVotes = () => {
    const {
      producers
    } = this.props;
    const {
      clearSystemState,
      voteproducers
    } = this.props.actions;
    const {
      selected
    } = this.state;
    clearSystemState();
    const availableProducers = producers.list.map((producer) => producer.owner);
    const validSelected = intersection(availableProducers, selected);
    voteproducers(validSelected);
    this.setState({
      lastError: false, // Reset the last error
      lastTransaction: {}, // Reset the last transaction
      submitting: true,
    });
  };

  render() {
    const {
      accounts,
      actions,
      allBlockExplorers,
      balances,
      blockchains,
      connection,
      contracts,
      globals,
      producers,
      pubkeys,
      settings,
      system,
      t,
      tables,
      transaction,
      validate,
      wallet
    } = this.props;
    const {
      addProxy,
      editingProducers,
      lastError,
      lastTransaction,
      previewing,
      removeProxy,
      selected,
      submitting
    } = this.state;
    const { unregisteredProducers } = producers;
    let sidebar = [];
    const account = accounts[settings.account];
    const proxyingTo = account && account.voter_info && account.voter_info.proxy;
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const isValidUser = (pubkeys.unlocked.includes(wallet.pubkey) || ['watch', 'ledger'].includes(settings.walletMode));
    const modified = (selected.sort().toString() !== producers.selected.sort().toString());
    const currentProxy = (account && account.voter_info && account.voter_info.proxy);

    const producersVotedIn =
      connection.chainId !== '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f';

    if (isValidUser && settings.walletMode !== 'wait') {
      sidebar = (producersVotedIn) ? (
        <React.Fragment>
          <ProducersProxy
            account={account}
            accounts={accounts}
            actions={actions}
            addProxy={addProxy}
            blockExplorers={allBlockExplorers[connection.chainKey]}
            currentProxy={currentProxy}
            isProxying={isProxying}
            isValidUser={isValidUser}
            onClose={this.onClose}
            removeProxy={removeProxy}
            settings={settings}
            system={system}
            tables={tables}
          />
          {(!isProxying) ? (
            <ProducersVotingPreview
              account={account}
              actions={actions}
              blockExplorers={allBlockExplorers[connection.chainKey]}
              isProxying={isProxying}
              lastError={lastError}
              lastTransaction={lastTransaction}
              open={previewing}
              onClose={() => this.setState({ editingProducers : false })}
              onConfirm={this.submitProducerVotes.bind(this)}
              onOpen={() => this.previewProducerVotes(true)}
              proxyingTo={proxyingTo}
              selected={selected}
              settings={settings}
              submitting={submitting}
              system={system}
              unregisteredProducers={unregisteredProducers}
            />
          ) : ''}
          <ProducersSelector
            account={accounts[settings.account]}
            actions={actions}
            isProxying={isProxying}
            modified={modified}
            removeProducer={this.removeProducer.bind(this)}
            selected={selected}
            submitProducerVotes={() => this.previewProducerVotes(true)}
            submitting={submitting}
            unregisteredProducers={unregisteredProducers}
          />
        </React.Fragment>
      ) : (
        <Message
          content={t('producers_no_voting')}
        />
      );
    }

    if (!isValidUser && settings.walletMode !== 'wait') {
      sidebar = (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
    }

    return (
      <div ref={this.handleContextRef}>
        <BlockProducers
          {...this.props}
          addProducer={this.addProducer.bind(this)}
          removeProducer={this.removeProducer.bind(this)}
          selected={selected}
          sidebar={sidebar}
        />
      </div>
    );
  }
}

export default translate(['tools', 'producers'])(Producers);
