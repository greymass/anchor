// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Dropdown, Header, Icon, Image, Input, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../Button/Elevate';
import * as BlockchainsActions from '../../../actions/blockchains';
import * as WalletActions from '../../../actions/wallet';
import * as WalletsActions from '../../../actions/wallets';

import eosLogo from '../../../../renderer/assets/images/eos.png';
import telosLogo from '../../../../renderer/assets/images/telos.png';
import worbliLogo from '../../../../renderer/assets/images/worbli.png';
import insightsLogo from '../../../../renderer/assets/images/insights.svg';

const logos = {
  'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': eosLogo, // mainnet (eos)
  '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca': eosLogo, // jungle (eos)
  'b042025541e25a472bffde2d62edd457b7e70cee943412b1ea0f044f88591664': insightsLogo, // mainnet (insights)
  '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191': eosLogo, // kylin (eos)
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': telosLogo, // mainnet (telos)
  'e17615decaecd202a365f4c029f206eee98511979de8a5756317e2469f2289e3': telosLogo, // testnet (telos)
  '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f': worbliLogo, // mainnet (worbli)
};

class GlobalBlockchainDropdown extends Component<Props> {
  state = { open: false }
  onClose = () => {
    this.setState({ open: false });
  }
  onOpen = () => {
    this.setState({ open: true });
  }
  onToggle = () => {
    this.setState({ open: !this.state.open });
  }
  swapBlockchain = (chainId) => {
    const { actions } = this.props;
    actions.swapBlockchain(chainId);
    // if (password) {
    //   actions.unlockWallet(password);
    // }
  }
  render() {
    const {
      blockchains,
      selection,
      settings,
      t,
    } = this.props;
    let defaultLocString = 'global_account_select_blockchain_default';
    if (settings.walletMode === 'cold') {
      defaultLocString = 'global_account_select_blockchain_default_cold';
    }
    const { chainId } = settings;
    if (!blockchains) return false;
    let blockchain = find(blockchains, { chainId });
    if (!blockchain) {
      blockchain = {};
    }
    const { displayTestNetworks } = settings;
    const options = blockchains
      .filter(b => (
        (
          (displayTestNetworks && b.testnet)
          || !b.testnet
        )
        && b.chainId !== blockchain.chainId
      ))
      .sort((a, b) => a.name > b.name)
      .map((b) => {
        const image = (logos[b.chainId]) ? { avatar: true, src: logos[b.chainId] } : undefined;
        return {
          props: {
            image,
            key: b.chainId,
            onClick: () => this.swapBlockchain(b.chainId),
            text: `${b.name} ${(b.testnet ? '(TESTNET)' : '')}`,
            value: b.chainId,
          },
          b
        };
      });
    let icon = {
      color: 'green',
      name: 'id card'
    };
    return (
      <Dropdown
        item
        labeled
        selection={selection}
        trigger={(
          <span>
            {(logos[blockchain.chainId])
              ? (
                <Image avatar src={logos[blockchain.chainId]} style={{ marginRight: '0.5em' }}/>
              )
              : false
            }
            {(blockchain && blockchain.name) ? blockchain.name : t(defaultLocString)}
          </span>
        )}
      >
        <Dropdown.Menu style={{ minWidth: '200px' }}>
          {options.map(option => {
              const {
                props,
                b
              } = option;
              return (
                <Dropdown.Item {...props} />
              );
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}


function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...BlockchainsActions,
      // ...WalletActions,
      // ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalBlockchainDropdown);
