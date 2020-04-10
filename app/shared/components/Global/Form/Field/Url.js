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
    const valid = !!value.match(/^(http|https):\/\//);
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
      error,
      fluid,
      icon,
      inline,
      label,
      loading,
      name,
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
        error={error}
        fluid={fluid}
        icon={icon}
        inline={inline}
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
      />
    );
  }
}
