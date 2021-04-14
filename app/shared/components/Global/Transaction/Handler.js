// @flow
import React, { Component } from 'react';
import { includes } from 'lodash';

import GlobalTransactionMessageError from './Message/Error';
import GlobalTransactionMessageSuccess from './Message/Success';
import GlobalTransactionMessageHardwareLedger from './Message/Hardware/Ledger';
import GlobalTransactionMessageSignedBroadcast from './Message/Signed/Broadcast';
import GlobalTransactionMessageUnsignedSign from './Message/Unsigned/Sign';
import GlobalTransactionMessageUnsignedDownload from './Message/Unsigned/Download';

export default class GlobalTransactionHandler extends Component<Props> {
  componentWillUnmount = () => {
    const { clearSystemState } = this.props.actions;
    if (clearSystemState) {
      clearSystemState();
    }
  };

  render() {
    let {
      actionName,
    } = this.props;
    const {
      actions,
      blockExplorers,
      contract,
      hideClose,
      onClose,
      onSubmit,
      settings,
      system,
      transaction
    } = this.props;

    const awaitingDevice = !!(system[`${actionName}_AWAITING_DEVICE`]);
    const hasSignature = !!(transaction && transaction.transaction && transaction.transaction.signatures && transaction.transaction.signatures.length > 0);
    const hasTransaction = !!(transaction && transaction.transaction && transaction.transaction.transaction_id);
    const broadcastTransaction = !!(hasTransaction && ((transaction.broadcast) || (transaction.processed && transaction.processed.receipt.status === 'executed')));
    let hasError = (system[`${actionName}_LAST_ERROR`]);
    if (
      !hasError
      && actionName === 'TRANSACTION_BUILD'
      && system.TRANSACTION_BROADCAST_LAST_ERROR
    ) {
      hasError = true;
      actionName = 'TRANSACTION_BROADCAST';
    }

    let { content } = this.props;

    if (!awaitingDevice && broadcastTransaction) {
      content = (
        <GlobalTransactionMessageSuccess
          blockExplorers={blockExplorers}
          settings={settings}
          hideClose={hideClose}
        />
      );
    } else if (hasError) {
      content = (
        <GlobalTransactionMessageError
          error={system[`${actionName}_LAST_ERROR`]}
          onClose={onClose}
        />
      );
    } else if (hasTransaction && !hasSignature && !includes(['watch', 'ledger'], settings.walletMode)) {
      content = (
        <GlobalTransactionMessageUnsignedSign />
      );
    } else if (hasTransaction && settings.walletMode === 'watch') {
      content = (
        <GlobalTransactionMessageUnsignedDownload
          contract={contract}
          settings={settings}
        />
      );
    } else if (awaitingDevice && settings.walletMode === 'ledger') {
      content = (
        <GlobalTransactionMessageHardwareLedger />
      );
    } else if (hasTransaction && hasSignature && !broadcastTransaction && !awaitingDevice) {
      content = (
        <GlobalTransactionMessageSignedBroadcast />
      );
    }

    // console.table({
    //   actionName,
    //   awaitingDevice,
    //   broadcastTransaction,
    //   hasTransaction,
    //   mode: settings.walletMode,
    // });

    return React.cloneElement(content, {
      actionname: actionName.toString(),
      actions,
      contract,
      onClose,
      onSubmit,
      transaction: Object.assign({}, transaction)
    });
  }
}
