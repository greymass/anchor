// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import DangerLink from '../../../Global/Modal/DangerLink';

export default class ProducersVotingPreviewSuccess extends Component<Props> {
  render() {
    const {
      lastTransaction,
      onClose
    } = this.props;
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment>
              <Header icon="checkmark" content={t('producer_voter_preview_transaction_successful_title')} />
              <Modal.Content>
                <h3>
                  {t('producer_voter_preview_transaction_successful_message')}
                </h3>
                <Segment basic padded textAlign="center">
                  <DangerLink
                    content={lastTransaction.transaction_id}
                    link={`http://eostracker.io/transactions/${lastTransaction.transaction_id}`}
                  />
                </Segment>
              </Modal.Content>
              <Modal.Actions>
                <Button color="green" onClick={onClose}>
                  <Icon name="checkmark" /> {t('producer_voter_preview_close')}
                </Button>
              </Modal.Actions>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
