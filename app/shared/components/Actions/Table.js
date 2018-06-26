// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Segment, Transition, Table } from 'semantic-ui-react';

import ActionsTableRow from './Table/Row';

class ActionsTable extends Component<Props> {
  render() {
    const {
      amount,
      actions,
      t
    } = this.props;

    const loading = (actions.list.length < 1);
    let baseTable = <Table.Body />;
    if (!loading) {
      const fullResults = actions.list.slice(0, amount);
      baseTable = (
        <Table.Body key="FullResults">
          {fullResults.map((action) => (
            <ActionsTableRow
              key={action.key}
              action={action}
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
              <Table.HeaderCell collapsing />
              <Table.HeaderCell collapsing />
              <Table.HeaderCell>
                {t('action_type')}
              </Table.HeaderCell>
              <Table.HeaderCell width={5}>
                {t('action_time')}
              </Table.HeaderCell>
              <Table.HeaderCell collapsing />
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

export default translate('actions')(ActionsTable);
