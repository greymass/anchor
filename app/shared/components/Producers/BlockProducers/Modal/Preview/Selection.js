
// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Icon, Message, Segment, Modal, Header } from 'semantic-ui-react';
import { intersection } from 'lodash';
import { get } from 'dot-prop-immutable';

import WalletMessageContractVoteProducer from '../../../../Global/Message/Contract/VoteProducer';
import ProducersTable from './Selection/ProducersTable';
import checkForBeos from '../../../../helpers/checkCurrentBlockchain';
import JurisdictionsForm from '../../../../Wallet/Panel/Form/Jurisdictions';

class ProducersVotingPreviewSelection extends Component<Props> {
  render() {
    const {
      account,
      isProxying,
      lastError,
      onClose,
      onConfirm,
      proxyingTo,
      selected,
      settings,
      submitting,
      t,
      unregisteredProducers,
      jurisdictions,
      actions,
      connection
    } = this.props;

    let jurisdictionsForm = (<div />);

    if (checkForBeos(connection)) {
      jurisdictionsForm = (
        <React.Fragment>
          <Divider />
          <JurisdictionsForm
            actions={actions}
            jurisdictions={jurisdictions}
            label={t('producers_label_jurisdictions')}
          />
        </React.Fragment>
      );
    }

    const unregisteredProducersSelected = intersection(selected, unregisteredProducers);
    const registeredProducersSelected = selected.filter((producer) => !unregisteredProducersSelected.includes(producer))
    const removedProducers =
      ((account.voter_info && get(account, 'voter_info.producers')) || []).filter((producer) => !registeredProducersSelected.includes(producer));

    return (
      <Segment loading={submitting}>
        <Header icon="alarm" content={t('producer_voter_preview_confirm_changes_title')} />
        {isProxying && (
          <Message
            content={t('producer_voter_start_voting_after_proxying_warning', { proxyingTo })}
            icon="warning sign"
            warning
          />
        )}
        <Modal.Content>
          <Segment basic padded>
            <ProducersTable
              items={registeredProducersSelected}
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
          {(unregisteredProducersSelected.length !== 0) && (
            <Message
              header={t('producers_warning_unregistered_producers_header')}
              content={
                (unregisteredProducersSelected.length === 1) ?
                  t('producers_warning_have_unregistered_single', { unregisteredBp: unregisteredProducersSelected[0] }) :
                  t('producers_warning_have_unregistered_multiple', { unregisteredBps: unregisteredProducersSelected.join(', ') })
              }
              icon="warning sign"
              warning
            />
          )}
          <WalletMessageContractVoteProducer
            data={{
              signer: settings.account,
              producers: selected.join(', '),
              voter: settings.account
            }}
          />
          {jurisdictionsForm}
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
