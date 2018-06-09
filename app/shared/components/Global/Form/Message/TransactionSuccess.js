// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Message, Modal, Segment } from 'semantic-ui-react';

import DangerLink from '../../../Global/Modal/DangerLink';

class FormMessageTransactionSuccess extends Component<Props> {
  render() {
    const {
      onClose,
      t,
      transaction
    } = this.props;
    return (
      <Segment basic>
        <Header
          content={t('global_transaction_complete_title')}
          icon="checkmark"
          size="large"
        />
        <Modal.Content>
          <p>{t('global_transaction_complete_message')}</p>
          <Segment padded textAlign="center">
            <DangerLink
              content={transaction.transaction_id}
              link={`http://eostracker.io/transactions/${transaction.transaction_id}`}
            />
            (link to eostracker.io)
          </Segment>
          <Message
            icon
            size="large"
            warning
          >
            <Icon
              loading
              name="circle notched"
            />
            <Message.Content>
              <Message.Header>{t('global_transaction_complete_warning_title')}</Message.Header>
              {t('global_transaction_complete_warning_message')}
            </Message.Content>
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Segment basic clearing>
            <Button color="green" floated="right" onClick={onClose}>
              <Icon name="checkmark" /> {t('close')}
            </Button>
          </Segment>
        </Modal.Actions>
      </Segment>

    );
  }
}

export default translate('global')(FormMessageTransactionSuccess);
