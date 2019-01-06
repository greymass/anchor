
// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Icon, Message, Segment, Modal, Header } from 'semantic-ui-react';
import { intersection } from 'lodash';

import WalletMessageContractVoteProducer from '../../../../Global/Message/Contract/VoteProducer';
import ProducersTable from './Selection/ProducersTable';

class ProducersVotingPreviewSelection extends Component<Props> {
  render() {
    const {
      account,
      lastError,
      onClose,
      onConfirm,
      selected,
      settings,
      submitting,
      t,
      unregisteredProducers
    } = this.props;
    const unregisteredProducersSelected = intersection(selected, unregisteredProducers);
    const removedProducers =
      account.voter_info.producers.filter((producer) => !selected.includes(producer));

    return (
      <Segment loading={submitting}>
        <Header icon="alarm" content={t('producer_voter_preview_confirm_changes_title')} />
        <Modal.Content>
          <Segment basic padded>
            <ProducersTable
              items={selected}
            />
          </Segment>
          {removedProducers.length !== 0 && (
            <React.Fragment>
              <h3>
                {t('producers_voter_preview_confirm_unselected')}
              </h3>
              <Segment basic padded>
                <ProducersTable
                  items={removedProducers}
                />
              </Segment>
            </React.Fragment>
          )}
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
          {(unregisteredProducersSelected.length !== 0) && (
            <Message
              content={
                (unregisteredProducersSelected.length === 1) ?
                  t('producers_warning_have_unregistered_single', { unregisteredBp: unregisteredProducersSelected[0] }) :
                  t('producers_warning_have_unregistered_multiple', { unregisteredBps: unregisteredProducersSelected.join(', ') })
              }
              warning
            />
          )}
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
    );
  }
}
export default translate('producers')(ProducersVotingPreviewSelection);
