// @flow
import React, { Component } from 'react';
import { Header, Grid, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import SidebarConnection from '../containers/Sidebar/Connection';
import ActionsTable from './Actions/Table';
import WalletPanel from './Wallet/Panel';

type Props = {
  actions: {
    clearSystemState: () => void,
    getAccount: () => void,
    getActions: () => void
  },
  actionObjects: {},
  accounts: {},
  amount: 0,
  balances: {},
  history: {},
  keys: {},
  settings: {},
  system: {},
  t: () => void,
  actionObjects: {},
  validate: {},
  wallet: {}
};

class Actions extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      validate
    } = this.props;
    const {
      getActions
    } = actions;
    if (validate.NODE) {
      getActions();
    }
  }

  render() {
    const {
      actions,
      actionObjects,
      accounts,
      amount,
      balances,
      history,
      keys,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    let sidebar = [(
      <WalletPanel
        actions={actions}
        accounts={accounts}
        balances={balances}
        key="WalletPanel"
        keys={keys}
        settings={settings}
        system={system}
        validate={validate}
        wallet={wallet}
      />
    )];
    const validUser = (wallet.account && wallet.key && wallet.key.keys);

    if (validUser) {
      sidebar = (
        <React.Fragment />
      );
    }
    return (
      <div ref={this.handleContextRef}>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={6}>
              <SidebarConnection
                actions={actions}
                history={history}
              />
              {sidebar}
            </Grid.Column>
            <Grid.Column width={10}>
              {(actions.list.length > 0)
               ? [(
                 <Visibility
                   continuous
                   key="ActionsTable"
                   fireOnMount
                   onBottomVisible={this.loadMore}
                   once={false}
                 >
                   <ActionsTable
                     amount={amount}
                     attached="top"
                     actions={actionObjects}
                   />
                 </Visibility>
               ), (
                 (amount < actions.list.length)
                 ? (
                   <Segment key="ActionsTableLoading" clearing padded vertical>
                     <Loader active />
                   </Segment>
                 ) : false
               )]
               : (
                 <Segment attached="bottom" stacked>
                   <Header textAlign="center">
                     {t('action_none_loaded')}
                   </Header>
                 </Segment>
               )
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default translate('actions')(Actions);
