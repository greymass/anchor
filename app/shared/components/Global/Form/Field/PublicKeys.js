// @flow
import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import { debounce, find } from 'lodash';

const ecc = require('eosjs-ecc');

export default class PublicKeys extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.props.onChange(e, {
        name: this.props.name,
        valid: ecc.isValidPublic(value),
        value,
      });
    });
  }, 300);
  render() {
    const {
      excluded,
      label,
      pubkeys,
    } = this.props;
    const options = pubkeys.available
      .filter((pubkey) => !excluded.includes(pubkey))
      .map((pubkey) => ({
        key: pubkey,
        text: pubkey,
        value: pubkey,
      }));
    return (
      <div className="field">
        <label>{label}</label>
        <Dropdown
          defaultValue={this.state.asset || 'EOS'}
          fluid
          name="asset"
          onChange={this.onChange}
          options={options}
          placeholder="Select an existing public key..."
          search
          selection
        />
      </div>
    );
  }
}
