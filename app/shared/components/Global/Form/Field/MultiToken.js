// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Dropdown, Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class FormFieldMultiToken extends Component<Props> {
  constructor(props) {
    super(props);
    const [quantity, asset] = props.value.split(' ');
    this.state = {
      asset: asset || 'EOS',
      quantity
    };
  }
  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { asset, quantity } = this.state;
      const parsed = (quantity > 0) ? `${parseFloat(quantity).toFixed(4)} ${asset}` : `0.0000 ${asset}`;
      this.props.onChange(e, { name: this.props.name, value: parsed });
    });
  }, 300)
  render() {
    const {
      assets,
      autoFocus,
      icon,
      label,
      loading,
      name
    } = this.props;
    const options = assets.map((asset) => ({ key: asset, text: asset, value: asset }));
    return (
      <div className="field">
        <label htmlFor={name}>
          {label}
        </label>
        <Input
          action
          autoFocus={autoFocus}
          control={Input}
          icon={icon}
          loading={loading}
          name={name}
          onChange={this.onChange}
          defaultValue={this.state.quantity}
        >
          <Dropdown
            defaultValue={this.state.asset || 'EOS'}
            name="asset"
            onChange={this.onChange}
            options={options}
            search
            selection
          />
          <input />
        </Input>
      </div>
    );
  }
}
