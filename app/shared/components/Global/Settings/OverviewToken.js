// @flow
import React, { Component } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import { sortBy } from 'lodash';

export default class GlobalSettingsOverviewToken extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  onChange = (e, { value }) => {
    const {
      actions,
      chainId
    } = this.props;
    this.setState({ value }, () => {
      actions.setSetting('overviewToken', value, chainId);
    });
  }

  render() {
    const {
      chainId,
      tokens,
      name,
      search,
      scrolling,
      selection,
    } = this.props;

    let {
      value
    } = this.state;

    const [currentContract, currentSymbol] = value.split(':');

    let options = [];
    tokens.forEach((token) => {
      const [chain, contract, symbol] = token.split(':');
      if (chain === chainId) {
        options.push({
          key: [symbol, contract].join(':'),
          value: [contract, symbol].join(':'),
          content: (
            <Header
              content={symbol}
              subheader={contract}
              size="small"
            />
          ),
        });
      }
    });

    options = sortBy(options, ['key']);

    return (
      <Dropdown
        defaultValue={value || (options[0] && options[0].value)}
        icon={false}
        name={name}
        onChange={this.onChange}
        options={options}
        scrolling={scrolling}
        size="small"
        trigger={(
          <Header
            content={currentSymbol}
            icon="dropdown"
            subheader={currentContract}
            size="tiny"
            style={{ margin: 0 }}
          />
        )}
      />
    );
  }
}
