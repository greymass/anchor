// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowTransfer extends Component<Props> {
  render() {
    const {
      action,
      settings,
      t
    } = this.props;
    const {
      data
    } = action.action_trace.act;
    console.log(action)
    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="arrow circle up"
          size="large"
        />
        {(data.to === settings.account)
          ? t('actions_table_row_transfer_received')
          : t('actions_table_row_transfer_sent')
        }
        {' '}
        <strong>
          {data.quantity}
        </strong>
        {' '}
        {(data.to === settings.account)
          ? `${t('actions_table_row_transfer_from')} ${data.from}`
          : `${t('actions_table_row_transfer_to')} ${data.to}`
        }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowTransfer);
