// @flow
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeInputs from './Stake/Inputs';
import FormMessageTransactionSuccess from '../../../Global/Form/Message/TransactionSuccess';

import FormMessageError from '../../../Global/Form/Message/Error';

import { Decimal } from 'decimal.js';

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
    } = account.self_delegated_bandwidth;

    const parsed_cpu_weight = cpu_weight.split(' ')[0];
    const parsed_net_weight = net_weight.split(' ')[0];

    this.state = {
      cpuAmount: Decimal(parsed_cpu_weight),
      cpuOriginal: Decimal(parsed_cpu_weight),
      netAmount: Decimal(parsed_net_weight),
      netOriginal: Decimal(parsed_net_weight)
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
      cpuAmount,
      cpuOriginal,
      netAmount,
      netOriginal
    } = this.state;

    const EOSbalance = balance.EOS || 0;

    const lastTransactions = [];

    if (
      system.DELEGATEBW_LAST_TRANSACTION
      && system.DELEGATEBW_LAST_TRANSACTION.transaction_id
    ) {
      lastTransactions.push(system.DELEGATEBW_LAST_TRANSACTION);
    }

    if (
      system.UNDELEGATEBW_LAST_TRANSACTION
      && system.UNDELEGATEBW_LAST_TRANSACTION.transaction_id
    ) {
      lastTransactions.push(system.UNDELEGATEBW_LAST_TRANSACTION);
    }

    const shouldShowSuccess = (system.DELEGATEBW === 'SUCCESS' || system.UNDELEGATEBW === 'SUCCESS');
    const shouldShowError = (system.DELEGATEBW === 'FAILURE' || system.UNDELEGATEBW === 'FAILURE');
    const shouldShowForm = (validate.STAKE === 'NULL' || validate.STAKE === 'CONFIRMING') && !shouldShowSuccess && !shouldShowError;

    return (
      <Segment
        loading={system.DELEGATEBW === 'PENDING' ||
                 system.UNDELEGATEBW === 'PENDING'}
        style={{ minHeight: '100px' }}
      >
        {(shouldShowSuccess)
          ? (
            <FormMessageTransactionSuccess
              onClose={onClose}
              transactions={lastTransactions}
            />
          )
          : ''}

        {(shouldShowForm)
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
                cpuAmount={cpuAmount}
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netAmount={netAmount}
                netOriginal={netOriginal}
                onClose={onClose}
                validate={validate}
              />
            </div>
          ) : ''}

        {(shouldShowError)
          ? (
            <FormMessageError
              error={system.DELEGATEBW_LAST_ERROR ||
                     system.UNDELEGATEBW_LAST_ERROR}
              onClose={onClose}
            />
          ) : ''}
      </Segment>
    );
  }
}
