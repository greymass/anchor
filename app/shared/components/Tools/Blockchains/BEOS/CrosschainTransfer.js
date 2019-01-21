// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Segment, Divider } from 'semantic-ui-react';

import WalletPanelButtonCrosschainTransfer from '../../../Wallet/Panel/Button/CrosschainTransfer'; // TODO: Move to blockchain specific folder
import WalletPanelLocked from '../../../Wallet/Panel/Locked';

class ToolsBlockchainsBEOSCrosschainTransfer extends Component<Props> {
  render() {
    const {
      actions,
      balances,
      blockchains,
      blockExplorers,
      connection,
      keys,
      settings,
      system,
      transaction,
      validate,
      wallet,
      t,
    } = this.props;
    return ((keys && keys.key) || ['watch', 'ledger'].includes(settings.walletMode))
      ? (
        <React.Fragment>
          <Header>
            {t('tools_blockchains_beos_crosschaintransfer_header')}
          </Header>
          <Segment basic>
            test
            <Divider />
            <WalletPanelButtonCrosschainTransfer
              actions={actions}
              balances={balances}
              blockchains={blockchains}
              blockExplorers={blockExplorers}
              connection={connection}
              settings={settings}
              system={system}
              transaction={transaction}
            />
          </Segment>
        </React.Fragment>
      )
      : (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
  }
}

export default translate('tools')(ToolsBlockchainsBEOSCrosschainTransfer);
