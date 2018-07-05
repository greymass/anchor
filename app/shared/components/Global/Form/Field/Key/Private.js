// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Checkbox, Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

const ecc = require('eosjs-ecc');

class GlobalFormFieldKeyPrivate extends Component<Props> {
  state = {
    value: '',
    visible: false
  };
  onChange = debounce((e, { name, value }) => {
    const parsed = value.trim();
    this.setState({
      value: parsed
    }, () => {
      try {
        const publicKey = ecc.privateToPublic(parsed);
        const valid = ecc.isValidPrivate(parsed);
        this.props.onChange(e, {
          name,
          publicKey: publicKey,
          valid,
          value: parsed
        });
      } catch (error) {
        this.props.onChange(e, {
          error,
          name,
          valid: false,
          value: parsed
        });
      }
    });
  }, 300)
  onToggleKey = () => this.setState({ visible: !this.state.visible });
  render() {
    const {
      autoFocus,
      disabled,
      icon,
      label,
      loading,
      name,
      placeholder,
      t,
      value
    } = this.props;
    const {
      visible
    } = this.state;
    return (
      <React.Fragment>
        <p>
          <Form.Field
            autoFocus={autoFocus}
            control={Input}
            defaultValue={value}
            disabled={disabled}
            fluid
            icon={icon}
            label={label}
            loading={loading}
            name={name}
            onChange={this.onChange}
            placeholder={placeholder}
            type={(visible) ? 'text' : 'password'}
          />
        </p>
        <p>
          <Checkbox
            label={t('welcome:welcome_key_compare_visible')}
            onChange={this.onToggleKey}
            checked={visible}
          />
        </p>
      </React.Fragment>
    );
  }
}

export default translate('global')(GlobalFormFieldKeyPrivate);
