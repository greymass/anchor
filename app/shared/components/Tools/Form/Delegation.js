// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import WalletPanelLocked from '../../Wallet/Panel/Locked';
import WalletPanelFormStake from '../../Wallet/Panel/Form/Stake';

class ToolsFormDelegation extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      accountName: null,
      cpuAmount: null,
      cpuOriginal: Decimal(this.props.cpuAmount || 0),
      netAmount: null,
      netOriginal: Decimal(this.props.netAmount || 0),
    };
  }

  componentWillMount() {
    const {
      delegationToEdit,
      delegationToRemove
    } = this.props;

    if (delegationToEdit) {
      const {
        to: accountName,
        cpu_weight,
        net_weight
      } = delegationToEdit;

      this.setState({
        accountName,
        cpuAmount: Decimal(String(cpu_weight).split(' ')[0]),
        cpuOriginal: Decimal(String(cpu_weight).split(' ')[0]),
        netAmount: Decimal(String(net_weight).split(' ')[0]),
        netOriginal: Decimal(String(net_weight).split(' ')[0])
      });
    } else if (delegationToRemove) {
      const {
        to: accountName,
        cpu_weight,
        net_weight
      } = delegationToRemove;

      this.setState({
        accountName,
        confirming: true,
        cpuAmount: Decimal(0),
        cpuOriginal: Decimal(String(cpu_weight).split(' ')[0]),
        netAmount: Decimal(0),
        netOriginal: Decimal(String(net_weight).split(' ')[0])
      });
    }
  }

  render() {
    const {
      account,
      actions,
      balance,
      connection,
      pubkeys,
      onClose,
      settings,
      system,
      validate,
      wallet
    } = this.props;

    const {
      accountName,
      cpuAmount,
      cpuOriginal,
      confirming,
      netAmount,
      netOriginal
    } = this.state;

    return (pubkeys.unlocked.includes(wallet.pubkey) || ['watch', 'ledger'].includes(settings.walletMode))
      ? (
        <WalletPanelFormStake
          account={account}
          accountName={accountName}
          actions={actions}
          balance={balance}
          confirming={confirming}
          connection={connection}
          cpuAmount={cpuAmount}
          cpuOriginal={cpuOriginal}
          netAmount={netAmount}
          netOriginal={netOriginal}
          onBack={this.onBack}
          onClose={onClose}
          onConfirm={this.onConfirm}
          system={system}
        />
      ) : (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
  }
}

export default translate('tools')(ToolsFormDelegation);
