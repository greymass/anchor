// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowDelegatebw extends Component<Props> {
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
      <div>
        <Icon
          name="microchip"
          size="large"
          style={iconStyle}
        />
        <div>
          { `${t('actions_table_row_delegatebw_text_one')} ${stakeToCpuDescription}${stakeConnector}${stakeToNetDescription}.` }
        </div>
      </div>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowDelegatebw);
