// @flow
const { shell } = require('electron');

import React, { Component } from 'react';

export default class ProducersLink extends Component<Props> {

  isSafeish = (url) => url.startsWith('http:') || url.startsWith('https:')

  openLink() {
    const { url } = this.props.producer;
    if (this.isSafeish(url)) {
      shell.openExternal(url);
    }
  }

  render() {
    let element = this.props.producer.url;
    if (this.isSafeish(this.props.producer.url)) {
      element = (
        <a href="#" onClick={this.openLink.bind(this)}>
          {this.props.producer.url}
        </a>
      );
    }
    return element;
  }
}
