// @flow
import React, { Component } from 'react';

import GlobalTransactionMessageError from './Message/Error';
import GlobalTransactionMessageSuccess from './Message/Success';
import GlobalTransactionMessageUnsignedSign from './Message/Unsigned/Sign';
import GlobalTransactionMessageUnsignedDownload from './Message/Unsigned/Download';

type Props = {
  actionName: string,
  blockExplorers: {},
  onClose: () => void,
  content: {},
  settings: {},
  system: {}
};

export default class GlobalTransactionHandler extends Component<Props> {
  render() {
    const {
      actionName,
      actions,
      blockExplorers,
      contract,
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
        <GlobalTransactionMessageSuccess
          blockExplorers={blockExplorers}
          settings={settings}
        />
      );
    } else if (hasError) {
      content = (
        <GlobalTransactionMessageError
          error={system[`${actionName}_LAST_ERROR`]}
        />
      );
    } else if (hasTransaction && settings.walletMode !== 'watch') {
      content = (
        <GlobalTransactionMessageUnsignedSign />
      );
    } else if (hasTransaction && settings.walletMode === 'watch') {
      content = (
        <GlobalTransactionMessageUnsignedDownload />
      );
    }

    return React.cloneElement(content, {
      actions,
      contract,
      onClose,
      transaction
    });
  }
}
