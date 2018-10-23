// @flow
import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';

class GlobalFragmentAuthorization extends Component<Props> {
  render() {
    const {
      account,
      authorization,
      pubkey
    } = this.props;
    let element = (
      <span>
        {account}
      </span>
    );
    if (authorization) {
      element = (
        <span>
          <span>
            {account}
          </span>
          <span style={{ opacity: 0.4 }}>
            @{authorization}
          </span>
        </span>
      );
    }
    if (pubkey) {
      return (
        <Popup
          content={pubkey}
          hoverable
          inverted
          trigger={element}
        />
      );
    }
    return element;
  }
}

export default GlobalFragmentAuthorization;
