// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Segment, Table } from 'semantic-ui-react';

class ToolsBlockchains extends Component<Props> {
  render() {
    const {
      actions,
      blockchains,
      connection,
      settings,
      t,
    } = this.props;
    return (
      <Segment basic>
        <Button.Group floated="right">
          <Button />
        </Button.Group>
        <Header floated="left">
          {t('tools_blockchains_header')}
          <Header.Subheader>
            {t('tools_blockchains_subheader')}
          </Header.Subheader>
        </Header>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('tools_blockchains_account')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_blockchains_mode')}</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">{t('tools_blockchains_controls')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(blockchains)
                .sort((a, b) => {
                  const k1 = `${a.account}@${a.authorization}`;
                  const k2 = `${b.account}@${b.authorization}`;
                  return k1 > k2;
                })
                .map((w) => (
                  <Table.Row>
                    <Table.Cell>Test</Table.Cell>
                  </Table.Row>
                )))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsBlockchains);
