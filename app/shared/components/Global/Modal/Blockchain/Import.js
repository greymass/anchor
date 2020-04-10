// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Header, Modal } from 'semantic-ui-react';

import GlobalBlockchainImport from '../../../../containers/Global/Blockchain/Import';

export class GlobalModalBlockchainImport extends Component<Props> {
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

export default withTranslation('global')(GlobalModalBlockchainImport);
