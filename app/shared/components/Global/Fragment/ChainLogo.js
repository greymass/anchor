// @flow
import React, { PureComponent } from 'react';
import { Image, Popup } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import beosLogo from '../../../../renderer/assets/images/beos-logo.svg';
import bosLogo from '../../../../renderer/assets/images/bos.png';
import eosLogo from '../../../../renderer/assets/images/eos.png';
import insightsLogo from '../../../../renderer/assets/images/insights.svg';
import meetoneLogo from '../../../../renderer/assets/images/meetone.svg';
import placeholder from '../../../../renderer/assets/images/placeholder.png';
import telosLogo from '../../../../renderer/assets/images/telos.svg';
import worbliLogo from '../../../../renderer/assets/images/worbli.png';

const logos = {
  'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4': beosLogo, // beos mainnet
  'cbef47b0b26d2b8407ec6a6f91284100ec32d288a39d4b4bbd49655f7c484112': beosLogo, // beos testnet
  'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86': bosLogo, // bos mainnet
  'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': eosLogo, // eos mainnet
  '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca': eosLogo, // eos testnet jungle
  '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191': eosLogo, // eos testnet kylin
  'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664': insightsLogo, // insights mainnet
  'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422': meetoneLogo, // meetone mainnet
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': telosLogo, // telos mainnet
  'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3': telosLogo, // telos testnet
  '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f': worbliLogo, // worbli mainnet
};

class GlobalFragmentChainLogo extends PureComponent<Props> {
  render() {
    const {
      avatar,
      className,
      chainId,
      name,
      noPopup,
      size,
      style,
      t,
    } = this.props;
    let src = logos[chainId];
    if (!logos[chainId]) {
      src = placeholder;
    }
    const image = (
      <Image
        avatar={avatar}
        centered
        className={className}
        size={size}
        src={src}
        style={style}
      />
    );
    if (noPopup) return image;
    return (
      <Popup
        content={t('tools:tools_wallets_blockchain')}
        header={name}
        inverted
        position="top center"
        style={{ textAlign: 'center' }}
        trigger={image}
      />
    );
  }
}

export default translate('global')(GlobalFragmentChainLogo);
