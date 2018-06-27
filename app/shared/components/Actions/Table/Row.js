// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, Table } from 'semantic-ui-react';

import DangerLink from '../../Global/Modal/DangerLink';

class ActionsTableRow extends Component<Props> {
  actionDescriptionFromAct(act) {
    const {
      t
    } = this.props;

    switch (act.name) {
      case 'transfer': {
        return (
          <p>
            <Icon
              name="arrow circle up"
            />
            { `${t('actions_transfered_before_amount')} ${act.data.quantity} ${t('actions_to')} ${act.data.to}.` }
          </p>
        );
      }
      case 'delegatbw': {
        return (
          <p>
            <Icon
              name="microchip"
            />
            { `${t('actions_staked_before_amount')} ${act.data.quantity}.` }
          </p>
        );
      }
      case 'undelegatbw': {
        return (
          <p>
            <Icon
              name="microchip"
            />
            { `${t('actions_unstaked_before_amount')} ${act.data.quantity}.` }
          </p>
        );
      }
      case 'voteproducer': {
        return (
          <p>
            <Icon
              name="check square"
            />
            { `${t('actions_voted')} ${act.data.producers.join(', ')}.` }
          </p>
        );
      }
      default: {
        debugger
        return null;
      }
    }
  }

  render() {
    const {
      actionObject,
      t
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell
          width={5}
        >
          <span styles={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace' }}>
            { this.actionDescriptionFromAct(actionObject.action_trace.act) }
          </span>
        </Table.Cell>
        <Table.Cell
          width={2}
        >
          <span>
            {actionObject.block_time}
          </span>
        </Table.Cell>
        <Table.Cell
          width={3}
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
