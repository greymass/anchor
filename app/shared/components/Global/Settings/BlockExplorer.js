// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class GlobalFormFieldLanguage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('block_explorer', value);
  }

  render() {
    const {
      name
    } = this.props;
    const blockExplorers = {
      'bloks.io': {
        account: 'https://www.bloks.io/account/{account}',
        block: '',
        tx: 'https://www.bloks.io/transaction/{txid}'
      },
      'eospark.com': {
        account: 'https://eospark.com/MainNet/account/{account}',
        block: '',
        tx: 'https://eospark.com/MainNet/tx/{txid}'
      }
    };

    const {
      value
    } = this.state;

    const blockExplorerOptions = Object.keys(blockExplorers).map((blockExplorer) => {
      return { value: blockExplorer, text: blockExplorer };
    });

    return (
      <Dropdown
        defaultValue={value}
        fluid
        name={name}
        onChange={this.onChange}
        options={blockExplorerOptions}
      />
    );
  }
}
