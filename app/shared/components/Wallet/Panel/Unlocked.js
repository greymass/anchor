// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';

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
              <WalletPanelFormNode
                onChange={this.onChange}
                validate={validate}
                value={settings.node}
              />
              {(keys.temporary)
                ? (
                  <WalletPanelButtonRemove
                    removeWallet={actions.removeWallet}
                  />
                )
                : (
                  <div>
                    <WalletPanelButtonRemove
                      removeWallet={actions.removeWallet}
                    />
                    <WalletPanelButtonLock
                      lockWallet={actions.lockWallet}
                    />
                  </div>
                )
              }
            </div>
          )
        }
      </I18n>
    );
  }
}
