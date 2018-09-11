// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowUndelegatebw extends Component<Props> {
  render() {
    const {
      action,
      t,
      connection
    } = this.props;
    const {
      data
    } = action.action_trace.act;
    
    const zeroBalance = '0.0000 ' + connection.keyPrefix;

    const unstakeToCpuDescription = (data.unstake_cpu_quantity !== zeroBalance) ? (
      `${data.unstake_cpu_quantity} ${t('actions_table_row_undelegatebw_text_two')}`
    ) : '';

    const unstakeToNetDescription = (data.unstake_net_quantity !== zeroBalance) ? (
      `${data.unstake_net_quantity} ${t('actions_table_row_undelegatebw_text_three')}`
    ) : '';

    const unstakeConnector =
      (data.unstake_cpu_quantity !== zeroBalance && data.unstake_net_quantity !== zeroBalance) ? (
        ` ${t('actions_table_row_text_and')} `
      ) : '';

    let onAccount = '';

    if (data.from !== data.receiver) {
      onAccount = ` ${t('actions_table_row_on_account')} ${data.receiver}`;
    }

    const sentence = `${t('actions_table_row_undelegatebw_text_one')} ${unstakeToCpuDescription} ${unstakeConnector} ${unstakeToNetDescription}${onAccount}.`;

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="microchip"
          size="large"
        />
        { sentence }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowUndelegatebw);
