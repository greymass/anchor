// @flow
import React, { Component } from 'react';
import GlobalModalDangerLink from './DangerLink';

export default class GlobalModalExplorerLink extends Component<Props> {
  render() {
    const {
      blockExplorers,
      content,
      linkData,
      linkType,
      settings
    } = this.props;

    const { blockExplorer: selected } = settings;
    const blockExplorer = (selected in blockExplorers)
      ? blockExplorers[selected]
      : blockExplorers[Object.keys(blockExplorers)[0]];

    const urlPartsWithoutVariable = blockExplorer[linkType].split(`{${linkType}}`);

    const generatedLink = `${urlPartsWithoutVariable[0]}${linkData}${urlPartsWithoutVariable[1]}`;

    return (
      <GlobalModalDangerLink
        content={content}
        link={generatedLink}
        settings={settings}
      />
    );
  }
}
