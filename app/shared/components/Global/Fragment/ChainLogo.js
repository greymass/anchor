// @flow
import React, { PureComponent } from 'react';
import { Image, Popup } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import beosLogo from '../../../../renderer/assets/images/beos-logo.svg';
import bosLogo from '../../../../renderer/assets/images/bos.png';
import eosLogo from '../../../../renderer/assets/images/eos.png';
import europechainLogo from '../../../../renderer/assets/images/europechain.png';
import fioLogo from '../../../../renderer/assets/images/fio.svg';
import insightsLogo from '../../../../renderer/assets/images/insights.svg';
import jungleLogo from '../../../../renderer/assets/images/jungle.png';
import lynxLogo from '../../../../renderer/assets/images/lynx.png';
import meetoneLogo from '../../../../renderer/assets/images/meetone.png';
import placeholder from '../../../../renderer/assets/images/placeholder.png';
import protonLogo from '../../../../renderer/assets/images/proton.png';
import protonTestnetLogo from '../../../../renderer/assets/images/proton-testnet.png';
import remmeLogo from '../../../../renderer/assets/images/remme.png';
import telosLogo from '../../../../renderer/assets/images/telos.png';
import uxLogo from '../../../../renderer/assets/images/ux.png';
import worbliLogo from '../../../../renderer/assets/images/worbli.png';
import waxLogo from '../../../../renderer/assets/images/wax.png';
import libreLogo from "../../../../renderer/assets/images/libre.png"; //libre

const logos = {
  'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4': beosLogo, // mainnet (beos)
  'cbef47b0b26d2b8407ec6a6f91284100ec32d288a39d4b4bbd49655f7c484112': beosLogo, // testnet (beos)
  'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86': bosLogo, // mainnet (bos)
  'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': eosLogo, // mainnet (eos)
  'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473': eosLogo, // testnet - jungle (eos)
  '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191': eosLogo, // testnet - kylin (eos)
  'f778f7d2f124b110e0a71245b310c1d0ac1a0edd21f131c5ecb2e2bc03e8fe2e': europechainLogo, // mainnet (europechain)
  '21dcae42c0182200e93f954a074011f9048a7624c6fe81d3c9541a614a88bd1c': fioLogo, // mainnet (fio)
  'b20901380af44ef59c5918439a1f9a41d83669020319a80574b804a5f95cbd7e': fioLogo, // testnet (fio)
  'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664': insightsLogo, // mainnet (insights)
  '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840': jungleLogo, // testnet - jungle 3
  'b62febe5aadff3d5399090b9565cb420387d3c66f2ccd7c7ac1f532c4f50f573': lynxLogo, // mainnet (lynx)
  '0fea517bbfb5b51c564b5c59bcf7f02cf934cfff895f59d0d5cd7079c06fd978': lynxLogo, // testnet (lynx)
  'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422': meetoneLogo, // mainnet (meetone)
  '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0': protonLogo, // mainnet (proton)
  '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd': protonTestnetLogo, // testnet (proton)
  '93ece941df27a5787a405383a66a7c26d04e80182adf504365710331ac0625a7': remmeLogo, // testnet (remme)
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': telosLogo, // mainnet (telos)
  'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3': telosLogo, // testnet (telos)
  '8fc6dce7942189f842170de953932b1f66693ad3788f766e777b6f9d22335c02': uxLogo, // mainnet (uxnetwork)
  '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4': waxLogo, // mainnet (wax)
  '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f': worbliLogo, // mainnet (worbli)
  '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4': waxLogo, // mainnet (wax)
  'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12': waxLogo,
  '38b1d7815474d0c60683ecbea321d723e83f5da6ae5f1c1f9fecc69d9ba96465': libreLogo, // mainnet (libre)
  'b64646740308df2ee06c6b72f34c0f7fa066d940e831f752db2006fcc2b78dee': libreLogo // testnet (libre)
};

export class GlobalFragmentChainLogo extends PureComponent<Props> {
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
        content={chainId}
        header={name}
        inverted
        position="right center"
        trigger={image}
      />
    );
  }
}

export default withTranslation('global')(GlobalFragmentChainLogo);
