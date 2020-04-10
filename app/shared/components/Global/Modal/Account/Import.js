// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Modal } from 'semantic-ui-react';

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
      >
        <GlobalAccountImport onClose={onClose} />
      </Modal>
    );
  }
}

export default withTranslation('global')(GlobalModalAccountImport);
