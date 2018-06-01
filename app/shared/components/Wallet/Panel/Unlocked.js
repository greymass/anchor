// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletPanelFormNode from './Form/Node';
import WalletPanelButtonLock from './Button/Lock';
import WalletPanelButtonRemove from './Button/Remove';
import WalletPanelButtonStake from './Button/Stake';

export default class WalletPanelLocked extends Component<Props> {
  render() {
    const {
      actions,
      accounts,
      balances,
      keys,
      validate,
      settings,
      system
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
                    <WalletPanelButtonStake
                      actions={actions}
                      accounts={accounts}
                      balances={balances}
                      validate={validate}
                      settings={settings}
                      system={system}
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
