// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Header,
  Icon,
  Label,
  Segment,
  Table,
} from 'semantic-ui-react';

import ToolsPingResult from './Result';

class ToolsPingResults extends Component<Props> {
  render() {
    const {
      maxSequence,
      node,
      onStop,
      results,
      run,
      useAPI,
      t,
    } = this.props;
    return (
      <React.Fragment>
        <Segment attached="top" style={{ marginTop: '1em' }}>
          <Label>
            {t('legend_header')}
          </Label>
          <Label
            basic
          >
            <Icon
              color="green"
              name="circle"
            />
            {t('legend_fastest')}
          </Label>
          <Label
            basic
          >
            <Icon
              color="yellow"
              name="circle"
            />
            {t('legend_fast')}
          </Label>
          <Label
            basic
          >
            <Icon
              color="orange"
              name="circle"
            />
            {t('legend_slow')}
          </Label>
          <Label
            basic
          >
            <Icon
              color="grey"
              name="circle"
            />
            {t('legend_limited_history')}
          </Label>
          <Label
            basic
          >
            <Icon
              color="black"
              name="circle"
            />
            {t('legend_no_history')}
          </Label>
          <Label
            basic
          >
            <Icon
              color="red"
              name="circle"
            />
            {t('legend_unresponsive')}
          </Label>
        </Segment>
        <Table attached="bottom" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing width={3}>
                {t('column_ms')}
              </Table.HeaderCell>
              <Table.HeaderCell collapsing>
                {t('column_coverage_1')}
                <br />
                <small>{t('column_coverage_2')}</small>
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('column_producer_1')}
                <br />
                <small>{t('column_producer_2')}</small>
              </Table.HeaderCell>
              <Table.HeaderCell collapsing>
                {t('column_latency_1')}
                <br />
                <small>{t('column_latency_2')}</small>
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              results.map((result) => {
                const isCurrentNode = !!(node === result.host);
                return (
                  <ToolsPingResult
                    isCurrentNode={isCurrentNode}
                    maxSequence={maxSequence}
                    onStop={onStop}
                    result={result}
                    run={run}
                    useAPI={useAPI}
                  />
                );
              })
            }
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default translate('ping')(ToolsPingResults);
