// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input, Dropdown } from 'semantic-ui-react';

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
      contacts,
      disabled,
      fluid,
      icon,
      label,
      loading,
      name,
      width
    } = this.props;
    const {
      useDropdown,
      value
    } = this.state;

    let dropdownOptions;

    if (useDropdown === 'contacts') {
      dropdownOptions = contacts.map((contact) => contact.fullName);
    } else if (useDropdown === 'exchanges') {
      dropdownOptions = exchanges;
    }

    return (
      <div>
        {(!useDropdown)
        ? (
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
        ) : ''}

        {(useDropdown)
        ? (
          <Dropdown
            defaultValue={value}
            name={name}
            onChange={this.onChange}
            options={dropdownOptions}
            search
            selection
          />
        ) : ''}
      </div>
    );
  }
}
