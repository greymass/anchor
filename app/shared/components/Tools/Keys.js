// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import {
  Button,
  Confirm,
  Header,
  Icon,
  List,
  Message,
  Modal,
  Popup,
  Segment,
  Table
} from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import ToolsKeyGeneratorComponent from './KeyGenerator';
import ToolsKeyImportComponent from './KeyImport';
import GlobalFragmentChainLogo from '../Global/Fragment/ChainLogo';

const { clipboard } = require('electron');
const ecc = require('eosjs-ecc');

const defaultState =  {
  closable: true,
  confirm: false,
  open: false,
  openImport: false,
  pubkeys: [],
}

class ToolsKeys extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultState)
  }
  onCancelConfirm = () => this.setState({ confirm: false })
  onClose = () => {
    if (this.state.closable) {
      this.setState({ open: false });
    }
    if (!this.state.closable) {
      this.setState({ confirm: true });
    }
  }
  onCloseImport = () => this.setState({ openImport: false })
  onForceClose = () => this.setState({ confirm: false, open: false })
  onKeypair = (pubkey) => {
    const { pubkeys } = this.state;
    this.setState({
      closable: false,
      pubkeys: [
        ...pubkeys,
        pubkey,
      ]
    });
  }
  onOpen = () => this.setState({ open: true })
  onOpenImport = () => this.setState({ openImport: true })
  onSave = () => this.setState({ closable: true })
  render() {
    const {
      paths,
      pubkeys,
      t,
      wallets,
    } = this.props;
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        <Header>
          {t('tools_keys_management_header')}
        </Header>
        <Modal
          closeIcon
          closeOnDimmerClick={false}
          closeOnDocumentClick={false}
          content={(
            <ToolsKeyGeneratorComponent
              {...this.props}
              closable={this.state.closable}
              onKeypair={this.onKeypair}
              onSave={this.onSave}
            />
          )}
          centered={false}
          onClose={this.onClose}
          open={this.state.open}
          trigger={(
            <Button
              content={t('tools_keys_key_generation_header_r2')}
              icon="random"
              onClick={this.onOpen}
              primary
            />
          )}
        />
        <Modal
          closeIcon
          closeOnDimmerClick={false}
          closeOnDocumentClick={false}
          content={(
            <ToolsKeyImportComponent
              actions={this.props.actions}
              settings={this.props.settings}
              onSave={this.onCloseImport}
            />
          )}
          centered={false}
          onClose={this.onCloseImport}
          open={this.state.openImport}
          trigger={(
            <Button
              content={t('tools_keys_management_button')}
              icon="add"
              floated="right"
              onClick={this.onOpenImport}
              primary
            />
          )}
        />
        <Confirm
          content={t('tools_keys_management_confirm_content')}
          header={t('tools_keys_management_confirm_header')}
          open={this.state.confirm}
          onCancel={this.onCancelConfirm}
          onConfirm={this.onForceClose}
        />
        <Table size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {t('tools_keys_management_header_cell_one')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('tools_keys_management_header_cell_two')}
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                {t('tools_keys_management_header_cell_three')}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pubkeys.available.map((pubkey) => {
              const matching = wallets.filter((wallet) => wallet.pubkey === pubkey);
              return (
                <Table.Row>
                  <Table.Cell>
                    <pre style={{ margin: 0 }}>{pubkey}</pre>
                  </Table.Cell>
                  <Table.Cell>{paths[pubkey]}</Table.Cell>
                  <Popup
                    content={(
                      <Table definition size="small">
                        {matching.map((wallet) => (
                          <Table.Row>
                            <Table.Cell collapsing>
                              <GlobalFragmentChainLogo
                                chainId={wallet.chainId}
                                noPopup
                                size="avatar"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              {wallet.account}@{wallet.authorization}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table>
                    )}
                    hoverable
                    position="left center"
                    trigger={(
                      <Table.Cell textAlign="center">
                        {matching.length}
                      </Table.Cell>
                    )}
                  />
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

      </Segment>
    );
  }
}

export default withTranslation('tools')(ToolsKeys);
