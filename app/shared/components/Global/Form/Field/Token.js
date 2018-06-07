// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class WalletPanelKey extends Component<Props> {
  state = { value: '' };
  onChange = debounce((e, { name, value }) => {
    const parsed = (value > 0) ? `${parseFloat(value).toFixed(4)} EOS` : '0.0000 EOS';
    this.setState({
      value: parsed,
    }, () => {
      this.props.onChange(e, { name, value: parsed });
    });
  }, 300)
  render() {
    const {
      autoFocus,
      icon,
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
