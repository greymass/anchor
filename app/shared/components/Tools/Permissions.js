// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find } from 'lodash';

import { Button, Container, Icon, Header, Message, Popup, Segment, Table } from 'semantic-ui-react';

import ToolsModalPermissionAuth from './Modal/Permissions/Auth';
import WalletPanelLocked from '../Wallet/Panel/Locked';

class ToolsPermissions extends Component<Props> {
  getAuthorization(account, pubkey) {
    if (account) {
      // Find the matching permission
      const permission = find(account.permissions, (perm) =>
        find(perm.required_auth.keys, (key) => key.key === pubkey));
      if (permission) {
        // Return an authorization for this key
        return {
          actor: account.account_name,
          permission: permission.perm_name
        };
      }
    }
    return undefined;
  }

  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      keys,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

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

    const account = accounts[settings.account];
    if (!account) return false;

    const { pubkey } = keys;
    const authorization = this.getAuthorization(account, pubkey);

    return (
      <Segment basic>
        <Container>
          {(settings.advancedPermissions)
            ? (
              <ToolsModalPermissionAuth
                actions={actions}
                auth={false}
                blockExplorers={blockExplorers}
                button={{
                  color: 'blue',
                  content: t('tools_modal_permissions_auth_create_button'),
                  fluid: false,
                  icon: 'circle plus',
                  size: 'small'
                }}
                onClose={this.onClose}
                open
                settings={settings}
                system={system}
              />
            )
            : false
          }
          <Header
            content={t('tools_permissions_header')}
            subheader={t('tools_permissions_subheader')}
            textAlign="left"
          />
        </Container>
        <Message
          content={t('tools_permissions_info_content')}
          header={t('tools_permissions_info_header')}
          icon="info circle"
          info
        />
        <Segment
          color="blue"
        >
          {(settings.walletMode === 'watch')
            ? (
              <Header
                color="orange"
                content={t('tools_permissions_current_wallet_watch_header')}
                icon="eye"
                size="small"
                subheader={t('tools_permissions_current_wallet_watch_subheader')}
              />
            )
            : (
              <Header
                content={t('tools_permissions_current_wallet_header', { pubkey })}
                icon="key"
                size="small"
                subheader={t('tools_permissions_current_wallet_subheader')}
              />
            )
          }
        </Segment>

        {(account.permissions.map((data) => (
          <Segment
            color="purple"
            key={`${account}-${data.perm_name}`}
          >
            {(
              !authorization
              || (data.perm_name === 'owner' && authorization.permission === 'owner')
              || (data.perm_name !== 'owner')
            )
              ? (
                <ToolsModalPermissionAuth
                  actions={actions}
                  auth={data}
                  blockExplorers={blockExplorers}
                  button={{
                    color: 'purple',
                    content: t('tools_modal_permissions_auth_edit_button'),
                    fluid: false,
                    floated: 'right',
                    icon: 'pencil',
                    size: 'small'
                  }}
                  onClose={this.onClose}
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
            <Header floated="left" size="medium">
              <Icon name="lock" />
              <Header.Content>
                {t('tools_modal_permissions_auth_permission_name', { permissionName: data.perm_name })}
                <Header.Subheader>
                  {t('tools_modal_permissions_auth_permission_structure', {
                    threshold: data.required_auth.threshold,
                    total: data.required_auth.keys.length + data.required_auth.accounts.length
                  })}
                  {(data.parent)
                    ? t('tools_modal_permissions_auth_permission_child_of', { parent: data.parent })
                    : false
                  }
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="right">Weight</Table.HeaderCell>
                  <Table.HeaderCell>Permission</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.required_auth.accounts.map((permission) => (
                  <Table.Row key={`${data.perm_name}-${permission.permission.actor}-${permission.permission.permission}`}>
                    <Table.Cell collapsing textAlign="right">{permission.weight}</Table.Cell>
                    <Table.Cell>
                      {permission.permission.actor}@{permission.permission.permission}
                    </Table.Cell>
                  </Table.Row>
                ))}
                {data.required_auth.keys.map((permission) => (
                  <Table.Row key={`${data.perm_name}-${permission.key}`}>
                    <Table.Cell collapsing textAlign="right">{permission.weight}</Table.Cell>
                    <Table.Cell>{permission.key}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
        )))}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsPermissions);
