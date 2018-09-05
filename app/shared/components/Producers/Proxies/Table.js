// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { debounce, filter, findIndex } from 'lodash';
import { Grid, Header, Input, Segment, Transition, Table } from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';

import ProducersModalProxyInfo from './Modal/ProxyInfo';
import ProxiesTableRow from './Table/Row';

class ProxiesTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      query: false,
      viewing: false
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

  clearProducerInfo = () => this.setState({ viewing: false });
  getProducerInfo = (producer) => this.setState({ viewing: producer });

  render() {
    const {
      amount,
      globals,
      isProxying,
      isValidUser,
      proxies,
      settings,
      system,
      t
    } = this.props;
    const {
      currentProxy,
      query,
      viewing
    } = this.state;
    const {
      current
    } = globals;

    const loading = (proxies.length < 1);
    const querying = this.querying();
    let baseTable = <Table.Body />;
    let searchTable = (
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={5}>
            {t('producer_none_match')}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
    if (!loading) {
      const fullResults = proxies.slice(0, amount);
      baseTable = (
        <Table.Body key="FullResults">
          {fullResults.map((proxy) => {
            const isSelected = (proxy.owner === isProxying);

            return (
              <ProxiesTableRow
                addProducer={this.props.addProducer}
                getProducerInfo={this.getProducerInfo}
                key={proxy.key}
                isProxying={isProxying}
                isSelected={isSelected}
                isValidUser={isValidUser}
                proxy={proxy}
                removeProducer={this.props.removeProducer}
                system={system}
                settings={settings}
              />
            );
          })}
        </Table.Body>
      );

      if (querying) {
        const partResults = filter(proxies, (proxy) =>
          proxy.owner.indexOf(query) > -1).slice(0, amount);
        if (partResults.length > 0) {
          searchTable = (
            <Table.Body key="PartResults">
              {partResults.map((proxy) => {
                const isSelected = (proxy.owner === isProxying);

                return (
                  <ProxiesTableRow
                    addProducer={this.props.addProducer}
                    getProducerInfo={this.getProducerInfo}
                    key={proxy.owner}
                    isProxying={isProxying}
                    isSelected={isSelected}
                    isValidUser={isValidUser}
                    proxy={proxy}
                    removeProducer={this.props.removeProducer}
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
        {(currentProxy)
          ? (
            <ProducersModalProxyInfo
              currentProxy={currentProxy}
              onClose={this.clearProxyInfo}
              settings={settings}
              viewing={viewing}
            />
          ) : ''}
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
              <Header size="small">
                {t('producers_proxies_table_header')}
              </Header>
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
