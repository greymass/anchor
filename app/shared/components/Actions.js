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
    getAccountActions: () => void
  },
  actionObjects: {},
  accounts: {},
  balances: {},
  history: {},
  keys: {},
  settings: {},
  system: {},
  t: () => void,
  actionObjects: {},
  transaction: {},
  validate: {},
  wallet: {}
};

class Actions extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      amount: 20
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadMore = () => this.setState({ amount: this.state.amount + 20 }, () => {
    this.tick();
  });

  tick() {
    const {
      actions,
      validate
    } = this.props;
    const {
      getAccountActions
    } = actions;

    if (validate.NODE) {
      const {
        amount
      } = this.state;

      getAccountActions(amount);
    }
  }

  render() {
    const {
      actions,
      actionObjects,
      accounts,
      balances,
      history,
      keys,
      settings,
      system,
      t,
      transaction,
      validate,
      wallet
    } = this.props;

    const {
      amount
    } = this.state;


    let sidebar = [(
      <WalletPanel
        actions={actions}
        accounts={accounts}
        balances={balances}
        key="WalletPanel"
        keys={keys}
        settings={settings}
        system={system}
        transaction={transaction}
        validate={validate}
        wallet={wallet}
      />
    )];

    const validUser = (keys && keys.key);

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
              {(actionObjects.list.length > 0)
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
                     actionObjects={actionObjects}
                   />
                 </Visibility>
               ), (
                 (amount < actionObjects.list.length)
                 ? (
                   <Segment key="ActionsTableLoading" clearing padded vertical>
                     <Loader active />
                   </Segment>
                 ) : false
               )]
               : (
                 <Segment attached="bottom" stacked>
                   <Header textAlign="center">
                     {t('actions_none')}
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
