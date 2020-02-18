// @flow
import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import { debounce, find } from 'lodash';

export default class GlobalFormFieldMultiToken extends Component<Props> {
  constructor(props) {
    super(props);
    const { connection } = this.props;
    const [quantity, asset] = props.value.split(' ');
    this.state = {
      asset: asset || connection.chainSymbol || 'EOS',
      quantity
    };
  }
  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { asset, quantity } = this.state;
      const { balances, connection } = this.props;
      const { precision } = balances.__contracts[asset];
      const defaultChainPrecision = connection.tokenPrecision || 4;
      const assetPrecision = (
        precision
        && precision[asset] !== undefined
      ) ? precision[asset] : defaultChainPrecision;
      const parsed = (quantity > 0)
        ? `${parseFloat(quantity).toFixed(assetPrecision)} ${asset}`
        : `${parseFloat(0).toFixed(assetPrecision)} ${asset}`;
      this.props.onChange(e, { name: this.props.name, value: parsed });
    });
  }, 300);
  render() {
    const {
      balances,
      connection,
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
    const trackedTokens = (customTokens || []).map((tokenName) => {
      const [chainId, contract, symbol] = tokenName.split(':');
      return { contract, symbol };
    });

    const trackedTokensIncludeChainSymbol =
      !trackedTokens.map(token => token.symbol).includes(connection.chainSymbol);

    if (trackedTokensIncludeChainSymbol) {
      trackedTokens.push({
        contract: 'eosio',
        symbol: connection.chainSymbol || 'EOS'
      });
    }

    const options = [];
    // Iterate assets and build the options list based on tracked tokens
    assets.forEach((asset) => {
      const assetDetails = find(trackedTokens, { symbol: asset });
      if (assetDetails) {
        const { contract, symbol } = find(trackedTokens, { symbol: asset });
        if (
          (contract && symbol)
          && (balances[settings.account] && balances[settings.account][asset] > 0)
        ) {
          options.push({
            key: asset,
            text: `${symbol} (${contract})`,
            value: asset
          });
        }
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
