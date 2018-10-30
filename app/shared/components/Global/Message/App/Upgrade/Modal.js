// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Modal } from 'semantic-ui-react';

import GlobalMessageAppUpgrade from '../Upgrade';

class GlobalMessageAppUpgradeModal extends Component<Props> {
  render() {
    const {
      actions,
      constants,
      name,
      version
    } = this.props;
    return (
      <Modal
        content={(
          <GlobalMessageAppUpgrade
            actions={actions}
            constants={constants}
            name={name}
            version={version}
          />
        )}
        open
        size="small"
      />
    );
  }
}

export default translate('global')(GlobalMessageAppUpgradeModal);
