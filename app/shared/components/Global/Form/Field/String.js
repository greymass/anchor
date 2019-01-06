// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

export default class GlobalFormFieldString extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }
  onChange = debounce((e, { name, value }) => {
    const valid = (new TextEncoder('utf-8').encode(value)).length <= 256;
    this.setState({
      value
    }, () => {
      this.props.onChange(e, { name, value, valid });
    });
  }, 300)

  render() {
    const {
      autoFocus,
      disabled,
      icon,
      label,
      loading,
      placeholder,
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
        disabled={disabled}
        icon={icon}
        label={label}
        placeholder={placeholder}
        loading={loading}
        name={name}
        onChange={this.onChange}
      />
    );
  }
}
