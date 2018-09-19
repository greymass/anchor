// @flow
import React, { Component } from 'react';

class GlobalFragmentAuthorization extends Component<Props> {
  render() {
    const {
      account,
      authorization
    } = this.props;
    if (authorization) {
      const [accountName, permission] = authorization.split('@');
      return (
        <React.Fragment>
          <span>
            {accountName}
          </span>
          <span style={{ opacity: 0.4 }}>
            @{permission}
          </span>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <span>
          {account}
        </span>
      </React.Fragment>
    );
  }
}

export default GlobalFragmentAuthorization;
