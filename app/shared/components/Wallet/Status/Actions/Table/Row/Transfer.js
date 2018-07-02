// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowTransfer extends Component<Props> {
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

    return (
      <div>
        <Icon
          name="arrow circle up"
          size="large"
          style={iconStyle}
        />
        <div>
          {`${t('actions_table_row_transfer_text_one')} ${data.quantity} ${t('actions_table_row_transfer_text_two')} ${data.to}.`}
        </div>
      </div>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowTransfer);

