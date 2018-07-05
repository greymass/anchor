// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowDelegatebw extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;
    const {
      data
    } = action.action_trace.act;

    const stakeToCpuDescription = (data.stake_cpu_quantity !== '0.0000 EOS') ? (
      `${data.stake_cpu_quantity} ${t('actions_table_row_delegatebw_text_two')}`
    ) : '';

    const stakeToNetDescription = (data.stake_net_quantity !== '0.0000 EOS') ? (
      `${data.stake_net_quantity} ${t('actions_table_row_delegatebw_text_three')}`
    ) : '';

    const stakeConnector =
      (data.stake_cpu_quantity !== '0.0000 EOS' && data.stake_net_quantity !== '0.0000 EOS') ? (
        ` ${t('actions_table_row_text_and')} `
      ) : '';

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="microchip"
          size="large"
        />
        { `${t('actions_table_row_delegatebw_text_one')} ${stakeToCpuDescription}${stakeConnector}${stakeToNetDescription}.` }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowDelegatebw);
