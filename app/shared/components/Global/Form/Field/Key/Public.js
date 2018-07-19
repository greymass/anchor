// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class GlobalFormFieldKeyPublic extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  onChange = debounce((e, { name, value }) => {
    const parsed = value.trim();
    const valid = !!(parsed.match(/^EOS[a-zA-Z1-9.]{50}?$/g));

    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, { name, value: parsed, valid });
    });
  }, 1000)
  render() {
    const {
      autoFocus,
      disabled,
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
        disabled={disabled}
        fluid
        icon={icon}
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
        defaultValue={value}
      />
    );
  }
}
