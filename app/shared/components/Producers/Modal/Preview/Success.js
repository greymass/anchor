// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import ExplorerLink from '../../../Global/Modal/ExplorerLink';

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
                  <ExplorerLink
                    blockExplorer={blockExplorer}
                    content={lastTransaction.transaction_id}
                    linkData={lastTransaction.transaction_id}
                    linkType="tx"
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
