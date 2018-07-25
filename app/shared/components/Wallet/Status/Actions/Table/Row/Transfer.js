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
    return (
      <React.Fragment>
        <Icon
          floated="left"
          name={`arrow circle ${data.to === settings.account ? 'down' : 'up'}`}
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
        {(data.memo)
          ? <p>{t('actions_table_row_transfer_memo')}: {data.memo}</p>
          : false
        }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowTransfer);
