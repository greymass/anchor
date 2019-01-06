
// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Grid, Table } from 'semantic-ui-react';
import { chunk, last, times } from 'lodash';

class ProducersVotingPreviewSelection extends Component<Props> {
  render() {
    const {
      items,
      t,
    } = this.props;
    // Generate and chunk the rows into groups of 4 cells
    const rows = chunk(times(items.length, i => (
      <Table.Cell key={i}>
        {items[i]}
      </Table.Cell>
    )), 4);
    // Fill in any empty cells for the layout to render properly
    const lastRow = last(rows);
    if (lastRow && lastRow.length < 4) {
      times((4 - lastRow.length), i => {
        lastRow.push((
          <Table.Cell width={4} key={`blank-${i}`} />
        ));
      });
    }

    return (
      <Table celled>
        <Table.Body>
          {(items.length > 0)
            ? rows.map((row, i) => (
              <Table.Row key={i}>{row}</Table.Row>
            ))
            : <Grid.Column textAlign="center" width={12}>{t('producer_voter_preview_confirm_none')}</Grid.Column>
          }
        </Table.Body>
      </Table>
    );
  }
}

export default translate('producers')(ProducersVotingPreviewSelection);

