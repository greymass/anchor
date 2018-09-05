// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Modal, Tab } from 'semantic-ui-react';
import { findIndex } from 'lodash';

class ProducersModalProxyInfo extends Component<Props> {
  componentWillMount = () => {
    const {
      actions,
      tables
    } = this.props;

    if (tables.regproxyinfo &&
        findIndex(tables.regproxyinfo.regproxyinfo.proxies.rows, { owner: value }) !== -1) {
      actions.getAccount(value);
    }
  }
  render() {
    const {
      onClose,
      producerInfo,
      settings,
      t,
      viewing
    } = this.props;

    const currentProxyKeys = currentProxy && Object.keys(currentProxy).filter((key) => currentProxy[key]);

    return (
      <Modal
        closeIcon
        onClose={onClose}
        open={!!(viewing)}
      >
        <Modal.Header>
          {t('producers_info_header', { producer: viewing })}
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
