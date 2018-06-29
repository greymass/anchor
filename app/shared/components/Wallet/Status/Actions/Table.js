// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Segment, Transition, Table } from 'semantic-ui-react';

import ActionsTableRow from './Table/Row';

class WalletStatusActionsTable extends Component<Props> {
  render() {
    const {
      amount,
      actionObjects,
      settings,
      t
    } = this.props;

    const loading = (actionObjects.list.length < 1);
    let baseTable = <Table.Body />;
    if (!loading) {
      const fullResults = actionObjects.list.slice(0, amount);
      baseTable = (
        <Table.Body key="FullResults">
          {fullResults.map((actionObject) => (
            <ActionsTableRow
              actionObject={actionObject}
              key={actionObject.account_action_seq}
              settings={settings}
            />
          ))}
        </Table.Body>
      );
    }
    return (
      <Segment basic loading={loading} vertical>
        <Table
          color="violet"
          size="small"
          striped
          style={{ borderRadius: 0 }}
          unstackable
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>
                {t('actions_name')}
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>
                {t('actions_time')}
              </Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          <Transition animation="slide down" duration={200}>
            {baseTable}
          </Transition>
        </Table>
      </Segment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTable);
