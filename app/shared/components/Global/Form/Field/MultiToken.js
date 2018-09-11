// @flow
import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class GlobalFormFieldMultiToken extends Component<Props> {
  constructor(props) {
    super(props);
    const [quantity, asset] = props.value.split(' ');
    const { connection } = this.props;
    this.state = {
      asset: asset || connection.keyPrefix,
      quantity
    };
  }
  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { asset, quantity } = this.state;
      const { balances } = this.props;
      const { contract, precision } = balances.__contracts[asset];
      const parsed = (quantity > 0)
        ? `${parseFloat(quantity).toFixed(precision[asset])} ${asset}`
        : `${parseFloat(0).toFixed(precision[asset])} ${asset}`;
      this.props.onChange(e, { name: this.props.name, value: parsed });
    });
  }, 300)
  render() {
    const {
      balances,
      autoFocus,
      label,
      loading,
      name,
      settings,
      style
    } = this.props;
    const assets = Object.keys(balances[settings.account]);
    const { customTokens } = settings;
    // Determine which tokens are being tracked
    const trackedTokens = (customTokens) ? customTokens.map((tokenName) => {
      const [, symbol] = tokenName.split(':');
      return symbol;
    }) : [settings.blockchain.prefix];
    const options = [];
    // Iterate assets and build the options list based on tracked tokens
    assets.forEach((asset) => {
      if (
        trackedTokens.indexOf(asset) !== -1
        && (balances[settings.account] && balances[settings.account][asset] > 0)
      ) {
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
          autoFocus={autoFocus}
          control={Input}
          defaultValue={this.state.quantity}
          loading={loading}
          name={name}
          onChange={this.onChange}
          placeholder="0.0000"
          style={style}
        >
          <Dropdown
            defaultValue={this.state.asset || settings.blockchain.prefix}
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
