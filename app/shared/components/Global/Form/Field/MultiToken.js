// @flow
import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class GlobalFormFieldMultiToken extends Component<Props> {
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
      label,
      loading,
      name,
      settings
    } = this.props;
    const { customTokens } = settings;
    // Determine which tokens are being tracked
    const trackedTokens = (customTokens) ? customTokens.map((tokenName) => {
      const [, symbol] = tokenName.split(':');
      return symbol;
    }) : ['EOS'];
    const options = [];
    // Iterate assets and build the options list based on tracked tokens
    assets.forEach((asset) => {
      if (trackedTokens.indexOf(asset) !== -1) {
        options.push({
          key: asset,
          text: asset,
          value: asset
        });
      }
    });
    return (
      <div className="field">
        <label htmlFor={name}>
          {label}
        </label>
        <Input
          action
          autoFocus={autoFocus}
          control={Input}
          defaultValue={this.state.quantity}
          loading={loading}
          name={name}
          onChange={this.onChange}
          placeholder="0.0000"
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
