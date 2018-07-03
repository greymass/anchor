// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import DangerLink from '../../../../Global/Modal/DangerLink';

import WalletStatusActionTableRowTransfer from './Row/Transfer';
import WalletStatusActionTableRowDelegatebw from './Row/Delegatebw';
import WalletStatusActionTableRowRefund from './Row/Refund';
import WalletStatusActionTableRowUndelegatebw from './Row/Undelegatebw';
import WalletStatusActionTableRowVoteproducer from './Row/Voteproducer';
import WalletStatusActionTableRowGeneric from './Row/Generic';

class WalletStatusActionsTableRow extends Component<Props> {
  generateDescriptionComponent() {
    const {
      action
    } = this.props;

    const {
      action_trace
    } = action;

    const {
      act
    } = action_trace;

    const {
      data
    } = act;

    const rowComponentsMapping = {
      transfer: WalletStatusActionTableRowTransfer,
      delegatebw: WalletStatusActionTableRowDelegatebw,
      refund: WalletStatusActionTableRowRefund,
      undelegatebw: WalletStatusActionTableRowUndelegatebw,
      voteproducer: WalletStatusActionTableRowVoteproducer
    };

    const DescComponent = rowComponentsMapping[act.name] || WalletStatusActionTableRowGeneric;

    return <DescComponent act={act} data={data} />;
  }
  render() {
    const {
      action,
      t
    } = this.props;

    const textStyle = {
      fontSize: '16'
    };

    return (
      <Table.Row style={{ height: '60px' }}>
        <Table.Cell
          width={6}
        >
          <div style={textStyle}>
            {this.generateDescriptionComponent()}
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
