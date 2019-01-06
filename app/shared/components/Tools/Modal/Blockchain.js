// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Modal } from 'semantic-ui-react';

import GlobalBlockchainForm from '../../../containers/Global/Blockchain/Form';

class ToolsModalBlockchain extends Component<Props> {
  render() {
    const {
      blockchain,
      onClose,
      onSuccess,
      open,
      t,
      trigger
    } = this.props;

    return (
      <Modal
        centered={false}
        trigger={trigger}
        onClose={onClose}
        open={open}
      >
        <Header icon="cubes" content={t('tools_modal_blockchains_header_text')} />
        <Modal.Content>
          <GlobalBlockchainForm
            blockchain={blockchain}
            onCancel={onClose}
            onSubmit={onSuccess}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate('tools')(ToolsModalBlockchain);
