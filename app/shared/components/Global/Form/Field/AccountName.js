// @flow
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export class GlobalFormFieldAccountName extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      maxlength: props.maxlength || 12,
      value: props.value
    };
  }
  onChange = (e, { name, value }) => {
    const parsed = value.trim().toLowerCase();
    let valid = false;
    switch (this.props.rules) {
      case 'generic':
        valid = !!(parsed.match(new RegExp(`^[a-z12345]{${this.state.maxlength}}$`, 'g')));
        break;
      default:
        valid = !!(parsed.match(new RegExp(`^[a-z12345.]{1,${this.state.maxlength}}$`, 'g')));
        break;
    }
    this.setState({
      value: parsed
    }, () => {
      this.props.onChange(e, {
        name,
        value: parsed,
        valid
      });
    });
  };
  reset = () => this.setState({ value: '' });
  render() {
    const {
      autoFocus,
      disabled,
      fluid,
      icon,
      label,
      labelPosition,
      loading,
      name,
      ref,
    } = this.props;

    const { value } = this.state;

    return (
      <Input
        autoFocus={autoFocus}
        disabled={disabled}
        fluid={fluid}
        icon={icon}
        label={label}
        labelPosition={labelPosition}
        loading={loading}
        name={name}
        ref={ref}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}

export default GlobalFormFieldAccountName;
