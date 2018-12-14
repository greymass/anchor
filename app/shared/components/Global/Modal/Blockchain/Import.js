// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Modal, Tab } from 'semantic-ui-react';

import GlobalBlockchainImport from '../../../../containers/Global/Blockchain/Import';

class GlobalModalBlockchainImport extends Component<Props> {
  render() {
    const {
      onClose,
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
        size="small"
      >
        <Header
          content={t('global_button_blockchain_import_action')}
          icon="users"
          subheader={t('global_button_blockchain_import_action')}
        />
        <GlobalBlockchainImport onClose={onClose} />
      </Modal>
    );
  }
}

export default translate('global')(GlobalModalBlockchainImport);
