// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

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
    const valid = !parsed.match(/^[a-zA-Z0-9]{200,}|.*?5[a-zA-Z0-9.]{50}.*?/g);

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
