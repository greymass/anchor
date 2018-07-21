// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class GlobalFormFieldAccount extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  onChange = (e, { name, value }) => {
    const parsed = value.trim().toLowerCase();
    const valid = !!(parsed.match(/^[a-z12345.]+$/g));
    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, {
        name,
        value: parsed,
        valid
      });
    });
  }
  reset = () => this.setState({ value: '' });
  render() {
    const {
      autoFocus,
      disabled,
      fluid,
      icon,
      label,
      loading,
      name,
      width
    } = this.props;
    const {
      value
    } = this.state;
    return (
      <Form.Field
        autoFocus={autoFocus}
        control={Input}
        disabled={disabled}
        fluid={fluid}
        icon={icon}
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
        ref={ref => { this.input = ref; }}
        value={value}
        width={width}
      />
    );
  }
}
