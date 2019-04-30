// @flow
import React, { Component } from 'react';
import { isEmpty } from 'lodash';
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

    if (!blockExplorers || isEmpty(blockExplorers)) return content;

    const blockExplorer = (selected in Object.keys(blockExplorers))
      ? blockExplorers[selected]
      : blockExplorers[Object.keys(blockExplorers)[0]];

    if (!blockExplorer[linkType]) {
      return false;
    }

    if (linkData || linkType === 'account') {
      const urlPartsWithoutVariable = blockExplorer[linkType].split(`{${linkType}}`);

      let generatedLink = null;
      if ((linkType === 'txid')) {
        if (linkBlockId && (urlPartsWithoutVariable[0] === 'https://explore.beos.world/transactions/' || (urlPartsWithoutVariable[0] === 'https://explore.testnet.beos.world/transactions/'))) {
          linkBlockId = linkBlockId && linkBlockId.toString();
          generatedLink = `${urlPartsWithoutVariable[0]}${linkBlockId}/${linkData}${urlPartsWithoutVariable[1]}`;
        } else {
          generatedLink = `${urlPartsWithoutVariable[0]}${linkData}${urlPartsWithoutVariable[1]}`;
        }
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

    return content;
  }
}
