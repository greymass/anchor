// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletPanelFormNode from './Form/Node';
import WalletPanelButtonLock from './Button/Lock';
import WalletPanelButtonRemove from './Button/Remove';

export default class WalletPanelLocked extends Component<Props> {
  render() {
    const {
      actions,
      keys,
      validate,
      settings
    } = this.props;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              {(keys.temporary)
                ? (
                  <WalletPanelButtonRemove
                    removeWallet={actions.removeWallet}
                  />
                )
                : (
                  <Button.Group vertical>
                    <WalletPanelButtonLock
                      lockWallet={actions.lockWallet}
                    />
                    <WalletPanelButtonRemove
                      removeWallet={actions.removeWallet}
                    />
                  </Button.Group>
                )
              }
            </div>
          )
        }
      </I18n>
    );
  }
}
