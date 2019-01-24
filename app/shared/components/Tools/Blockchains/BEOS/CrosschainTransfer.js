// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Checkbox, Header, Icon, Message, Segment, Divider } from 'semantic-ui-react';

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

    if (!settings.acceptedCrosschainTransfers) {
      return (
        <Segment
          color="blue"
          content={(
            <React.Fragment>
              <Header>
                <Icon color="blue" name="info circle" />
                <Header.Content>
                  {t('tools_blockchains_beos_crosschaintransfer_accept_header')}
                  <Header.Subheader>
                    {t('tools_blockchains_beos_crosschaintransfer_accept_subheader')}
                  </Header.Subheader>
                </Header.Content>
              </Header>
              <p>
                {t('tools_blockchains_beos_crosschaintransfer_accept_body_1')}
              </p>
              <p>
                {t('tools_blockchains_beos_crosschaintransfer_accept_body_2')}
              </p>
              <p>
                {t('tools_blockchains_beos_crosschaintransfer_accept_body_3')}
              </p>
              <Checkbox
                label={t('tools_blockchains_beos_crosschaintransfer_instructions_understood')}
                onChange={() => this.props.actions.setSetting('acceptedCrosschainTransfers', true)}
              />
            </React.Fragment>
          )}
          padded
          secondary
          size="large"
          stacked
        />
      );
    }

    return ((keys && keys.key) || ['watch', 'ledger'].includes(settings.walletMode))
      ? (
        <React.Fragment>
          <Header>
            {t('tools_blockchains_beos_crosschaintransfer_header')}
          </Header>
          <Segment basic>
            <Message
              header={t('tools_blockchains_beos_crosschaintransfer_explain_header')}
              content={t('tools_blockchains_beos_crosschaintransfer_explain_content')}
            />
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
