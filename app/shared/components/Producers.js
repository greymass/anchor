import React, { Component } from 'react';
import { Tab, Grid, Divider } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import BlockProducers from './Producers/BlockProducers';
import ProducersProxy from './Producers/Proxy';
import ProducersVotingPreview from './Producers/BlockProducers/Modal/Preview';
import Proxies from './Producers/Proxies';
import ProducersSelector from './Producers/BlockProducers/Selector';
import SidebarAccount from '../containers/Sidebar/Account';
import WalletPanel from './Wallet/Panel';

class Producers extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      amount: 40,
      lastError: false,
      lastTransaction: {},
      previewing: false,
      querying: false,
      selected: [],
      selected_account: false,
      selected_loaded: false,
      submitting: false,
    };
  }

  addProxy = (proxyAccout) => {
    this.setState({
      addProxy: proxyAccout
    });
  }

  removeProxy = () => {
    this.setState({
      removeProxy: true
    });
  }

  onClose = () => {
    this.setState({
      addProxy: false,
      removeProxy: false
    });
  }

  addProducer = (producer) => {
    const producers = [...this.state.selected];
    if (producers.indexOf(producer) === -1) {
      producers.push(producer);
      producers.sort();
      this.setState({
        selected: producers
      });
    }
  }

  removeProducer = (producer) => {
    const producers = [...this.state.selected];
    const index = producers.indexOf(producer);
    if (index !== -1) {
      producers.splice(index, 1);
    }
    this.setState({
      selected: producers
    });
  }

  render() {
    const {
      actions,
      accounts,
      balances,
      blockExplorers,
      globals,
      history,
      keys,
      producers,
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
      lastError,
      lastTransaction,
      previewing,
      removeProxy,
      selected,
      submitting
    } = this.state;
    let sidebar = [(
      <WalletPanel
        actions={actions}
        accounts={accounts}
        balances={balances}
        blockExplorers={blockExplorers}
        globals={globals}
        key="WalletPanel"
        keys={keys}
        settings={settings}
        system={system}
        transaction={transaction}
        validate={validate}
        wallet={wallet}
      />
    )];
    const account = accounts[settings.account];
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const isValidUser = !!((keys && keys.key && settings.walletMode !== 'wait') || settings.walletMode === 'watch');
    const modified = (selected.sort().toString() !== producers.selected.sort().toString());
    if (isValidUser && settings.walletMode !== 'wait') {
      sidebar = (
        <React.Fragment>
          <ProducersProxy
            account={account}
            accounts={accounts}
            actions={actions}
            blockExplorers={blockExplorers}
            keys={keys}
            isProxying={isProxying}
            isValidUser={isValidUser}
            settings={settings}
            system={system}
            tables={tables}
          />

          <Divider hidden />

          {(!isProxying) ? (
            <ProducersVotingPreview
              actions={actions}
              blockExplorers={blockExplorers}
              lastError={lastError}
              lastTransaction={lastTransaction}
              open={previewing}
              onClose={() => this.previewProducerVotes(false)}
              onConfirm={this.submitProducerVotes.bind(this)}
              onOpen={() => this.previewProducerVotes(true)}
              selected={selected}
              settings={settings}
              submitting={submitting}
              system={system}
            />
          ) : ''}

          <ProducersSelector
            account={accounts[settings.account]}
            isProxying={isProxying}
            modified={modified}
            removeProducer={this.removeProducer.bind(this)}
            selected={selected}
            submitProducerVotes={() => this.previewProducerVotes(true)}
            submitting={submitting}
          />
        </React.Fragment>
      );
    }

    return (
      <div ref={this.handleContextRef}>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={6}>
              <SidebarAccount
                actions={actions}
                history={history}
                wallet={wallet}
              />
              {sidebar}
            </Grid.Column>
            <Grid.Column width={10}>
              <Tab
                panes={
                  [
                    {
                      menuItem: t('producers_block_producers'),
                      render: () => {
                        return (
                          <Tab.Pane>
                            <BlockProducers
                              {...this.props}
                              addProducer={this.addProducer.bind(this)}
                              removeProducer={this.removeProxy.bind(this)}
                            />
                          </Tab.Pane>
                        );
                      }
                    },
                    {
                      menuItem: t('producers_proxies'),
                      render: () => {
                        return (
                          <Tab.Pane>
                            <Proxies
                              {...this.props}
                              addProxy={this.addProxy.bind(this)}
                              removeProxy={this.removeProxy.bind(this)}
                            />
                          </Tab.Pane>
                        );
                      }
                    }
                  ]
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default translate('producers')(Producers);
