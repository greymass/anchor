// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

const ecc = require('eosjs-ecc');

class GlobalFormFieldKeyPublic extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      generated: '',
      value: props.defaultValue
    };
  }
  generate = (e) => {
    const {
      name,
      setPrivateKey
    } = this.props;
    e.preventDefault();
    ecc
      .randomKey()
      .then((key) => {
        const publicKey = ecc.privateToPublic(key);
        // Set the value in the parent form with the provided name
        this.onChange(null, {
          name,
          value: publicKey
        });
        // Also pass the private key back if a method was passed
        if (setPrivateKey) {
          setPrivateKey(name, publicKey, key);
        }
        // Set the local state
        this.setState({
          generated: publicKey,
        });
        return publicKey;
      })
      .catch(() => {
        // no catch
      });
    return false;
  }
  onChange = debounce((e, { name, value }) => {
    const parsed = value.trim();
    const valid = ecc.isValidPublic(parsed);
    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, { name, value: parsed, valid });
    });
  }, 300)
  render() {
    const {
      autoFocus,
      disabled,
      generate,
      icon,
      label,
      loading,
      name,
      t
    } = this.props;

    const {
      generated,
      value
    } = this.state;

    let action;
    if (generate) {
      action = {
        color: 'grey',
        icon: 'redo alternate',
        onClick: this.generate,
        size: 'tiny'
      };
    }

    return (
      <Form.Field
        action={action}
        autoFocus={autoFocus}
        control={Input}
        disabled={disabled}
        fluid
        key={generated}
        icon={icon}
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
        defaultValue={generated || value}
      />
    );
  }
}


export default translate('global')(GlobalFormFieldKeyPublic);
