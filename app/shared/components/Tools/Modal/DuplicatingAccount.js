// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormDelegation from '../Form/Delegation';
import { Dropdown, Header, Modal } from 'semantic-ui-react';

class ToolsModalDuplicatingAccount extends Component<Props> {
  render() {
    const {
      account,
      actions,
      blockchains,
      connection,
      onClose,
      settings,
      t
    } = this.props;

    const {
      chainId,
      displayTestNetworks
    } = settings;

    const options = blockchains
      .filter(b => (
        (
          (displayTestNetworks && b.testnet)
          || !b.testnet
        )
        && b.chainId !== settings.chainId
      ))
      .sort((a, b) => a.name > b.name)
      .map((b) => {
        console.log({b})
        return {
          key: b.chainId,
          onClick: () => actions.swapBlockchain(b.chainId, account),
          text: `${b.name} ${(b.testnet ? '(TESTNET)' : '')}`,
          value: b.chainId
        };
      });

    return (
      <Modal
        centered
        onClose={onClose}
        open
        size="small"
      >
        <Modal.Header>
          {t('tools_modal_duplicate_account')}
        </Modal.Header>
        <Modal.Content style={{minHeight: 150}}>
          <Header
            content={t('tools_modal_duplicate_account_header_content')}
          />
          <Dropdown
            placeholder={t('tools_modal_duplicate_account_select_blockchain')}
            fluid
            selection
            options={options}
          />
        </Modal.Content>         
      </Modal>
    );
  }
}

export default translate('tools')(ToolsModalDuplicatingAccount);
