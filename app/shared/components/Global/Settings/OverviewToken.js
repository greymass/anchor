// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class GlobalSettingsOverviewToken extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  onChange = (e, { value }) => {
    const { actions, chainId } = this.props;

    actions.setSetting('overviewToken', value, chainId);
  }

  render() {
    const {
      chainId,
      tokens,
      name,
      selection
    } = this.props;

    let {
      value
    } = this.state;

    const options = [];
    tokens.forEach((token) => {
      const [chain, contract, symbol] = token.split(':');
      if (chain === chainId) {
        options.push({
          value: [contract, symbol].join(':'),
          text: [contract, symbol].join(':'),
        });
      }
    });

    return (
      <Dropdown
        defaultValue={value || (options[0] && options[0].value)}
        name={name}
        onChange={this.onChange}
        options={options}
        selection={selection}
        size="small"
      />
    );
  }
}
