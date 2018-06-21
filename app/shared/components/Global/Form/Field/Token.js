// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class FormFieldToken extends Component<Props> {
  onChange = debounce((e, { name, value }) => {
    this.props.onChange(e, { name, value });
  }, 300)

  render() {
    const {
      autoFocus,
      icon,
      label,
      loading,
      name,
      defaultValue
    } = this.props;
    return (
      <Form.Field
        autoFocus={autoFocus}
        control={Input}
        defaultValue={defaultValue}
        icon={icon}
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
        placeholder="0.0000"
      />
    );
  }
}
