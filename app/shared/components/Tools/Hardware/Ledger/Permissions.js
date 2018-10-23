// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

import ToolsModalPermissionAuthSet from '../../Modal/Permissions/Auth/Set';
import WalletPanelLocked from '../../../Wallet/Panel/Locked';

import EOSAccount from '../../../../utils/EOS/Account';

import { Button, Checkbox, Container, Icon, Header, Label, List, Message, Popup, Segment, Table } from 'semantic-ui-react';

class ToolsHardwareLedgerPermissions extends Component<Props> {
  render() {
    const {
      account,
      actions,
      blockExplorers,
      keys,
      ledger,
      settings,
      system,
      t,
      validate,
      wallet,
    } = this.props;
    if (!account) return false;
    const { pubkey } = keys;
    const authorization = new EOSAccount(account).getAuthorization(pubkey);
    // Don't display permissions modification until ledger connection established
    if (!(ledger.devicePath && ledger.application)) return false;
    // Don't display while wallet is locked
    if (settings.walletMode !== 'watch' && !(keys && keys.key)) {
      return (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
    }
    return (
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
    );
  }
}

export default translate('ledger')(ToolsHardwareLedgerPermissions);
