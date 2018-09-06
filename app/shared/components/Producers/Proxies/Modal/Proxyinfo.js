// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Modal, Divider, Table } from 'semantic-ui-react';

class ProducersModalProxyInfo extends Component<Props> {
  componentWillMount = () => {
    const {
      actions,
      currentProxy
    } = this.props;

    actions.getAccount(currentProxy.owner);
  }
  render() {
    const {
      accounts,
      onClose,
      proxyAccount,
      t,
      viewing
    } = this.props;

    const currentProxyKeys = currentProxy && Object.keys(currentProxy).filter((key) => currentProxy[key]);

    return (
      <Modal
        closeIcon
        onClose={onClose}
        open
      >
        <Modal.Header>
          {t('producers_proxies_info_header', { proxy: viewing })}
        </Modal.Header>
        <Modal.Content>
          {(proxyAccount && currentProxy && accounts[proxyAccount])
            ? (
              <div>
                <Divider />
                <h3>{t('producers_form_proxy_info_header')}</h3>
                <Table>
                  {currentProxyKeys.map((key) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          {t(`producers_form_proxy_${key}`)}
                        </Table.Cell>
                        <Table.Cell>
                          {currentProxy[key]}
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
                </Table>
              </div>
            ) : ''}

        </Modal.Content>
      </Modal>
    );
  }
}

export default translate('producers')(ProducersModalProxyInfo);
