// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import ToolsHardwareLedgerStatus from './Ledger/Status';
import ToolsHardwareLedgerStatusUnavailable from './Ledger/Status/Unavailable';
import ToolsModalPermissionAuthSet from '../Modal/Permissions/Auth/Set';
import EOSAccount from '../../../utils/EOS/Account';

import { Button, Checkbox, Container, Icon, Header, Label, List, Message, Popup, Segment, Table } from 'semantic-ui-react';

class ToolsHardwareLedger extends Component<Props> {
  displayPublicKey = () => {
    this.props.actions.ledgerGetPublicKey(true)
  }
  getPublicKey = () => {
    this.props.actions.ledgerGetPublicKey()
  }
  start = () => {
    this.props.actions.ledgerStartListen()
  }
  stop = () => {
    this.props.actions.ledgerStopListen()
  }
  componentDidMount() {
    const { settings } = this.props;
    if (settings.hardwareLedgerSupport) {
      this.start();
    }
  }
  toggleDetection = (e, { checked }) => {
    this.props.actions.setSetting('hardwareLedgerSupport', checked)
  }
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      keys,
      ledger,
      settings,
      system,
      t,
    } = this.props;
    const account = accounts[settings.account];

    if (!account) return false;
    const currentKeys = {};
    account.permissions.map((data) => {
      data.required_auth.keys.map((permission) => currentKeys[data.perm_name] = permission.key);
    })
    const { pubkey } = keys;
    const authorization = new EOSAccount(account).getAuthorization(pubkey);
    const deviceAwaitingAuthorization = !!(
      ledger.transportError
      && ledger.transportError.message
      && ledger.transportError.message.startsWith('cannot open device with path')
    );
    // console.log(ledger)
    // console.log(deviceAwaitingAuthorization)
    return (
      <Segment basic>
        <ToolsHardwareLedgerStatus
          ledger={ledger}
        />
        <Segment attached padded size="large">
          <p>{t('ledger_unavailable_text_1')}</p>
          <List>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_1')}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_2')}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_3')}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_4')}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Icon name="right triangle" />
              <List.Content>
                <List.Description>
                  {t('ledger_unavailable_list_5')}
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={6}>
                Wallet - Automatic Ledger Detection
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  defaultChecked={settings.hardwareLedgerSupport}
                  onChange={this.toggleDetection}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Wallet - Waiting for Device
              </Table.Cell>
              <Table.Cell>
                <p>
                  {(ledger.listening)
                    ? <Label color="green" content="waiting" horizontal />
                    : <Label color="yellow" content="disabled" horizontal />
                  }
                </p>
                {(ledger.listening)
                  ? (
                    <Button
                      content="stop listening"
                      onClick={this.stop}
                      primary
                    />
                  )
                  : (
                    <Button
                      content="start listening"
                      onClick={this.start}
                      primary
                    />
                  )
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Ledger - Connected & Unlocked
              </Table.Cell>
              <Table.Cell>
                {(ledger.transport)
                  ? <Label color="green" content="connected & unlocked" horizontal />
                  : <Label color="yellow" content="not connected or locked" horizontal />
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Ledger - Software Version
              </Table.Cell>
              <Table.Cell>
                {(ledger.transport)
                  ? false
                  : <Label color="yellow" content="not connected" horizontal />
                }
                {(ledger.transport && ledger.application && ledger.application.version)
                  ? ledger.application.version
                  : false
                }
                {(ledger.transport && (!ledger.application || !ledger.application.version))
                  ? <Label color="orange" content="Start EOS App on Ledger" horizontal />
                  : false
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Ledger- Public Key
              </Table.Cell>
              <Table.Cell>
                {(ledger.transport)
                  ? false
                  : <Label color="yellow" content="not connected" horizontal />
                }
                {(ledger.transport && ledger.publicKey)
                  ? (
                    <React.Fragment>
                      <p>{ledger.publicKey.wif}</p>
                      <Button
                        content="confirm public key on device"
                        onClick={this.displayPublicKey}
                        primary
                      />
                    </React.Fragment>
                  )
                  : false
                }
                {(ledger.transport && !ledger.publicKey)
                  ? (
                    <React.Fragment>
                      <Button
                        content="retrieve public key"
                        onClick={this.getPublicKey}
                        primary
                      />
                    </React.Fragment>
                  )
                  : false
                }
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        {(ledger.devicePath && ledger.application)
          ? (
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    Account
                  </Table.Cell>
                  <Table.Cell>
                    {settings.account}
                  </Table.Cell>
                </Table.Row>
                {(account.permissions.map((data) => (
                  <React.Fragment>
                    {data.required_auth.keys.map((permission) => (
                      <Table.Row key={`${data.perm_name}-${permission.key}`}>
                        <Table.Cell collapsing textAlign="right">{data.perm_name}</Table.Cell>
                        <Table.Cell>
                          {(ledger.publicKey && permission.key === ledger.publicKey.wif)
                            ? "Uses Ledger"
                            : "No"
                          }
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          {permission.key}
                        </Table.Cell>
                        <Table.Cell>
                          {(!ledger.publicKey || permission.key === ledger.publicKey.wif)
                            ? false
                            : (
                              <React.Fragment>
                                {(
                                  !authorization
                                  || (data.perm_name === 'owner' && authorization.permission === 'owner')
                                  || (data.perm_name !== 'owner')
                                )
                                  ? (
                                    <ToolsModalPermissionAuthSet
                                      actions={actions}
                                      auth={data}
                                      blockExplorers={blockExplorers}
                                      button={{
                                        color: 'purple',
                                        content: t('tools_modal_permissions_auth_use_ledger_button'),
                                        fluid: false,
                                        icon: 'lock',
                                        size: 'small'
                                      }}
                                      onClose={this.onClose}
                                      newkey={ledger.publicKey.wif}
                                      pubkey={pubkey}
                                      settings={settings}
                                      system={system}
                                    />
                                  )
                                  : (
                                    <Popup
                                      content={t('tools_modal_permissions_auth_edit_button_disabled')}
                                      inverted
                                      position="top center"
                                      trigger={(
                                        <Button
                                          content={t('tools_modal_permissions_auth_edit_button')}
                                          floated="right"
                                          icon="pencil"
                                          size="small"
                                        />
                                      )}
                                    />
                                  )
                                }
                              </React.Fragment>
                            )
                          }
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </React.Fragment>
                )))}
              </Table.Body>
            </Table>
          )
          : false
        }

      </Segment>
    );
  }
}

export default translate('ledger')(ToolsHardwareLedger);
