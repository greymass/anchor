// @flow
import React, { Component } from 'react';
import { Header, Grid, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import ActionsTable from './Actions/Table';

type Props = {
  actionHistory: {},
  actions: {
    getAccountActions: () => void
  },
  settings: {},
  t: () => void,
  validate: {}
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
      actionHistory,
      settings,
      t,
    } = this.props;

    const {
      amount
    } = this.state;

    return (
      <div ref={this.handleContextRef}>
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
                 settings={settings}
               />
             </Visibility>
           ), (
             (amount > actionHistory.list.length)
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
      </div>
    );
  }
}

export default translate('actions')(Actions);
