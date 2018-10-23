// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Divider, Header, Segment } from 'semantic-ui-react';

import GlobalTransactionViewActions from '../../../Transaction/View/Actions';
import GlobalTransactionViewDetail from '../../../Transaction/View/Detail';
import GlobalTransactionViewFull from '../../../Transaction/View/Full';

class GlobalTransactionMessageSignedBroadcast extends Component<Props> {
  broadcast = () => {
    const {
      actionname,
      actions,
      transaction
    } = this.props;
    const {
      broadcastTransaction
    } = actions;
    broadcastTransaction(transaction, actionname);
  }
  render() {
    const {
      onClose,
      t,
      transaction
    } = this.props;

    let actions = [];
    if (transaction && transaction.transaction) {
      ({ actions } = transaction.transaction.transaction);
    }
    const signed = (transaction.transaction.signatures.length > 0);
    return (
      <Segment basic>
        {(transaction)
          ? (
            <React.Fragment>
              <Header>
                {t('broadcast_transaction_confirm_details_title')}
                <Header.Subheader>
                  {t('broadcast_transaction_confirm_details_content')}
                </Header.Subheader>
              </Header>
              <GlobalTransactionViewDetail
                broadcastable={signed}
                signed={signed}
                transaction={{ data: transaction }}
              />
              <Container textAlign="center">
                <Button
                  color="purple"
                  content={t('broadcast_transaction_broadcast')}
                  icon="wifi"
                  onClick={this.broadcast}
                  size="large"
                />
                <Button
                  color="grey"
                  content={t('close')}
                  icon="x"
                  onClick={onClose}
                  size="large"
                />
              </Container>
              <Segment>
                <GlobalTransactionViewActions
                  actions={actions}
                />
                <Divider />
                <GlobalTransactionViewFull
                  transaction={transaction}
                />
              </Segment>
            </React.Fragment>
          )
          : (
            <Header>
              {t('broadcast_transaction_no_details_title')}
              <Header.Subheader>
                {t('broadcast_transaction_no_details_content')}
              </Header.Subheader>
            </Header>
          )
        }
      </Segment>
    );
  }
}

export default translate('transaction')(GlobalTransactionMessageSignedBroadcast);
