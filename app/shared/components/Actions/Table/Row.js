// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import DangerLink from '../../Global/Modal/DangerLink';

class ActionsTableRow extends Component<Props> {
  actionDescriptionFromAct(act) {
    const {
      t
    } = this.props;

    const iconStyle = {
      margin: '5px',
      marginRight: '20px',
      float: 'left',
      verticalAlign: 'top'
    };

    switch (act.name) {
      case 'refund': {
        return (
          <div>
            <Icon
              name="arrow circle up"
              size="large"
              style={iconStyle}
            />
            <div>
              { `${t('actions_refunded')}.` }
            </div>
          </div>
        );
      }
      case 'transfer': {
        return (
          <div>
            <Icon
              name="arrow circle up"
              size="large"
              style={iconStyle}
            />
            <div>
              { `${t('actions_transfered_before_amount')} ${act.data.quantity} ${t('actions_to')} ${act.data.to}.` }
            </div>
          </div>
        );
      }
      case 'delegatebw': {
        const stakeToCpuDescription = (act.data.stake_cpu_quantity !== '0.0000 EOS') ? (
          `${act.data.stake_cpu_quantity} ${t('actions_unstake_cpu_after_amount')}`
        ) : '';

        const stakeToNetDescription = (act.data.stake_net_quantity !== '0.0000 EOS') ? (
          `${act.data.stake_net_quantity} ${t('actions_unstake_net_after_amount')}`
        ) : '';

        const stakeConnector =
          (act.data.stake_cpu_quantity !== '0.0000 EOS' && act.data.stake_net_quantity !== '0.0000 EOS') ? (
            ` ${t('actions_and_statement')} `
          ) : '';

        return (
          <div>
            <Icon
              name="microchip"
              size="large"
              style={iconStyle}
            />
            <div>
              { `${t('actions_unstaked_before_amount')} ${stakeToCpuDescription}${stakeConnector}${stakeToNetDescription}.` }
            </div>
          </div>
        );
      }
      case 'undelegatebw': {
        const unstakeToCpuDescription = (act.data.unstake_cpu_quantity !== '0.0000 EOS') ? (
          `${act.data.unstake_cpu_quantity} ${t('actions_stake_cpu_after_amount')}`
        ) : '';

        const unstakeToNetDescription = (act.data.unstake_net_quantity !== '0.0000 EOS') ? (
          `${act.data.unstake_net_quantity} ${t('actions_stake_net_after_amount')}`
        ) : '';

        const unstakeConnector =
          (act.data.unstake_cpu_quantity !== '0.0000 EOS' && act.data.unstake_net_quantity !== '0.0000 EOS') ? (
            ` ${t('actions_and_statement')} `
          ) : '';

        return (
          <div>
            <Icon
              name="microchip"
              size="large"
              style={iconStyle}
            />
            <div>
              { `${t('actions_staked_before_amount')} ${unstakeToCpuDescription} ${unstakeConnector} ${unstakeToNetDescription}.` }
            </div>
          </div>
        );
      }
      case 'voteproducer': {
        const {
          data
        } = act;

        const {
          producers
        } = data;

        const producersInSentence =
          `${producers.slice(0, producers.length - 1).join(', ')} and ${producers.slice(-1)}`;

        return (
          <div>
            <Icon
              name="check square"
              size="large"
              style={iconStyle}
            />
            <div>
              { `${t('actions_voted')} ${producersInSentence}.` }
            </div>
          </div>
        );
      }
      default: {
        return null;
      }
    }
  }

  render() {
    const {
      actionObject,
      t
    } = this.props;

    const textStyle = {
      fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
      fontSize: '16'
    };

    return (
      <Table.Row style={{ height: '60px' }}>
        <Table.Cell
          width={6}
        >
          <p style={textStyle}>
            { this.actionDescriptionFromAct(actionObject.action_trace.act) }
          </p>
        </Table.Cell>
        <Table.Cell
          width={2}
        >
          <span>
            <TimeAgo date={actionObject.block_time} />
          </span>
        </Table.Cell>
        <Table.Cell
          width={2}
        >
          <DangerLink
            content={t('actions_link_content')}
            link={`https://eospark.com/MainNet/tx/${actionObject.action_trace.trx_id}`}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('actions')(ActionsTableRow);
