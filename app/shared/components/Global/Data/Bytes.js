// @flow
import React, { Component } from 'react';
import { Popup } from 'semantic-ui-react';

const prettyBytes = require('pretty-bytes');

export default class GlobalDataBytes extends Component<Props> {
  render() {
    const {
      bytes
    } = this.props;

    return (
      <Popup
        content={`${bytes} B`}
        inverted
        trigger={
          <span>
            {` ${prettyBytes(bytes)} `}
          </span>
        }
      />
    );
  }
}
