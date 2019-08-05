// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class JurisdictionHistoryRow extends Component<Props> {

  render() {
    const {
      leftRows,
      rightRows,
      jurisdictions,
      currentSequence,
      t
    } = this.props;

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <label className="jurisdiction-label">{t('actions_table_history_one')}</label>
            <div className="history-scroll">
              {leftRows.length > 0 && (currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'SUCCESS' : true) && leftRows.map((row, idx) => (
                <p key={idx} className="history-wrapper">{`${row.name} (${row.description})`}</p>
              ))}
              {leftRows.length === 0 && (currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'SUCCESS' : true) &&
                <p>No jurisdictions.</p>
              }
              {(currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'PENDING' : false) &&
                <p>Loading...</p>
              }
              {currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'FAILURE' : false &&
                <p>Error fetching data.</p>
              }
            </div>
          </Grid.Column>
          <Grid.Column>
            <label className="jurisdiction-label">{t('actions_table_history_two')}</label>
            <div className="history-scroll">
              {rightRows.length > 0 && (currentSequence ? jurisdictions.ALL_FOR_BLOCK === 'SUCCESS' : true) && rightRows.map((row, idx) => (
                <p key={idx} className="history-wrapper">{`${row.name} (${row.description})`}</p>
              ))}
              {rightRows.length === 0 && (currentSequence ? jurisdictions.ALL_FOR_BLOCK === 'SUCCESS' : true) &&
                <p>No jurisdictions.</p>
              }
              {(currentSequence ? jurisdictions.ALL_FOR_BLOCK === 'PENDING' : false) &&
                <p>Loading...</p>
              }
              {currentSequence ? jurisdictions.ALL_FOR_BLOCK === 'FAILURE' : false &&
                <p>Error fetching data.</p>
              }
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
