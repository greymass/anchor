// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment, Table } from 'semantic-ui-react';

const prettyBytes = require('pretty-bytes');

class WalletStatusStaked extends Component<Props> {
  render() {
    const {
      account,
      statsFetcher,
      t
    } = this.props;

    const {
      cpu_limit,
      net_limit,
      ram_quota,
      ram_usage,
      self_delegated_bandwidth,
      total_resources
    } = account;

    const {
      cpuWeight,
      netWeight
    } = statsFetcher.delegatedStats();

    return (
      <Segment vertical basic>
        <Table
          attached="bottom"
          definition
          unstackable
        >
          <Table.Body>
            <Table.Row>
              <Table.Cell>{t('wallet_status_resources_cpu_available_title')}</Table.Cell>
              <Table.Cell>
                <Table compact>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>
                        {t('wallet_status_resources_total')}
                      </Table.Cell>
                      <Table.Cell>
                        {total_resources.cpu_weight}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>
                        {t('wallet_status_resources_staked')}
                      </Table.Cell>
                      <Table.Cell>
                        {self_delegated_bandwidth.cpu_weight}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('wallet_status_resources_delegated')}
                      </Table.Cell>
                      <Table.Cell>
                        {cpuWeight}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('wallet_status_resources_usage')}
                      </Table.Cell>
                      <Table.Cell>
                        {(cpu_limit.used / 1000000).toFixed(4)} sec / {(cpu_limit.max / 1000000).toFixed(4)} sec
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{t('wallet_status_resources_net_available_title')}</Table.Cell>
              <Table.Cell>
                <Table compact>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>
                        {t('wallet_status_resources_total')}
                      </Table.Cell>
                      <Table.Cell>
                        {total_resources.net_weight}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>
                        {t('wallet_status_resources_staked')}
                      </Table.Cell>
                      <Table.Cell>
                        {self_delegated_bandwidth.net_weight}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('wallet_status_resources_delegated')}
                      </Table.Cell>
                      <Table.Cell>
                        {netWeight}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('wallet_status_resources_usage')}
                      </Table.Cell>
                      <Table.Cell>
                        {prettyBytes(parseInt(net_limit.used))} / {prettyBytes(parseInt(net_limit.max))}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusStaked);
