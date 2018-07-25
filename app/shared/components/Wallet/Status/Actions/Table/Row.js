// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import ExplorerLink from '../../../../Global/Modal/ExplorerLink';

import WalletStatusActionsTableRowNewaccount from './Row/Newaccount';
import WalletStatusActionTableRowBuyram from './Row/Buyram';
import WalletStatusActionTableRowClaimrewards from './Row/Claimrewards';
import WalletStatusActionTableRowDelegatebw from './Row/Delegatebw';
import WalletStatusActionTableRowGeneric from './Row/Generic';
import WalletStatusActionTableRowRefund from './Row/Refund';
import WalletStatusActionTableRowRegproxy from './Row/Regproxy';
import WalletStatusActionTableRowSellram from './Row/Sellram';
import WalletStatusActionTableRowTransfer from './Row/Transfer';
import WalletStatusActionTableRowUndelegatebw from './Row/Undelegatebw';
import WalletStatusActionTableRowVoteproducer from './Row/Voteproducer';

const rowComponentsMapping = {
  buyram: WalletStatusActionTableRowBuyram,
  buyrambytes: WalletStatusActionTableRowBuyram,
  claimrewards: WalletStatusActionTableRowClaimrewards,
  delegatebw: WalletStatusActionTableRowDelegatebw,
  newaccount: WalletStatusActionsTableRowNewaccount,
  refund: WalletStatusActionTableRowRefund,
  regproxy: WalletStatusActionTableRowRegproxy,
  sellram: WalletStatusActionTableRowSellram,
  transfer: WalletStatusActionTableRowTransfer,
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
      blockExplorers,
      chain,
      settings
    } = this.props;
    const {
      ComponentType,
      generic
    } = this.state;
    const {
      receipt,
      trx_id
    } = action.action_trace;
    // Filter out duplicate actions returned by API
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
            blockExplorers={blockExplorers}
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
                <ExplorerLink
                  blockExplorer={blockExplorers[settings.blockExplorer] || blockExplorers[0]}
                  content={`${trx_id.substr(0, 4)}...${trx_id.substr(-4)}`}
                  linkData={action.action_trace.trx_id}
                  linkType="txid"
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
