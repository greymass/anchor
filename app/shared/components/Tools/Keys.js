// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { PublicKey } from '@greymass/eosio';

import {
  Button,
  Checkbox,
  Confirm,
  Dropdown,
  Header,
  Icon,
  Input,
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
import GlobalAccountKey from '../../containers/Global/Account/Key';
import GlobalButtonElevate from '../../containers/Global/Button/Elevate';

const defaultState = {
  closable: true,
  confirm: false,
  confirmRemove: false,
  legacy: false,
  open: false,
  openImport: false,
  openKey: false,
  pubkeys: [],
  searchFilter: '',
};

class ToolsKeys extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, defaultState);
  }
  onCancelConfirm = () => this.setState({ confirm: false })
  onRemoveConfirm = (pubkey) => this.setState({ confirmRemove: pubkey })
  onRemoveCancel = () => this.setState({ confirmRemove: false })
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
  onHideKey = () => this.setState({ openKey: false })
  onShowKey = (pubkey) => this.setState({ openKey: pubkey })
  onSave = () => this.setState({ closable: true })
  onRemoveKey = (password, pubkey) => {
    const { actions } = this.props;
    actions.removeKeyFromStorageByPublic(password, pubkey);
    this.setState({ confirmRemove: false });
  }
  filterKeys = (e, { value }) => this.setState({ searchFilter: value })
  toggleLegacy = (e, { checked }) => this.setState({ legacy: checked })
  render() {
    const {
      paths,
      pubkeys,
      t,
      settings,
      validate,
      wallet,
      wallets,
    } = this.props;
    const {
      confirmRemove,
      legacy,
      openKey,
      searchFilter,
    } = this.state;
    let filtered = [...pubkeys.available];
    if (searchFilter !== '') {
      filtered = [...pubkeys.available].filter(k => k.toLowerCase().includes(searchFilter.toLowerCase()));
    }
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        {(openKey)
          ? (
            <GlobalAccountKey
              onClose={this.onHideKey}
              pubkey={openKey}
            />
          )
          : false
        }
        {(confirmRemove)
          ? (
            <Modal
              onClose={() => this.onRemoveCancel()}
              open={confirmRemove}
              size="tiny"
            >
              <Modal.Header>{t('global:global_account_key_remove_confirm_title')}</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>{t('global:global_account_key_remove_confirm_header')}</Header>
                  <p>{t('global:global_account_key_remove_confirm_desc')}</p>
                  <p>{confirmRemove}</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button floated="left" onClick={() => this.onRemoveCancel()}>
                  {t('cancel')}
                </Button>
                <GlobalButtonElevate
                  onSuccess={(password) => this.onRemoveKey(password, confirmRemove)}
                  settings={settings}
                  trigger={(
                    <Button
                      color="orange"
                      content={t('global_account_key_remove_confirm_button')}
                      icon="warning sign"
                    />
                  )}
                  validate={validate}
                  wallet={wallet}
                />
              </Modal.Actions>
            </Modal>
          )
          : false
        }
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
      <Table size="small" key={`legacy-keys-${legacy}`}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Input
                  onChange={this.filterKeys}
                  placeholder="Search by Public Key"
                />
                <Checkbox
                  checked={legacy}
                  label="Show Legacy Format"
                  onChange={this.toggleLegacy}
                  style={{ marginLeft: '1em' }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell collapsing>
                {t('tools_keys_management_header_cell_two')}
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center" collapsing>
                {t('tools_keys_management_header_cell_three')}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.map((pubkey) => {
              const matching = wallets.filter((w) => w.pubkey === pubkey);
              return (
                <Table.Row>
                  <Table.Cell>
                    <pre style={{ display: 'inline', margin: 0 }}>
                      {(legacy) ? pubkey : String(PublicKey.from(pubkey))}
                    </pre>
                    <Dropdown>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => this.onShowKey(pubkey)}
                          text={t('global:global_account_key_modal_header')}
                        />
                        {(matching.length > 0)
                          ? (
                            <Popup
                              content={(
                                <p>{t('global:global_account_key_remove_unable')}</p>
                              )}
                              position="left center"
                              trigger={(
                                <Dropdown.Item
                                  text={t('global:global_account_key_remove')}
                                />
                              )}
                            />
                          )
                          : (
                            <Dropdown.Item
                              onClick={() => this.onRemoveConfirm(pubkey)}
                              text={t('global:global_account_key_remove')}
                            />
                          )
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell>{paths[pubkey]}</Table.Cell>
                  {(matching.length)
                    ? (
                      <Popup
                        content={(
                          <Table definition size="small">
                            {matching.map((w) => (
                              <Table.Row>
                                <Table.Cell collapsing>
                                  <GlobalFragmentChainLogo
                                    chainId={w.chainId}
                                    noPopup
                                    size="avatar"
                                  />
                                </Table.Cell>
                                <Table.Cell>
                                  {w.account}@{w.authorization}
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
                    )
                    : (
                      <Table.Cell textAlign="center">
                        {matching.length}
                      </Table.Cell>
                    )
                  }
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
