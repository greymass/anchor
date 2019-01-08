// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { findIndex } from 'lodash';

import { Button, Checkbox, Container, Header, Segment, Table } from 'semantic-ui-react';

import GlobalModalSettingsCustomToken from '../Global/Modal/Settings/CustomTokens';

class ToolsCustomTokens extends Component<Props> {
  state = {
    addingToken: false
  }
  componentDidMount() {
    this.sync();
  }
  showCustomToken = () => this.setState({ addingToken: true });
  hideCustomToken = () => this.setState({ addingToken: false });
  sync = () => {
    const { actions } = this.props;
    actions.getCustomTokens();
  }
  scan = () => {
    const {
      actions,
      connection,
      customtokens,
      settings
    } = this.props;
    const {
      chainKey
    } = connection;
    let {
      tokens
    } = customtokens;

    if (tokens && tokens[chainKey]) {
      tokens = tokens[chainKey];
    } else {
      tokens = [];
    }

    tokens = tokens.map((token) => `${chainKey}:${token.contract.toLowerCase()}:${token.symbol.toUpperCase()}`);
    actions.getCurrencyBalance(settings.account, tokens);
  }
  toggleCustomToken = (e, { checked, name }) => {
    const { actions } = this.props;
    const [chainKey, contract, symbol] = name.split(':');
    if (checked) {
      actions.addCustomToken(contract, symbol);
    } else {
      actions.removeCustomToken(contract, symbol);
    }
  }
  render() {
    const {
      actions,
      balances,
      connection,
      customtokens,
      globals,
      settings,
      t
    } = this.props;
    const {
      customTokens
    } = settings;
    const {
      addingToken
    } = this.state;
    let {
      tokens
    } = customtokens;
    if (tokens && tokens[connection.chainKey]) {
      tokens = tokens[connection.chainKey];
    } else {
      tokens = [];
    }
    if (customTokens && customTokens.length) {
      customTokens.forEach((token) => {
        const [chainKey, contract, symbol] = token.split(':');
        if (findIndex(tokens, { symbol, contract }) === -1) {
          tokens.unshift({
            contract,
            custom: true,
            symbol
          });
        }
      });
    }
    let filterTokens = customTokens.filter((token) => (connection.chainKey !== token.split(':')[0]));
    filterTokens = filterTokens.map((token) => (token.split(':')[2]));
    return (
      <Segment basic>
        <Header>
          {t('tools_customtokens_header')}
          <Header.Subheader>
            {t('tools_customtokens_subheader')}
          </Header.Subheader>
        </Header>
        <Container>
          <Button
            color="green"
            content={t('tools_customtokens_scan')}
            icon="search"
            onClick={this.scan}
            size="small"
          />
          <Button
            color="blue"
            content={t('wallet:wallet_status_add_custom_token_action')}
            floated="right"
            icon="circle plus"
            onClick={this.showCustomToken}
            size="small"
          />
        </Container>
        <GlobalModalSettingsCustomToken
          actions={actions}
          globals={globals}
          onClose={this.hideCustomToken}
          open={addingToken}
          settings={settings}
        />
        <Table columns={5} definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('tools_customtokens_contract')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_customtokens_symbol')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_customtokens_balance')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_customtokens_controls')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(tokens)
                .filter((token) => (token.symbol !== 'EOS'))
                .filter((token) => (filterTokens.indexOf(token.symbol) === -1))
                .map((token) => {
                  const name = `${connection.chainKey}:${token.contract}:${token.symbol}`;
                  const isSelected = !!(settings.customTokens && settings.customTokens.indexOf(name) !== -1);
                  let balance = false;
                  if (balances && settings.account && balances[settings.account]) {
                    balance = balances[settings.account][token.symbol];
                  }
                  return (
                    <Table.Row key={`${connection.chainKey}-${token.contract}-${token.symbol}`}>
                      <Table.Cell>
                        <Header size="small">
                          {token.contract}
                          {(token.custom) ? (
                            <Header.Subheader>
                              {t('tools_customtokens_track_custom')}
                            </Header.Subheader>
                          ) : false }
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {token.symbol}
                      </Table.Cell>
                      <Table.Cell>
                        <strong>
                          {balance}
                        </strong>
                      </Table.Cell>
                      <Table.Cell>
                        <Checkbox
                          label={t('tools_customtokens_track_token')}
                          defaultChecked={isSelected}
                          name={name}
                          onChange={this.toggleCustomToken}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })
            )}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsCustomTokens);
