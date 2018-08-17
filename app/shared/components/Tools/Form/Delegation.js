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
        cpuAmount: Decimal(cpu_weight.split(' ')[0]),
        netAmount: Decimal(net_weight.split(' ')[0])
      });
    } else if (delegationToRemove) {
      const {
        to: accountName
      } = delegationToRemove;

      this.setState({
        accountName,
        confirming: true,
        cpuAmount: '0.0000 EOS',
        netAmount: '0.0000 EOS'
      });
    }
  }

  render() {
    const {
      account,
      actions,
      balance,
      keys,
      onClose,
      settings,
      system,
      validate,
      wallet
    } = this.props;

    const {
      accountName,
      cpuAmount,
      confirming,
      cpuOriginal,
      netAmount,
      netOriginal
    } = this.state;

    return ((keys && keys.key) || settings.walletMode === 'watch')
      ? (
        <WalletPanelFormStake
          account={account}
          accountName={accountName}
          actions={actions}
          balance={balance}
          confirming={confirming}
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
