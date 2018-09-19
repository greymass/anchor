// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { delete as del, set } from 'dot-prop-immutable';
import { map, values } from 'lodash';

import { Button, Container, Form, Message, Table } from 'semantic-ui-react';

class ToolsFormPermissionsAuthSet extends Component<Props> {
  onSubmit = () => {
    const {
      actions,
      auth,
      newkey,
      settings
    } = this.props;
    const {
      parent,
      perm_name,
      required_auth
    } = auth;
    const newAuth = set(required_auth, 'keys.0.key', newkey);
    console.log(newAuth)
    // const {
    //   auth,
    //   parent,
    //   permission
    // } = this.state;
    let authorization;
    if (perm_name === 'owner') {
      authorization = `${settings.account}@owner`;
    }
    actions.updateauth(perm_name, parent, newAuth, authorization);
  }
  render() {
    const {
      pubkey,
      newkey,
      settings,
      t
    } = this.props;
    // const {
    //   original,
    //   validForm
    // } = this.state;
    const original = Object.assign({}, this.props.auth);
    const isCurrentKey = map(original.keys, 'key').includes(pubkey);
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <p>{t('tools_form_permissions_auth_instructions')}</p>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Current</Table.Cell>
              <Table.Cell>{pubkey}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Change to</Table.Cell>
              <Table.Cell>{newkey}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        {(isCurrentKey)
          ? (
            <Message
              content={t('tools_form_permissions_auth_current_key_content')}
              header={t('tools_form_permissions_auth_current_key_header')}
              icon="exclamation circle"
              negative
            />
          )
          : false
        }
        <Message
          content={t('tools_permissions_warning_content')}
          header={t('tools_permissions_warning_header')}
          icon="warning sign"
          color="orange"
        />
        <Container textAlign="right">
          <Button
            content={t('tools_form_permissions_auth_submit')}
            primary
          />
        </Container>
      </Form>
    );
  }
}


export default translate('tools')(ToolsFormPermissionsAuthSet);
