// @flow
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import GlobalFormFieldGeneric from './Generic';

export default class GlobalFormFieldMemo extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  onChange = debounce((e, { name, value }) => {
    const parsed = value;
    let valid = !parsed.match(/.*?5[a-zA-Z0-9.]{50}.*?/g);

    if (valid) {
      valid = (new TextEncoder('utf-8').encode(parsed)).length <= 256;
    }

    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, { name, value: parsed, valid });
    });
  }, 300)
  render() {
    const {
      autoFocus,
      label,
      loading,
      name
    } = this.props;

    const {
      value
    } = this.state;

    return (
      <GlobalFormFieldGeneric
        autoFocus={autoFocus}
        icon="x"
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}
