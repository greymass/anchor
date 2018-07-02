// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import DangerLink from '../../../../Global/Modal/DangerLink';

class WalletStatusActionsTableRow extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;

    const textStyle = {
      fontSize: '16'
    };

    const rowComponentsMapping = {
      transfer: 'WalletStatusActionTableRowTransfer',
      delegatebw: 'WalletStatusActionTableRowDelegatebw',
      refund: 'WalletStatusActionTableRowRefund',
      undelegatebw: 'WalletStatusActionTableRowUndelegatebw',
      voteproducer: 'WalletStatusActionTableRowVoteproducer'
    };

    return (
      <Table.Row style={{ height: '60px' }}>
        <Table.Cell
          width={6}
        >
          <div style={textStyle}>
            { rowComponentsMapping[action.action_trace.act.name] }
          </div>
        </Table.Cell>
        <Table.Cell
          width={2}
        >
          <span>
            <TimeAgo date={`${action.block_time}z`} />
          </span>
        </Table.Cell>
        <Table.Cell
          width={2}
        >
          <DangerLink
            content={t('actions_link_content')}
            link={`https://eospark.com/MainNet/tx/${action.action_trace.trx_id}`}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRow);
