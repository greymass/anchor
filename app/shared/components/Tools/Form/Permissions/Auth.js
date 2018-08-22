// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { delete as del, set } from 'dot-prop-immutable';
import { map, values } from 'lodash';

import { Button, Container, Form, Message } from 'semantic-ui-react';

import ToolsFormPermissionsAuthWeightedKey from './Auth/WeightedKey';

const defaultAuth = {
  perm_name: '',
  parent: 'active',
  required_auth: {
    threshold: 1,
    keys: [{
      key: '',
      weight: 1
    }],
    accounts: [],
    waits: []
  }
};

class ToolsFormPermissionsAuth extends Component<Props> {
  constructor(props) {
    super(props);
    let { auth } = props;
    const newAuth = !(auth);
    if (!auth) {
      auth = Object.assign({}, defaultAuth);
    }
    this.state = Object.assign({}, {
      auth: {
        ...auth.required_auth,
      },
      newAuth,
      original: {
        ...auth.required_auth,
      },
      parent: auth.parent,
      permission: auth.perm_name,
      validFields: {},
      validForm: false
    });
  }
  addKey = () => this.setState({
    auth: set(this.state.auth, `keys.${this.state.auth.keys.length}`, { key: '', weight: 1 }),
    validFields: Object.assign({}, this.state.validFields, {
      [`keys.${this.state.auth.keys.length}.key`]: false
    })
  })
  onKeyChange = (e, { name, valid, value }) => {
    this.setState({
      auth: set(this.state.auth, name, value),
      validFields: Object.assign({}, this.state.validFields, { [name]: valid })
    }, () => {
      const { validFields } = this.state;
      const eachFieldValid = values(validFields);
      this.setState({
        validForm: eachFieldValid.every((isValid) => isValid === true)
      });
    });
  }
  onStringChange = (e, { name, value }) => {
    this.setState({
      [name]: String(value)
    });
  }
  onNumberChange = (e, { name, value }) => {
    this.setState({
      auth: set(this.state.auth, name, parseInt(value, 10))
    });
  }
  onRemoveKey = (e, { name }) => {
    const { [`${name}.key`]: value, ...validFields } = this.state.validFields;
    this.setState({
      auth: del(this.state.auth, name),
      validFields
    });
  }
  onSubmit = () => {
    const {
      actions,
      settings
    } = this.props;
    const { auth, parent, permission } = this.state;
    let authorization;
    if (permission === 'owner') {
      authorization = `${settings.account}@owner`;
    }
    actions.updateauth(permission, parent, auth, authorization);
  }
  render() {
    const {
      pubkey,
      settings,
      t
    } = this.props;
    const {
      auth,
      newAuth,
      original,
      parent,
      permission,
      validForm
    } = this.state;
    const isCurrentKey = map(original.keys, 'key').includes(pubkey);
    return (
      <Form
        onSubmit={this.onSubmit}
      >
        <p>{t('tools_form_permissions_auth_instructions')}</p>
        {(settings.advancedPermissions || newAuth)
          ? (
            <Form.Input
              defaultValue={permission}
              label={t('tools_form_permissions_auth_permission')}
              name="permission"
              onChange={this.onStringChange}
            />
          )
          : false
        }
        {(settings.advancedPermissions || newAuth)
          ? (
            <Form.Input
              defaultValue={parent}
              label={t('tools_form_permissions_auth_parent')}
              name="parent"
              onChange={this.onStringChange}
            />
          )
          : false
        }
        {(settings.advancedPermissions)
          ? (
            <Form.Input
              defaultValue={auth.threshold}
              label={t('tools_form_permissions_auth_threshold')}
              name="threshold"
              onChange={this.onNumberChange}
            />
          )
          : false
        }
        {auth.keys.map((keyAuths, index) => (
          <ToolsFormPermissionsAuthWeightedKey
            auth={auth}
            key={JSON.stringify(keyAuths)}
            keyAuths={keyAuths}
            index={index}
            onNumberChange={this.onNumberChange}
            onKeyChange={this.onKeyChange}
            onRemoveKey={this.onRemoveKey}
            settings={settings}
          />
        ))}
        {(settings.advancedPermissions)
          ? (
            <Button
              content={t('tools_form_permissions_auth_add_key')}
              color="green"
              icon="circle plus"
              floated="right"
              onClick={this.addKey}
            />
          )
          : false
        }
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
            disabled={!validForm}
            primary
          />
        </Container>
      </Form>
    );
  }
}


export default translate('tools')(ToolsFormPermissionsAuth);
