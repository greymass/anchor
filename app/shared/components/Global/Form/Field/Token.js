// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

import { Decimal } from 'decimal.js';
import debounce from 'lodash/debounce';

export default class GlobalFormFieldToken extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }
  onChange = debounce((e, { name, value }) => {
    const {
      connection
    } = this.props;
    const asset = connection.keyPrefix;
    const valid = !!(value.match(/^\d+(\.\d{1,4})?$/g));
    const parsed = (value > 0) ? `${new Decimal(value).toFixed(4)} ${asset}` : `0.0000 ${asset}`;

    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, { name, value: parsed, valid });
    });
  }, 300)

  render() {
    const {
      autoFocus,
      icon,
      label,
      loading,
      name
    } = this.props;
    const {
      value
    } = this.state;
    return (
      <Form.Field
        autoFocus={autoFocus}
        control={Input}
        defaultValue={value}
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
