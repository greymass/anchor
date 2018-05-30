
// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Divider, Grid, Header, Icon, Message, Modal, Segment } from 'semantic-ui-react';
import times from 'lodash/times';

export default class ProducersVotingPreviewSelection extends Component<Props> {
  render() {
    const {
      lastError,
      onClose,
      onConfirm,
      selected,
      submitting
    } = this.props;
    const columns = times(selected.length, i => (
      <Grid.Column width={4} key={i}>
        {selected[i]}
      </Grid.Column>
    ));
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment loading={submitting}>
              <Header icon="alarm outline" content={t('producer_voter_preview_confirm_changes_title')} />
              <Modal.Content>
                <h3>
                  {t('producer_voter_preview_confirm_changes_message')}
                </h3>
                <Segment basic padded>
                  <Grid celled>{columns}</Grid>
                </Segment>
                {(lastError)
                  ? (
                    <Message negative>
                      <Message.Header>{t(['producer_voter_preview_error_title'])}</Message.Header>
                      <code>{lastError}</code>
                    </Message>
                  )
                  : ''
                }
                <Divider />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
                <Button color="green" onClick={onConfirm}>
                  <Icon name="checkmark" /> {t('producer_voter_preview_submit')}
                </Button>
              </Modal.Actions>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
