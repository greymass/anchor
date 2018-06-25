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
    getGlobals: () => void,
    getActions: () => void
  },
  actionObjects: {},
  accounts: {},
  balances: {},
  globals: {},
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

  componentWillReceiveProps(nextProps) {
    const { validate } = this.props;
    const nextValidate = nextProps.validate;
    // On a new node connection, update props + producers
    if (
      validate.NODE === 'PENDING'
      && nextValidate.NODE === 'SUCCESS'
    ) {
      this.props.actions.getGlobals();
      this.tick();
    }
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
      balances,
      globals,
      history,
      keys,
      querying,
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
    const validUser = (wallet.account || settings.walletMode === 'watch');

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
                   key="ProducersTable"
                   fireOnMount
                   onBottomVisible={this.loadMore}
                   once={false}
                 >
                   <ActionsTable
                     amount={amount}
                     attached="top"
                     globals={globals}
                     actions={actionObjects}
                     validUser={validUser}
                   />
                 </Visibility>
               ), (
                 (!querying && amount < actions.list.length)
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
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default translate('actions')(Actions);
