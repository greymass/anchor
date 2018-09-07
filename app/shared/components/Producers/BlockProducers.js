// @flow
import React, { Component } from 'react';
import { Header, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import ProducersTable from './BlockProducers/Table';

class BlockProducers extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      amount: 40,
      querying: false
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadMore = () => this.setState({ amount: this.state.amount + 20 });

  resetDisplayAmount = () => this.setState({ amount: 40 });
  isQuerying = (querying) => this.setState({ querying });

  tick() {
    const {
      actions,
      validate
    } = this.props;
    const {
      getProducers,
      getProducersInfo
    } = actions;
    if (validate.NODE) {
      getProducers();
      getProducersInfo();
    }
  }

  render() {
    const {
      actions,
      accounts,
      addProducer,
      connection,
      globals,
      keys,
      producers,
      removeProducer,
      selected,
      settings,
      system,
      t
    } = this.props;
    const {
      amount,
      querying
    } = this.state;

    const account = accounts[settings.account];
    const isMainnet = (connection && connection.chain === 'eos-mainnet');
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const isValidUser = !!((keys && keys.key && settings.walletMode !== 'wait') || settings.walletMode === 'watch');

    return (
      (producers.list.length > 0)
        ? [(
          <Visibility
            continuous
            key="ProducersTable"
            fireOnMount
            onBottomVisible={this.loadMore}
            once={false}
          >
            <ProducersTable
              account={accounts[settings.account]}
              actions={actions}
              addProducer={addProducer}
              amount={amount}
              attached="top"
              globals={globals}
              isMainnet={isMainnet}
              isProxying={isProxying}
              isQuerying={this.isQuerying}
              keys={keys}
              producers={producers}
              removeProducer={removeProducer}
              resetDisplayAmount={this.resetDisplayAmount}
              selected={selected}
              settings={settings}
              system={system}
              isValidUser={isValidUser}
            />
          </Visibility>
        ), (
            (!querying && amount < producers.list.length)
              ? (
                <Segment key="ProducersTableLoading" clearing padded vertical>
                  <Loader active />
                </Segment>
              ) : false
          )]
        : (
          <Segment attached="bottom" stacked>
            <Header textAlign="center">
              {t('producer_none_loaded')}
            </Header>
          </Segment>
        )
    );
  }
}

export default translate('producers')(BlockProducers);
