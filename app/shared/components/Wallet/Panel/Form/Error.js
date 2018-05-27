// @flow
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class WalletPanelFormAccount extends Component<Props> {
  render() {
    const {
      error
    } = this.props;
    return (error)
      ? (
        <Message negative>
          <p>{error}</p>
        </Message>
      )
      : '';
  }
}
