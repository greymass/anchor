// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Modal, Table, Segment } from 'semantic-ui-react';

class ProducersProxiesModalProxyInfo extends Component<Props> {
  componentWillMount = () => {
    const {
      actions,
      viewingProxy
    } = this.props;

    actions.getAccount(viewingProxy.owner);
  }
  render() {
    const {
      accounts,
      onClose,
      t,
      viewingProxy
    } = this.props;

    const currentProxyKeys = viewingProxy &&
      Object.keys(viewingProxy).filter((key) => viewingProxy[key]);

    const proxyAccount = viewingProxy.owner;
    const proxyInfoLoaded = proxyAccount && viewingProxy && accounts[proxyAccount];

    return (
      <Modal
        closeIcon
        onClose={onClose}
        open
      >
        <Modal.Header>
          {t('producers_proxies_info_header', { proxy: viewingProxy })}
        </Modal.Header>
        <Modal.Content>
          <Segment basic loading={!proxyInfoLoaded} style={{ minHeight: '200px' }}>
            {(proxyInfoLoaded)
              ? (
                <Table>
                  <Table.Body key="ProxyInfoBody">
                    {currentProxyKeys.map((key) => {
                      return (
                        <Table.Row>
                          <Table.Cell>
                            {t(`producers_form_proxy_${key}`)}
                          </Table.Cell>
                          <Table.Cell>
                            {viewingProxy[key]}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                    <Table.Row>
                      <Table.Cell>
                        {t('producers_form_proxy_current_votes')}
                      </Table.Cell>
                      <Table.Cell>
                        {(accounts[proxyAccount].voter_info.producers.length !== 0)
                          ? (
                            accounts[proxyAccount].voter_info.producers.join(', ')
                          ) : (
                            t('producers_form_proxy_summary_no_one')
                          )}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              ) : ''}
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate('producers')(ProducersProxiesModalProxyInfo);
