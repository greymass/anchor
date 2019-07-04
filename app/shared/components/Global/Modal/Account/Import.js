// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Modal, Tab } from 'semantic-ui-react';

import GlobalAccountImport from '../../../../containers/Global/Account/Import';

export class GlobalModalAccountImport extends Component<Props> {
  render() {
    const {
      onClose,
      open,
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
        <GlobalAccountImport onClose={onClose} />
      </Modal>
    );
  }
}

export default translate('global')(GlobalModalAccountImport);
