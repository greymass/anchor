// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import { Button, Checkbox, Header, Label, Popup, Segment, Table } from 'semantic-ui-react';

class ToolsCustomTokens extends Component<Props> {
  componentDidMount() {
    this.sync();
  }
  sync = () => {
    const { actions } = this.props;
    actions.getCustomTokens();
  }
  scan = () => {
    const { actions, customtokens, settings } = this.props;
    const tokens = customtokens.tokens.map((token) => `${token.contract.toLowerCase()}:${token.symbol.toUpperCase()}`);
    actions.getCurrencyBalance(settings.account, tokens);
  }
  toggleCustomToken = (e, { checked, name }) => {
    const { actions } = this.props;
    const [ contract, symbol ] = name.split(':');
    if (checked) {
      actions.addCustomToken(contract, symbol);
    } else {
      actions.removeCustomToken(contract, symbol);
    }
  }
  render() {
    const {
      balances,
      customtokens,
      settings,
      t,
      wallets
    } = this.props;
    if (!wallets || !wallets.length) {
      return false;
    }
    return (
      <Segment basic>
        <Button
          floated="right"
          icon="refresh"
          onClick={this.sync}
        />
        <Button
          color="blue"
          content={t('tools_customtokens_scan')}
          floated="right"
          icon="search"
          onClick={this.scan}
        />
        <Header floated="left">
          {t('tools_customtokens_header')}
          <Header.Subheader>
            {t('tools_customtokens_subheader')}
          </Header.Subheader>
        </Header>
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
            {([].concat(customtokens.tokens)
                .filter((token) => (token.symbol !== 'EOS'))
                .map((token) => {
                  const name = `${token.contract}:${token.symbol}`;
                  const isSelected = !!(settings.customTokens.indexOf(name) !== -1);
                  let balance = false;
                  if (balances && settings.account && balances[settings.account]) {
                    balance = balances[settings.account][token.symbol];
                  }
                  return (
                    <Table.Row key={`${token.contract}-${token.symbol}`}>
                      <Table.Cell>
                        {token.contract}
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
