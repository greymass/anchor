// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Container, Divider, Header, Segment } from 'semantic-ui-react';

import GlobalTransactionViewActions from '../../../Transaction/View/Actions';
import GlobalTransactionViewDetail from '../../../Transaction/View/Detail';
import GlobalTransactionViewFull from '../../../Transaction/View/Full';

export class GlobalTransactionMessageSignedBroadcast extends Component<Props> {
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
  };
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
    // console.log(this)
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

export default withTranslation('transaction')(GlobalTransactionMessageSignedBroadcast);
