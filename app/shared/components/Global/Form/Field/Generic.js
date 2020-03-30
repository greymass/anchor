// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class GlobalFormFieldGeneric extends Component<Props> {
  onChange = debounce((e, { name, value }) => {
    this.props.onChange(e, { name, value });
  }, 300);
  render() {
    const {
      autoFocus,
      disabled,
      icon,
      label,
      loading,
      name,
      value,
      forcedValue
    } = this.props;
    return (
      <Form.Field
        autoFocus={autoFocus}
        control={Input}
        disabled={disabled}
        fluid
        icon={icon}
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
        defaultValue={value}
        value={(forcedValue) ? forcedValue : undefined}
      />
    );
  }
}
