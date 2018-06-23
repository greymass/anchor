// @flow
import React, { Component } from 'react';

import GlobalTransactionMessageError from './Message/Error';
import GlobalTransactionMessageSuccess from './Message/Success';
import GlobalTransactionMessageUnsigned from './Message/Unsigned';

type Props = {
  actionName: string,
  onClose: () => void,
  content: {},
  settings: {},
  system: {}
};

export default class GlobalTransactionHandler extends Component<Props> {
  render() {
    const {
      actionName,
      onClose,
      settings,
      system,
      transaction
    } = this.props;

    const hasTransaction = (transaction && transaction.transaction_id);
    const broadcastTransaction = (hasTransaction && ((transaction.broadcast) || (transaction.processed && transaction.processed.receipt.status === 'executed')));
    const hasError = (system[`${actionName}_LAST_ERROR`]);

    let { content } = this.props;

    if (broadcastTransaction) {
      content = (
        <GlobalTransactionMessageSuccess />
      );
    } else if (hasError) {
      content = (
        <GlobalTransactionMessageError
          error={system[`${actionName}_LAST_ERROR`]}
        />
      );
    } else if (hasTransaction && settings.walletMode === 'watch') {
      content = (
        <GlobalTransactionMessageUnsigned />
      );
    }

    return React.cloneElement(content, {
      onClose,
      transaction
    });
  }
}
