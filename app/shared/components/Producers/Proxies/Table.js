// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { debounce, filter, findIndex, sortBy } from 'lodash';
import { Grid, Input, Segment, Transition, Table, Message } from 'semantic-ui-react';

import ProducersModalProxyInfo from './Modal/ProxyInfo';
import ProxiesTableRow from './Table/Row';

class ProxiesTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      query: false,
      showProxyInfo: false
    };
  }

  onSearchChange = debounce((e, { value }) => {
    const { isQuerying } = this.props;
    const query = String(value).toLowerCase();
    this.setState({ query }, () => {
      isQuerying((query && query.length > 0));
    });
    this.props.resetDisplayAmount();
  }, 400);

  querying() {
    const {
      query
    } = this.state;
    return (query && query.length > 0);
  }

  clearProxyInfo = () => this.setState({ showProxyInfo: false });

  getProxyInfo = (proxyAccount) => {
    const {
      proxies
    } = this.props;

    const index = findIndex(proxies, { owner: proxyAccount });

    this.setState({
      showProxyInfo: proxies[index]
    });
  }

  render() {
    const {
      accounts,
      actions,
      addProxy,
      amount,
      currentProxy,
      isProxying,
      isValidUser,
      proxies,
      removeProxy,
      settings,
      system,
      t
    } = this.props;
    const {
      query,
      showProxyInfo
    } = this.state;

    const loading = (proxies.length < 1);
    const querying = this.querying();
    let baseTable = <Table.Body />;
    let searchTable = (
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={5}>
            {t('producers_none_match')}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
    const sortedProxies = sortBy(proxies, 'name');
    if (!loading) {
      const fullResults = sortedProxies.slice(0, amount);
      baseTable = (
        <Table.Body key="FullResults">
          {fullResults.map((proxy) => {
            const isSelected = (proxy.owner === currentProxy);

            return (
              <ProxiesTableRow
                addProxy={addProxy}
                key={proxy.owner}
                isSelected={isSelected}
                isValidUser={isValidUser}
                getProxyInfo={this.getProxyInfo}
                proxy={proxy}
                removeProxy={removeProxy}
                system={system}
                settings={settings}
              />
            );
          })}
        </Table.Body>
      );

      if (querying) {
        const partResults = filter(sortedProxies, (proxy) =>
          proxy.owner.indexOf(query) > -1 ||
          proxy.name.indexOf(query) > -1
        ).slice(0, amount);

        if (partResults.length > 0) {
          searchTable = (
            <Table.Body key="PartResults">
              {partResults.map((proxy) => {
                const isSelected = (proxy.owner === currentProxy);

                return (
                  <ProxiesTableRow
                    addProxy={addProxy}
                    getProducerInfo={this.getProducerInfo}
                    key={proxy.owner}
                    isProxying={isProxying}
                    isSelected={isSelected}
                    isValidUser={isValidUser}
                    getProxyInfo={this.getProxyInfo}
                    proxy={proxy}
                    removeProxy={removeProxy}
                    system={system}
                    settings={settings}
                  />
                );
              })}
            </Table.Body>
          );
        }
      }
    }
    return (
      <Segment basic loading={loading} vertical>
        {(showProxyInfo)
          ? (
            <ProducersModalProxyInfo
              accounts={accounts}
              actions={actions}
              onClose={this.clearProxyInfo}
              settings={settings}
              viewingProxy={showProxyInfo}
            />
          ) : ''}
        <Message
          warning
        >
          {t('producers_form_proxy_message')}
        </Message>
        <Grid>
          <Grid.Column width={8} />
          <Grid.Column width={8} key="ProxiesSearch" textAlign="right">
            <Input
              icon="search"
              onChange={this.onSearchChange}
              placeholder={t('search')}
            />
          </Grid.Column>
        </Grid>
        <Table
          color="violet"
          size="small"
          striped
          style={{ borderRadius: 0 }}
          unstackable
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing />
              <Table.HeaderCell>
                {t('producers_proxies_table_header_name')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('producers_proxies_table_header_account')}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Transition visible={querying} animation="slide down" duration={200}>
            {searchTable}
          </Transition>
          <Transition visible={!querying} animation="slide down" duration={200}>
            {baseTable}
          </Transition>
        </Table>
      </Segment>
    );
  }
}

export default translate('producers')(ProxiesTable);
