// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

export default class GlobalFormFieldUrl extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }
  onChange = debounce((e, { name, value }) => {
    const valid = value.match(/^(http|https):\/\//);

    this.setState({
      value
    }, () => {
      this.props.onChange(e, { name, value, valid });
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
      />
    );
  }
}
