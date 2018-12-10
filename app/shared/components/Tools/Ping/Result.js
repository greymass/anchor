// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { isEqual } from 'lodash';

import { Button, Header, Icon, Label, Popup, Table } from 'semantic-ui-react';

class ToolsPingResult extends Component<Props> {
  shouldComponentUpdate = (nextProps) =>
    !isEqual(this.props.maxSequence, nextProps.maxSequence)
    || !isEqual(this.props.isCurrentNode, nextProps.isCurrentNode)
    || !isEqual(this.props.run, nextProps.run)
    || !isEqual(this.props.result.host, nextProps.result.host)
    || !isEqual(this.props.result.loading, nextProps.result.loading)
    || !isEqual(this.props.result.attempt, nextProps.result.attempt)
    || !isEqual(this.props.result.success, nextProps.result.success);

  render() {
    const {
      isCurrentNode,
      maxSequence,
      result,
      run,
      t,
    } = this.props;
    const coverage = Math.round((result.seq / maxSequence) * 100);
    let color = 'black';
    if (result.failing) {
      color = 'red';
    } else if (coverage === 100 && result.median <= 400) {
      color = 'green';
    } else if (coverage === 100 && result.median <= 1000) {
      color = 'yellow';
    } else if (coverage === 100 && result.median < 99999) {
      color = 'orange';
    } else if (coverage > 0 && result.median < 99999) {
      color = 'grey';
    }
    let failureMessage = false;
    switch (result.failing) {
      case 'nohistory': {
        color = 'grey';
        failureMessage = t('result_no_history');
        break;
      }
      case 'noconnection': {
        failureMessage = t('result_unresponsive');
        break;
      }
      default: {
        // no default
      }
    }
    return (
      <Table.Row>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {(result.failing === 'noconnection')
            ? (
              <React.Fragment>
                <Label
                  color={color}
                  content={failureMessage}
                  textAlign="left"
                />
                <br />
                <small>
                  {t('result_attempts_failed', { value: result.failure })}
                </small>
              </React.Fragment>
            )
            : false
          }
          {(result.failing === false || result.failing === 'nohistory')
            ? (
              <React.Fragment>
                <Label
                  color={color}
                  horizontal
                  size="large"
                  textAlign="left"
                >
                  {(result.failed)
                    ? (
                      <Icon
                        name="x"
                      />
                    )
                    : (
                      <Icon
                        name={(result.loading) ? 'notched circle' : 'clock outline'}
                        loading={result.loading}
                      />
                    )
                  }&nbsp;{`${result.median}ms`}
                </Label>
                {(result.failure > 0)
                  ? (
                    <small>
                      <br />{result.failure}x {t('errors')}
                    </small>
                  )
                  : false
                }
              </React.Fragment>
            )
            : false
          }
          {(!result.failing && result.success === 0)
            ? (
              <React.Fragment>
                <Label
                  color={color}
                  textAlign="left"
                >
                  <Icon
                    name={(result.loading) ? 'notched circle' : 'clock outline'}
                    loading={result.loading}
                  />
                  ...
                </Label>
                <small>
                  <br /> {result.failure} attempts
                </small>
              </React.Fragment>
            )
            : false
          }
          <br />
        </Table.Cell>
        <Table.Cell textAlign="center">
          {(coverage > 0 && coverage < 100)
            ? (
              <Label
                basic
                color="orange"
                content={`${coverage}%`}
              />
            )
            : false
          }
          {(coverage === 100)
            ? (
              <Label
                basic
                color="green"
                content={`${coverage}%`}
              />
            )
            : false
          }
        </Table.Cell>
        <Table.Cell>
          <Header
            content={result.producer}
            subheader={(
              <Header.Subheader>
                {result.host}
                {(result.proxy)
                  ? (
                    <React.Fragment>
                      <br />
                      {'↳ '}
                      {t('result_proxy', { proxy: result.proxy })}
                    </React.Fragment>
                  )
                  : ''
                }
              </Header.Subheader>
            )}
            size="small"
          />
        </Table.Cell>
        <Table.Cell width={3} textAlign="center">
          {(!result.failing)
            ? (
              <Sparklines
                data={result.history}
                limit={20}
                width={150}
                height={35}
                min={0}
              >
                <SparklinesLine />
              </Sparklines>
            )
            : false
          }
          {(result.failing === 'nohistory')
            ? (
              <React.Fragment>
                <Label
                  color={color}
                  content={failureMessage}
                  textAlign="left"
                />
              </React.Fragment>
            )
            : false
          }
          {(!(result.failing || result.failing === 'nohistory') && result.ms)
            ? (
              <small>
                {t('result_latest_ms', { ms: result.ms })}
              </small>
            )
            : false
          }
        </Table.Cell>
        <Table.Cell textAlign="right">
          {(isCurrentNode)
            ? (
              <Button
                basic
                color="blue"
                content={t('result_current_api')}
                size="small"
              />
            )
            : false
          }
          {(run && !isCurrentNode)
            ? (
              <Button
                color="grey"
                content={t('button_stop')}
                onClick={() => this.props.onStop()}
                size="small"
              />
            )
            : false
          }
          {(!run && result.failing === 'noconnection')
            ? (
              <Button
                basic
                color="red"
                content={t('result_no_connection')}
                disabled
                size="small"
              />
            )
            : false
          }
          {(!run && result.success > 0 && !isCurrentNode && coverage === 100)
            ? (
              <Button
                color="green"
                content={t('result_change_api')}
                onClick={() => this.props.useAPI(result.host)}
                size="small"
              />
            )
            : false
          }
          {(
            !run
            && (
              result.failing === 'nohistory'
              || (!result.failing && coverage < 100)
              || (result.failing === 'nohistory' && coverage < 100)
            )

          )
            ? (
              <Popup
                content={t('utils_ping_use_unsupported_api_content')}
                header={t('utils_ping_use_unsupported_api_header')}
                hoverable
                inverted
                position="left center"
                trigger={(
                  <Button
                    basic
                    color="yellow"
                    content={t('result_change_api')}
                    onClick={() => this.props.useAPI(result.host)}
                    size="small"
                  />
                )}
              />
            )
            : false
          }
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('ping')(ToolsPingResult);
