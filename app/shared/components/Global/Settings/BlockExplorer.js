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
