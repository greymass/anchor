// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import ProducersVotingPreviewSelection from './Preview/Selection';

class ProducersVotingPreview extends Component<Props> {
  render() {
    const {
      account,
      actions,
      blockExplorers,
      isProxying,
      lastError,
      onClose,
      onConfirm,
      proxyingTo,
      selected,
      settings,
      submitting,
      system,
      t,
      unregisteredProducers
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="VOTEPRODUCER"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'green',
          content: (isProxying ? t('producer_voter_start_voting_after_proxying') : t('producer_voter_save_changes_r2')),
          fluid: true,
          icon: '',
          style: { marginTop: '1em' }
        }}
        content={(
          <ProducersVotingPreviewSelection
            account={account}
            isProxying={isProxying}
            lastError={lastError}
            onConfirm={onConfirm}
            proxyingTo={proxyingTo}
            selected={selected}
            settings={settings}
            submitting={submitting}
            unregisteredProducers={unregisteredProducers}
          />
        )}
        icon="exchange"
        onClose={onClose}
        title={t('producer_voter_save_changes_r2')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('producers')(ProducersVotingPreview);
