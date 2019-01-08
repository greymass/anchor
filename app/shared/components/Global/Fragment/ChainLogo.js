// @flow
import React, { PureComponent } from 'react';
import { Image, Popup } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import eosLogo from '../../../../renderer/assets/images/eos.png';
import insightsLogo from '../../../../renderer/assets/images/insights.svg';
import placeholder from '../../../../renderer/assets/images/placeholder.png';
import telosLogo from '../../../../renderer/assets/images/telos.png';
import worbliLogo from '../../../../renderer/assets/images/worbli.png';

const logos = {
  'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': eosLogo, // mainnet (eos)
  '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca': eosLogo, // jungle (eos)
  'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664': insightsLogo, // mainnet (insights)
  '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191': eosLogo, // kylin (eos)
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': telosLogo, // mainnet (telos)
  'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3': telosLogo, // testnet (telos)
  '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f': worbliLogo, // mainnet (worbli)
};

class GlobalFragmentChainLogo extends PureComponent<Props> {
  render() {
    const {
      avatar,
      className,
      chainId,
      name,
      size,
      style,
      t,
    } = this.props;
    let src = logos[chainId];
    if (!logos[chainId]) {
      src = placeholder;
    }
    return (
      <Popup
        content={t('tools:tools_wallets_blockchain')}
        header={name}
        inverted
        position="top center"
        style={{ textAlign: 'center' }}
        trigger={(
          <Image
            avatar={avatar}
            centered
            className={className}
            size={size}
            src={src}
            style={style}
          />
        )}
      />
    );
  }
}

export default translate('global')(GlobalFragmentChainLogo);
