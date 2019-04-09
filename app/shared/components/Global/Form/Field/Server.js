// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

export default class GlobalFormFieldServer extends Component<Props> {
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
      fluid,
      icon,
      label,
      loading,
      name
    } = this.props;
    const {
      value
    } = this.state;
    console.log(fluid)
    return (
      <Form.Field
        autoFocus={autoFocus}
        control={Input}
        defaultValue={value}
        disabled={disabled}
        fluid={fluid}
        icon={icon}
        label={label}
        loading={loading}
        name={name}
        onChange={this.onChange}
      />
    );
  }
}
