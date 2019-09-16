// @flow
import React, { Component } from 'react';
import { Dimmer, Header, Grid, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import range from 'lodash/range';

class AccountActionsResources extends Component<Props> {
  render() {
    const {
      actionHistory,
      blockExplorers,
      chain,
      connection,
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
                     connection={connection}
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

export default translate('actions')(AccountActionsResources);
