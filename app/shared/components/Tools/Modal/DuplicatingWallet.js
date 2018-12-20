// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormDuplicatingWalletForm from '../Form/DuplicatingWallet';
import { Dropdown, Header, Modal } from 'semantic-ui-react';

class ToolsModalDuplicatingWallet extends Component<Props> {
  render() {
    const {
      actions,
      blockchains,
      connection,
      duplicatingWallet,
      onClose,
      settings,
      system,
      t,
      wallets
    } = this.props;

    return (
      <Modal
        centered
        onClose={onClose}
        open
        size="small"
      >
        <Modal.Header>
          {t('tools_modal_duplicate_wallet')}
        </Modal.Header>
        <Modal.Content style={{minHeight: 150}}>
          <ToolsFormDuplicatingWalletForm
            actions={actions}
            blockchains={blockchains}
            duplicatingWallet={duplicatingWallet}
            onClose={onClose}
            settings={settings}
            system={system}
            wallets={wallets}
          />
        </Modal.Content>         
      </Modal>
    );
  }
}

export default translate('tools')(ToolsModalDuplicatingWallet);
