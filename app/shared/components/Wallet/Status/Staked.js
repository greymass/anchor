// @flow
import React, { Component } from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

const prettyBytes = require('pretty-bytes');

export default class WalletStatusStaked extends Component<Props> {
  render() {
    const { accounts, settings } = this.props;
    const account = accounts[settings.account] || {};
    const {
      cpu_limit,
      net_limit,
      self_delegated_bandwidth,
      total_resources
    } = account;
    const delegated_bandwidth = {
      cpu_weight: `${(parseFloat(total_resources.cpu_weight) - parseFloat(self_delegated_bandwidth.cpu_weight)).toFixed(4)} EOS`,
      net_weight: `${(parseFloat(total_resources.net_weight) - parseFloat(self_delegated_bandwidth.net_weight)).toFixed(4)} EOS`
    }
    const totalStaked = (parseFloat(total_resources.cpu_weight) + parseFloat(total_resources.net_weight)).toFixed(4);
    return (
      <I18n ns={['wallet', 'producers']}>
        {
          (t) => (
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
                              {delegated_bandwidth.cpu_weight}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              {t('wallet_status_resources_usage')}
                            </Table.Cell>
                            <Table.Cell>
                              {(cpu_limit.used / 100000).toFixed(4)} sec / {(cpu_limit.max / 1000000).toFixed(4)} sec
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
                              {delegated_bandwidth.net_weight}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              {t('wallet_status_resources_usage')}
                            </Table.Cell>
                            <Table.Cell>
                              {prettyBytes(net_limit.used)} / {prettyBytes(net_limit.max)}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
