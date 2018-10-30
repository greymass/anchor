// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { findIndex } from 'lodash';

import { Button, Checkbox, Container, Header, Segment, Table } from 'semantic-ui-react';

import GlobalModalSettingsBlockchain from '../Global/Modal/Settings/Blockchains';

class ToolsBlockchains extends Component<Props> {
  state = {
    addingBlockchain: false
  }

  showBlockchain = () => this.setState({ addingBlockchain: true });
  hideBlockchain = () => this.setState({ addingBlockchain: false });

  removeBlockchain = (chainId) => {
    const { actions } = this.props;
    actions.removeBlockchain(chainId);
  }
  switchChain = (node) => {
    const { actions } = this.props;
    actions.setSettingWithValidation('node', node);
  }
  render() {
    const {
      actions,
      globals,
      settings,
      t,
      validate,
      connection
    } = this.props;
    const {
      blockchains
    } = settings;
    
    const {
      addingBlockchain
    } = this.state;
    
    return (
      <Segment basic>
        <Header floated="left">
          {t('tools_blockchains_header')}
          <Header.Subheader>
            {t('tools_blockchains_subheader')}
          </Header.Subheader>
        </Header>
        <Container floated="right">
          <Button
            color="blue"
            content={t('tools_blockchains_add')}
            floated="right"
            icon="circle plus"
            onClick={this.showBlockchain}
            size="small"
          />
        </Container>
        <GlobalModalSettingsBlockchain
          actions={actions}
          globals={globals}
          onClose={this.hideBlockchain}
          open={addingBlockchain}
          settings={settings}
          validate={validate}
          connection={connection}
        />
        <Table columns={6} definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('tools_blockchains_blockchain')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_blockchains_node')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_blockchains_chainid')}</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(blockchains)
                .map((blockchain) => {
                  const isActive = (blockchain.node === settings.node);
                  return (
                    <Table.Row key={`${blockchain.chainId}`}>
                      <Table.Cell>
                        <Header>
                          {blockchain.blockchain} ({blockchain.tokenSymbol})
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <strong>
                          {blockchain.node}
                        </strong>
                      </Table.Cell>
                      <Table.Cell width="1">
                        <strong>
                          { blockchain.chainId ? blockchain.chainId.substring(0,10) : null}...
                        </strong>
                      </Table.Cell>
                      <Table.Cell>
                      <Button
                        color="green"
                        disabled={isActive}
                        icon="random"
                        onClick={this.switchChain.bind(this, blockchain.node)}
                      />
                      <Button
                        color="red"
                        disabled={isActive}
                        icon="trash"
                        onClick={this.removeBlockchain.bind(this, blockchain.chainId)}
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

export default translate('tools')(ToolsBlockchains);
