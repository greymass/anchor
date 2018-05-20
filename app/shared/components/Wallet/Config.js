// @flow
import React, { Component } from 'react';
import { Button, Form, Header, Input, Segment } from 'semantic-ui-react';

export default class WalletConfig extends Component<Props> {

  onInputChange = (e, { name, value }) => {
    const { setSetting } = this.props.actions;
    setSetting(name, value);
  }

  onWalletChange = (e, { name, value }) => {
    const { setWalletKey } = this.props.actions;
    setWalletKey(value);
  }

  render() {
    const {
      account,
      node
    } = this.props.settings;
    const {
      key
    } = this.props.wallet;
    return (
      <Segment basic>
        <Form onSubmit={this.onSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Account Name"
              name="account"
              onChange={this.onInputChange}
              value={account}
            />
            <Form.Field
              control={Input}
              label="WIF/Private Key"
              name="key"
              onChange={this.onWalletChange}
              value={key}
            />
            <Form.Field
              control={Input}
              label="Wallet Node"
              name="node"
              onChange={this.onInputChange}
              value={node}
            />
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}
