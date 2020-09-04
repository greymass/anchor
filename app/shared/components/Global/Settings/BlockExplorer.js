// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class GlobalSettingsBlockExplorer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  onChange = (e, { value }) => {
    const { actions, chainId } = this.props;
    actions.setSetting('blockExplorer', value, chainId);
  };

  render() {
    const {
      blockExplorers,
      name,
      selection
    } = this.props;

    let {
      value
    } = this.state;

    const blockExplorerKeys = Object.keys(blockExplorers || {});

    const blockExplorerOptions = blockExplorerKeys.map((blockExplorer) => {
      return {
        value: blockExplorer,
        text: blockExplorer
      };
    });

    if (!blockExplorerKeys.includes(value)) {
      value = null;
    }

    return (
      <Dropdown
        defaultValue={value || (blockExplorerOptions[0] && blockExplorerOptions[0].value)}
        name={name}
        onChange={this.onChange}
        options={blockExplorerOptions}
        selection={selection}
      />
    );
  }
}
