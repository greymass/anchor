// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Statistic } from 'semantic-ui-react';

class GlobalTransactionViewDetail extends Component<Props> {
  render() {
    const {
      t,
      transaction
    } = this.props;
    const {
      data,
    } = transaction;
    return (
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>
            {data.transaction.transaction.actions.length}
          </Statistic.Value>
          <Statistic.Label>Contract(s)</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            {data.transaction.transaction.actions.length}
          </Statistic.Value>
          <Statistic.Label>Action(s)</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    );
  }
}

export default translate('global')(GlobalTransactionViewDetail);
