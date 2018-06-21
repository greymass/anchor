// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ProducersVotingPreviewSelection from './Preview/Selection';

class ProducersVotingPreview extends Component<Props> {
  render() {
    const {
      actions,
      lastError,
      onConfirm,
      selected,
      settings,
      submitting,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="VOTEPRODUCER"
        actions={actions}
        button={{
          color: 'green',
          content: t('producer_voter_save_changes'),
          icon: ''
        }}
        content={(
          <ProducersVotingPreviewSelection
            lastError={lastError}
            onConfirm={onConfirm}
            selected={selected}
            submitting={submitting}
          />
        )}
        icon="exchange"
        title={t('producer_voter_save_changes')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('producers')(ProducersVotingPreview);
