
// @flow
import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import ProducersVotingPreviewSelection from './Preview/Selection';
import ProducersVotingPreviewSuccess from './Preview/Success';

export default class ProducersVotingPreview extends Component<Props> {
  render() {
    const {
      lastError,
      lastTransaction,
      open,
      onClose,
      onConfirm,
      selected,
      submitting
    } = this.props;

    const hasTransaction = (lastTransaction && lastTransaction.transaction_id);
    const hasError = (lastError);
    return (
      <Modal
        centered={false}
        open={open}
        onClose={onClose}
        size="small"
      >
        {(hasTransaction && !hasError)
          ? (
            <ProducersVotingPreviewSuccess
              lastTransaction={lastTransaction}
              onClose={onClose}
            />
          )
          : (
            <ProducersVotingPreviewSelection
              lastError={lastError}
              onClose={onClose}
              onConfirm={onConfirm}
              selected={selected}
              submitting={submitting}
            />
          )
        }
      </Modal>
    );
  }
}
