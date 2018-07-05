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

const rowComponentsMapping = {
  transfer: WalletStatusActionTableRowTransfer,
  delegatebw: WalletStatusActionTableRowDelegatebw,
  refund: WalletStatusActionTableRowRefund,
  undelegatebw: WalletStatusActionTableRowUndelegatebw,
  voteproducer: WalletStatusActionTableRowVoteproducer
};

class WalletStatusActionsTableRow extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      action
    } = this.props;

    const {
      act
    } = action.action_trace;

    this.state = {
      ComponentType: rowComponentsMapping[act.name] || WalletStatusActionTableRowGeneric,
      generic: !(rowComponentsMapping[act.name])
    };
  }
  render() {
    const {
      action,
      chain,
      settings,
      t
    } = this.props;
    const {
      ComponentType,
      generic
    } = this.state;
    const {
      receipt
    } = action.action_trace;
    // Filter out duplicate actions
    if ([settings.account, 'eosio'].indexOf(receipt.receiver) === -1) {
      return false;
    }
    return (
      <Table.Row style={{ height: '60px' }}>
        <Table.Cell
          colSpan={(generic) ? 3 : 1}
          width={(generic) ? 16 : 10}
        >
          <ComponentType
            action={action}
            chain={chain}
            settings={settings}
          />
        </Table.Cell>
        {(!generic)
          ? (
            <React.Fragment>
              <Table.Cell
                width={3}
              >
                <TimeAgo date={`${action.block_time}z`} />
              </Table.Cell>
              <Table.Cell
                width={3}
              >
                <DangerLink
                  content={t('actions_link_content')}
                  link={`https://eospark.com/MainNet/tx/${action.action_trace.trx_id}`}
                />
              </Table.Cell>
            </React.Fragment>
          )
          : false
        }
      </Table.Row>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRow);
