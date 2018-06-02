// @flow
import React, { Component } from 'react';
import { Icon, Segment } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeFailureMessage from './Stake/FailureMessage';
import WalletPanelFormStakeSuccessMessage from './Stake/SuccessMessage';
import WalletPanelFormStakeSliders from './Stake/Sliders';

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

    this.state = {
      cpuAmount: account.coins_staked_to_cpu,
      cpuOriginal: account.coins_staked_to_cpu,
      netAmount: account.coins_staked_to_net,
      netOriginal: account.coins_staked_to_net
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
        {(validate.STAKE === 'ERROR' || validate.STAKE === 'NULL')
          ? (
            <div>
              <WalletPanelFormStakeStats
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netOriginal={netOriginal}
              />
              <WalletPanelFormStakeSliders
                actions={actions}
                account={account}
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netOriginal={netOriginal}
                onClose={onClose}
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
