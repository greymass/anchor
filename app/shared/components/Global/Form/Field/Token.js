// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

import { Decimal } from 'decimal.js';
import debounce from 'lodash/debounce';

export default class GlobalFormFieldToken extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      readOnly
    } = props;

    this.state = {
      value: props.defaultValue,
      readOnly
    };
  }
  onChange = debounce((e, { name, value }) => {
    const { connection } = this.props;
    const precision = (connection) ? connection.tokenPrecision : 4;
    let asset = (connection && connection.chainSymbol) || 'EOS';
    const { symbol } = this.props;
    if (symbol) {
      asset = symbol;
    }
    const regex = `^\\d+(\\.\\d{1,${precision}})?$`;
    const valid = !!(value.match(new RegExp(regex, 'g')));
    const parsed = (value > 0) ? `${new Decimal(value).toFixed(precision)} ${asset}` : `0.0000 ${asset}`;
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
      name,
      placeholder
    } = this.props;
    const {
      value,
      readOnly
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
        placeholder={placeholder || '0.0000'}
        readOnly={readOnly}
      />
    );
  }
}
