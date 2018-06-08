// @flow
import React, { Component } from 'react';
import { Icon, Segment } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeFailureMessage from './Stake/FailureMessage';
import WalletPanelFormStakeSuccessMessage from './Stake/SuccessMessage';
import WalletPanelFormStakeInputs from './Stake/Inputs';

type Props = {
  actions: {},
  account: {},
  balance: {},
  validate: {},
  system: {}
};

export default class WalletPanelFormStake extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { account } = props;
    const {
      cpu_weight,
      net_weight
    } = account.delegated_bandwidth;

    this.state = {
      cpuAmount: parseFloat(cpu_weight),
      cpuOriginal: parseFloat(cpu_weight),
      netAmount: parseFloat(net_weight),
      netOriginal: parseFloat(net_weight)
    };
  }

  render() {
    const {
      account,
      actions,
      balance,
      onClose,
      system,
      validate
    } = this.props;

    const {
      cpuOriginal,
      netOriginal
    } = this.state;

    const EOSbalance = balance.EOS || 0;

    return (
      <div>
        {(validate.STAKE === 'ERROR' || validate.STAKE === 'NULL' || validate.STAKE === 'CONFIRMING')
          ? (
            <div>
              <WalletPanelFormStakeStats
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netOriginal={netOriginal}
              />
              <WalletPanelFormStakeInputs
                actions={actions}
                account={account}
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netOriginal={netOriginal}
                onClose={onClose}
                validate={validate}
              />
            </div>
          )
          : ''
        }
        <WalletPanelFormStakeFailureMessage onClose={onClose} system={system} validate={validate} />
        <WalletPanelFormStakeSuccessMessage onClose={onClose} system={system} />
        {(system.DELEGATEBW === 'PENDING' || system.UNDELEGATEBW === 'PENDING')
          ? (
            <Segment basic textAlign="center">
              <Icon size="huge" loading name="spinner" />
            </Segment>
          )
          : ''
        }
      </div>
    );
  }
}
