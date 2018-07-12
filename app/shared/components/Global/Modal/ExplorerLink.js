// @flow
import React, { Component } from 'react';
import GlobalModalDangerLink from './DangerLink';

export default class ModalExplorerLink extends Component<Props> {
  render() {
    const {
      blockExplorer,
      content,
      linkData,
      linkType
    } = this.props;

    const urlPartsWithoutVariable = blockExplorer[linkType].split(`{${linkType}}`);

    const generatedLink = `${urlPartsWithoutVariable[0]}${linkData}${urlPartsWithoutVariable[1]}`;

    return (
      <GlobalModalDangerLink
        content={content}
        link={generatedLink}
      />
    );
  }
}
