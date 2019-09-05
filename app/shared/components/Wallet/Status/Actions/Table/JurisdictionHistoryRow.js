// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export default class JurisdictionHistoryRow extends Component<Props> {

  leftError: false;
  rightError: false;

  render() {
    const {
      leftRows,
      rightRows,
      busy,
      jurisdictions,
      currentSequence,
      t
    } = this.props;

    if (currentSequence) {
      if (jurisdictions.FOR_BLOCK === 'FAILURE') {
        this.rightError = true;
      } else if (jurisdictions.FOR_BLOCK === 'SUCCESS') {
        this.rightError = false;
      }
    }
    if (currentSequence) {
      if (jurisdictions.ALL_FOR_TRANSACTION === 'FAILURE') {
        this.leftError = true;
      } else if (jurisdictions.ALL_FOR_TRANSACTION === 'SUCCESS') {
        this.leftError = false;
      }
    }

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <label className="jurisdiction-label">{t('actions_table_history_one')}</label>
            <div className="history-scroll">
              {leftRows.length > 0 && (currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'SUCCESS' : !this.leftError) && leftRows.map((row, idx) => (
                <p key={idx} className="history-wrapper">{`${row.name} (${row.description})`}</p>
              ))}
              {!busy && leftRows.length === 0 && (currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'SUCCESS' : !this.leftError) &&
                <p>No jurisdictions.</p>
              }
              {(busy || (currentSequence ? jurisdictions.ALL_FOR_TRANSACTION === 'PENDING' : false)) &&
                <p>Loading...</p>
              }
              {this.leftError &&
                <p>Error fetching data.</p>
              }
            </div>
          </Grid.Column>
          <Grid.Column>
            <label className="jurisdiction-label">{t('actions_table_history_two')}</label>
            <div className="history-scroll">
              {rightRows.length > 0 && (currentSequence ? jurisdictions.FOR_BLOCK === 'SUCCESS' : !this.rightError) && rightRows.map((row, idx) => (
                <p key={idx} className="history-wrapper">{`${row.name} (${row.description})`}</p>
              ))}
              {!busy && rightRows.length === 0 && (currentSequence ? jurisdictions.FOR_BLOCK === 'SUCCESS' : !this.rightError) &&
                <p>No jurisdictions.</p>
              }
              {(busy || (currentSequence ? jurisdictions.FOR_BLOCK === 'PENDING' : false)) &&
                <p>Loading...</p>
              }
              {this.rightError &&
                <p>Error fetching data.</p>
              }
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
