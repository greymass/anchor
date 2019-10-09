// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import ProducersVotingPreviewSelection from './Preview/Selection';
import GlobalUnlock from '../../../../containers/Global/Unlock';

class ProducersVotingPreview extends Component<Props> {
  render() {
    const {
      account,
      actions,
      blockExplorers,
      isProxying,
      isValidUser,
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
    if (!isValidUser) {
      return <GlobalUnlock style={{ marginTop: 0 }} />;
    }
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
          style: { marginTop: 0 }
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
        settings={settings}
        system={system}
        title={t('producer_voter_save_changes_r2')}
      />
    );
  }
}

export default translate('producers')(ProducersVotingPreview);
