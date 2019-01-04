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

    let {
      linkBlockId
    } = this.props;

    const { blockExplorer: selected } = settings;

    if (!blockExplorers) return false;

    const blockExplorer = (selected in Object.keys(blockExplorers))
      ? blockExplorers[selected]
      : blockExplorers[Object.keys(blockExplorers)[0]];

    if (!blockExplorer[linkType]) {
      return false;
    }

    if (linkBlockId) {
      linkBlockId = linkBlockId.toString();
    }

    const urlPartsWithoutVariable = blockExplorer[linkType].split(`{${linkType}}`);

    let generatedLink = null;
    if ((linkType === 'txid') && (urlPartsWithoutVariable[0] === 'https://explore.beos.world/transactions/')) {
      generatedLink = `${urlPartsWithoutVariable[0]}${linkBlockId}/${linkData}${urlPartsWithoutVariable[1]}`;
    } else {
      generatedLink = `${urlPartsWithoutVariable[0]}${linkData}${urlPartsWithoutVariable[1]}`;
    }

    return (
      <GlobalModalDangerLink
        content={content}
        link={generatedLink}
        settings={settings}
      />
    );
  }
}
