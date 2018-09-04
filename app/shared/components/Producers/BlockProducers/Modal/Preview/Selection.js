
// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Divider, Grid, Header, Icon, Message, Modal, Segment, Table } from 'semantic-ui-react';
import { chunk, last, times } from 'lodash';

import WalletMessageContractVoteProducer from '../../../../Global/Message/Contract/VoteProducer';

export default class ProducersVotingPreviewSelection extends Component<Props> {
  render() {
    const {
      lastError,
      onClose,
      onConfirm,
      selected,
      settings,
      submitting
    } = this.props;
    // Generate and chunk the rows into groups of 4 cells
    const rows = chunk(times(selected.length, i => (
      <Table.Cell key={i}>
        {selected[i]}
      </Table.Cell>
    )), 4);
    // Fill in any empty cells for the layout to render properly
    const lastRow = last(rows);
    if (lastRow && lastRow.length < 4) {
      times((4 - lastRow.length), i => {
        lastRow.push((
          <Table.Cell width={4} key={`blank-${i}`} />
        ));
      });
    }
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment loading={submitting}>
              <Header icon="alarm" content={t('producer_voter_preview_confirm_changes_title')} />
              <Modal.Content>
                <h3>
                  {t('producer_voter_preview_confirm_changes_message')}
                </h3>
                <Segment basic padded>
                  <Table celled>
                    <Table.Body>
                      {(selected.length > 0)
                        ? rows.map((row, i) => (
                          <Table.Row key={i}>{row}</Table.Row>
                        ))
                        : <Grid.Column textAlign="center" width={12}>{t('producer_voter_preview_confirm_none')}</Grid.Column>
                      }
                    </Table.Body>
                  </Table>
                </Segment>
                {(lastError)
                  ? (
                    <Message negative>
                      {(lastError.code)
                        ? (
                          <div>
                            <Message.Header>
                              {lastError.error.code}: {lastError.error.name}
                            </Message.Header>
                            <code>{lastError.error.what}</code>
                          </div>
                        )
                        : (
                          <div>
                            <Message.Header>
                              {t(['producer_voter_preview_error_title'])}
                            </Message.Header>
                            <code>{new String(lastError)}</code>
                          </div>
                        )
                      }
                    </Message>
                  )
                  : ''
                }
                <WalletMessageContractVoteProducer
                  data={{
                    signer: settings.account,
                    producers: selected.join(', '),
                    voter: settings.account
                  }}
                />
                <Divider />
                <Button
                  onClick={onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
                <Button
                  color="green"
                  floated="right"
                  onClick={onConfirm}
                >
                  <Icon name="checkmark" /> {t('producer_voter_preview_submit')}
                </Button>
              </Modal.Content>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
