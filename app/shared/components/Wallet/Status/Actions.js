// @flow
import React, { Component } from 'react';
import { Dimmer, Header, Grid, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import range from 'lodash/range';

import ActionsTable from './Actions/Table';

type Props = {
  actions: {
    getActions: () => void
  },
  blockExplorers: {},
  settings: {},
  t: () => void
};

class WalletStatusActions extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      amount: 20,
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
    const {
      actionHistory,
      actions,
      settings
    } = this.props;

    if (!this.reachedEndOfActions() && actionHistory.list.length < this.state.amount) {
      const {
        getActions
      } = actions;

      const {
        amount
      } = this.state;

      const lastLoadedAction = actionHistory.list[amount - 21] || actionHistory.list[-1];

      if (!lastLoadedAction) {
        this.setState({ amount: this.state.amount - 20 });
        return;
      }

      const lastLoadedActionId = lastLoadedAction.account_action_seq;

      const relevantActionsCached = actionHistory.list.filter((action) => {
        const firstActionId = lastLoadedActionId;
        const lastActionId = lastLoadedActionId - 19;

        const arrayOfActionIds = range(firstActionId, lastActionId);

        return arrayOfActionIds.includes(action.account_action_seq);
      });

      // Check if all of the needed items are already in the store, if so skip the API call.

      if (relevantActionsCached !== 20) {
        getActions(settings.account, lastLoadedActionId, -20);
      }
    }
  })

  reachedEndOfActions() {
    const {
      actionHistory
    } = this.props;

    return actionHistory.oldest_request_id === 0;
  }

  tick() {
    const {
      actions,
      settings
    } = this.props;

    const {
      getActions
    } = actions;

    getActions(settings.account, -1, -20);
  }

  render() {
    const {
      actionHistory,
      blockExplorers,
      chain,
      settings,
      t,
    } = this.props;

    const {
      amount
    } = this.state;

    return (
      <div ref={this.handleContextRef}>
        {(actionHistory && actionHistory.list)
          ? (
            <Grid.Column width={10}>
              {(actionHistory.list.length > 0)
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
                     actionHistory={actionHistory}
                     attached="top"
                     blockExplorers={blockExplorers}
                     chain={chain}
                     settings={settings}
                   />
                 </Visibility>
               ), (
                 (amount > actionHistory.list.length && !this.reachedEndOfActions())
                 ? (
                   <Segment key="ActionsTableLoading" clearing padded vertical>
                     <Loader active />
                   </Segment>
                 ) : false
               )]
               : (
                 <Segment attached="bottom" stacked>
                   <Header textAlign="center">
                     {t('actions_table_none')}
                   </Header>
                 </Segment>
               )
              }
            </Grid.Column>
          )
          : (
            <Segment clearing style={{ minHeight: '100px' }}>
              <Dimmer active>
                <Loader>{t('loading')}</Loader>
              </Dimmer>
            </Segment>
          )
        }
      </div>
    );
  }
}

export default translate('actions')(WalletStatusActions);
