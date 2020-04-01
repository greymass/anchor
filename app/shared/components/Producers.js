import React, { Component } from 'react';
import { Tab, Divider, Message } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { intersection } from 'lodash';

import BlockProducers from './Producers/BlockProducers';
import ProducersProxy from './Producers/Proxy';
import ProducersVotingPreview from './Producers/BlockProducers/Modal/Preview';
import Proxies from './Producers/Proxies';
import ProducersSelector from './Producers/BlockProducers/Selector';
import ToolsGovernanceProposals from './Tools/Governance/Proposals';

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
      || this.state.chainId !== settings.chainId
      || (nextProps.producers.proxy && nextProps.producers.proxy !== this.state.selected_account)
    ) {
      const { accounts } = nextProps;
      const { selected: currentlySelected, editingProducers } = this.state;
      // If an account is loaded, attempt to load it's votes
      if (settings.account && accounts[settings.account]) {
        const account = accounts[settings.account];
        if (account.voter_info) {
          const accountName = account.voter_info.proxy || account.account_name;
          let selected = editingProducers || !accounts[accountName] ?
            currentlySelected :
            accounts[accountName].voter_info.producers;
          if (nextProps.connection.keyPrefix === 'FIO') {
            const { list } = nextProps.producers;
            selected = selected.map((s) => {
              const [record] = list.filter((p) => p.owner === s)
              return (record && record.address) ? record.address : s;
            })
          }
          // If the voter_info entry exists, load those votes into state
          this.setState({
            selected,
            selected_account: accountName,
            selected_loaded: true,
            chain_id: settings.chainId,
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
    const availableProducers = producers.list.map((producer) => producer.address || producer.owner);
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
      connection,
      contracts,
      producers,
      pubkeys,
      settings,
      system,
      t,
      tables,
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

    const blockExplorers = allBlockExplorers[connection.chainKey];

    if (settings.account && settings.walletMode !== 'wait') {
      sidebar = (producersVotedIn) ? (
        <React.Fragment>
          <ProducersProxy
            account={account}
            accounts={accounts}
            actions={actions}
            addProxy={addProxy}
            blockExplorers={blockExplorers}
            currentProxy={currentProxy}
            isProxying={isProxying}
            isValidUser={isValidUser}
            onClose={this.onClose}
            removeProxy={removeProxy}
            settings={settings}
            system={system}
            tables={tables}
          />
          <Divider style={{ display: (!isProxying) ? 'none' : 'block' }} />
          {(!isProxying || editingProducers) && (
            <ProducersVotingPreview
              account={account}
              actions={actions}
              blockExplorers={blockExplorers}
              isProxying={isProxying}
              isValidUser={isValidUser}
              lastError={lastError}
              lastTransaction={lastTransaction}
              open={previewing}
              onClose={() => this.setState({ editingProducers: false })}
              onConfirm={this.submitProducerVotes.bind(this)}
              onOpen={() => this.previewProducerVotes(true)}
              proxyingTo={proxyingTo}
              selected={selected}
              settings={settings}
              submitting={submitting}
              system={system}
              unregisteredProducers={unregisteredProducers}
            />
          )}

          <ProducersSelector
            account={accounts[settings.account]}
            actions={actions}
            isProxying={isProxying}
            list={producers.list}
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

    const tabPanes = [
      {
        menuItem: t('producers_block_producers'),
        render: () => (
          <Tab.Pane>
            <BlockProducers
              {...this.props}
              addProducer={this.addProducer.bind(this)}
              removeProducer={this.removeProducer.bind(this)}
              selected={selected}
            />
          </Tab.Pane>
        )
      }
    ];

    if (connection.supportedContracts && connection.supportedContracts.includes('proposals')) {
      tabPanes.push({
        menuItem: t('tools:tools_menu_governance_proposals'),
        render: () => (
          <Tab.Pane>
            <ToolsGovernanceProposals
              actions={actions}
              blockExplorers={blockExplorers}
              contracts={contracts}
              settings={settings}
              system={system}
              validate={validate}
              wallet={wallet}
            />
          </Tab.Pane>
        )
      });
    }

    if (connection.supportedContracts && connection.supportedContracts.includes('regproxyinfo')) {
      tabPanes.push({
        menuItem: t('producers_proxies'),
        render: () => (
          <Tab.Pane>
            <Proxies
              {...this.props}
              addProxy={this.addProxy.bind(this)}
              removeProxy={this.removeProxy.bind(this)}
            />
          </Tab.Pane>
        )
      });
    }

    return (
      <div ref={this.handleContextRef}>
        <BlockProducers
          {...this.props}
          addProducer={this.addProducer.bind(this)}
          isValidUser={isValidUser}
          removeProducer={this.removeProducer.bind(this)}
          selected={selected}
          sidebar={sidebar}
        />
      </div>
    );
  }
}

export default translate(['tools', 'producers'])(Producers);
