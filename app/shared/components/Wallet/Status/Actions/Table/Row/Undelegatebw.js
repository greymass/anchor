// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowUndelegatebw extends Component<Props> {
  render() {
    const {
      data,
      t
    } = this.props;

    const iconStyle = {
      margin: '5px',
      marginRight: '20px',
      float: 'left',
      verticalAlign: 'top'
    };

    const unstakeToCpuDescription = (data.unstake_cpu_quantity !== '0.0000 EOS') ? (
      `${data.unstake_cpu_quantity} ${t('actions_table_row_undelegatebw_text_two')}`
    ) : '';

    const unstakeToNetDescription = (data.unstake_net_quantity !== '0.0000 EOS') ? (
      `${data.unstake_net_quantity} ${t('actions_table_row_undelegatebw_text_three')}`
    ) : '';

    const unstakeConnector =
      (data.unstake_cpu_quantity !== '0.0000 EOS' && data.unstake_net_quantity !== '0.0000 EOS') ? (
        ` ${t('actions_table_row_and_text')} `
      ) : '';

    return (
      <div>
        <Icon
          name="microchip"
          size="large"
          style={iconStyle}
        />
        <div>
          { `${t('actions_table_row_undelegatebw_text_one')} ${unstakeToCpuDescription} ${unstakeConnector} ${unstakeToNetDescription}.` }
        </div>
      </div>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowUndelegatebw);
