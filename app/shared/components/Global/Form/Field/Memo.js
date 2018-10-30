// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

export default class GlobalFormFieldMemo extends Component<Props> {
  onChange = (e, { name, value }) => {
    const parsed = value;
    let valid = !parsed.match(/(\b)5[a-zA-Z0-9.]{50}(?![a-zA-Z0-9.])/g);

    if (valid) {
      valid = (new TextEncoder('utf-8').encode(parsed)).length <= 256;
    }

    this.props.onChange(e, { name, value: parsed, valid });
  }
  render() {
    const {
      autoFocus,
      label,
      loading,
      name,
      value
    } = this.props;

    return (
      <Form.Field
        autoFocus={autoFocus}
        control={Input}
        fluid
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}
